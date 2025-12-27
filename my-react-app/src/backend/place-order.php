<?php
session_start();

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "error" => "Not logged in"]);
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
    echo json_encode(["success" => false, "error" => "DB connection failed: " . $conn->connect_error]);
    exit;
}

$userId = $_SESSION["user_id"];

$subtotal = 0;
$discount = 0;

foreach ($cartItems as $item) {
    $subtotal += $item["price"] * $item["quantity"];
    $discount += ($item["price"] * $item["discount"] * $item["quantity"]) / 100;
}

$shipping = 5;
$total = $subtotal - $discount + $shipping;

/* INSERT ORDER */
$stmt = $conn->prepare("INSERT INTO orders (user_id, total, shipping) VALUES (?, ?, ?)");
if ($stmt === false) {
    echo json_encode(["success" => false, "error" => "Prepare failed: " . $conn->error]);
    exit;
}
$stmt->bind_param("idd", $userId, $total, $shipping);

if (!$stmt->execute()) {
    echo json_encode(["success" => false, "error" => "Insert order failed: " . $stmt->error]);
    exit;
}

$orderId = $stmt->insert_id;

/* INSERT ORDER ITEMS */
$itemStmt = $conn->prepare(
    "INSERT INTO order_items (order_id, product_id, product_name, price, quantity)
     VALUES (?, ?, ?, ?, ?)"
);
if ($itemStmt === false) {
    echo json_encode(["success" => false, "error" => "Prepare failed for order items: " . $conn->error]);
    exit;
}

foreach ($cartItems as $item) {
    $itemStmt->bind_param("iisdi", $orderId, $item["id"], $item["name"], $item["price"], $item["quantity"]);
    if (!$itemStmt->execute()) {
        echo json_encode(["success" => false, "error" => "Insert order item failed: " . $itemStmt->error]);
        exit;
    }

    // Update product stock
    $stockStmt = $conn->prepare("UPDATE products SET stock = stock - ? WHERE id = ?");
    $stockStmt->bind_param("ii", $item["quantity"], $item["id"]);
    if (!$stockStmt->execute()) {
        echo json_encode(["success" => false, "error" => "Failed to update stock for product ID " . $item["id"] . ": " . $stockStmt->error]);
        exit;
    }
}

echo json_encode(["success" => true]);

$itemStmt->close();
$stockStmt->close();
$stmt->close();
$conn->close();
?>
