<?php
session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

/* AUTH CHECK */
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "error" => "You must be logged in"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$cartItems = $data["cartItems"] ?? [];

if (empty($cartItems)) {
    echo json_encode(["success" => false, "error" => "Cart is empty"]);
    exit;
}

$conn = new mysqli("localhost", "root", "", "fishshop-dp");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Database connection failed"]);
    exit;
}

$userId = $_SESSION["user_id"];
$shipping = 5;
$subtotal = 0;
$discount = 0;

foreach ($cartItems as $item) {
    $subtotal += $item["price"] * $item["quantity"];
    $discount += ($item["price"] * $item["discount"] * $item["quantity"]) / 100;
}

$total = $subtotal - $discount + $shipping;

/* TRANSACTION START */
$conn->begin_transaction();

try {
    /* CREATE ORDER */
    $orderStmt = $conn->prepare(
        "INSERT INTO orders (user_id, total, shipping, created_at)
         VALUES (?, ?, ?, NOW())"
    );
    $orderStmt->bind_param("idd", $userId, $total, $shipping);
    $orderStmt->execute();
    $orderId = $orderStmt->insert_id;

    /* PREPARED STATEMENTS */
    $itemStmt = $conn->prepare(
        "INSERT INTO order_items (order_id, product_id, product_name, price, quantity)
         VALUES (?, ?, ?, ?, ?)"
    );

    $stockCheckStmt = $conn->prepare(
        "SELECT stock FROM fish WHERE id = ? FOR UPDATE"
    );

    $stockUpdateStmt = $conn->prepare(
        "UPDATE fish SET stock = stock - ? WHERE id = ?"
    );

    foreach ($cartItems as $item) {
        $productId = $item["id"];
        $qty = $item["quantity"];

        /* LOCK + CHECK STOCK */
        $stockCheckStmt->bind_param("i", $productId);
        $stockCheckStmt->execute();
        $stockResult = $stockCheckStmt->get_result();
        $row = $stockResult->fetch_assoc();

        if (!$row || $row["stock"] < $qty) {
            throw new Exception("Not enough stock for product ID {$productId}");
        }

        /* INSERT ORDER ITEM */
        $itemStmt->bind_param(
            "iisdi",
            $orderId,
            $productId,
            $item["name"],
            $item["price"],
            $qty
        );
        $itemStmt->execute();

        /* UPDATE STOCK */
        $stockUpdateStmt->bind_param("ii", $qty, $productId);
        $stockUpdateStmt->execute();
    }

    /* COMMIT */
    $conn->commit();

    echo json_encode(["success" => true]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}

/* CLEANUP */
$conn->close();
