<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["error" => "Not logged in"]);
    exit;
}

$conn = new mysqli("localhost", "root", "", "fishshop-dp");
if ($conn->connect_error) {
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

$userId = $_SESSION["user_id"];

/* GET USER INFO */
$userStmt = $conn->prepare(
    "SELECT first_name, last_name FROM users WHERE id = ?"
);
$userStmt->bind_param("i", $userId);
$userStmt->execute();
$userStmt->bind_result($firstName, $lastName);
$userStmt->fetch();
$userStmt->close();

/* GET ORDERS */
$orderStmt = $conn->prepare(
    "SELECT id, total, shipping, created_at
     FROM orders
     WHERE user_id = ?
     ORDER BY created_at DESC"
);
$orderStmt->bind_param("i", $userId);
$orderStmt->execute();
$orderResult = $orderStmt->get_result();

$orders = [];

while ($order = $orderResult->fetch_assoc()) {
    $orderId = $order["id"];

    $itemStmt = $conn->prepare(
        "SELECT product_name, price, quantity
         FROM order_items
         WHERE order_id = ?"
    );
    $itemStmt->bind_param("i", $orderId);
    $itemStmt->execute();
    $itemsResult = $itemStmt->get_result();

    $order["items"] = $itemsResult->fetch_all(MYSQLI_ASSOC);

    $itemStmt->close();
    $orders[] = $order;
}

echo json_encode([
    "firstName" => $firstName,
    "lastName" => $lastName,
    "orders" => $orders
]);

$orderStmt->close();
$conn->close();
