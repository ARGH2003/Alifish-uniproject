<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Connect to database
$conn = new mysqli("localhost", "root", "", "fishshop-dp");

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Handle GET: fetch all fish
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT id, name, price, discount, rating, stock, img FROM fish");
    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to fetch fish data"]);
        exit;
    }

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
    $conn->close();
    exit;
}

// Handle POST: update stock after payment
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['cartItems']) || !is_array($input['cartItems'])) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid request: cartItems missing"]);
        exit;
    }

    $cartItems = $input['cartItems'];
    $errors = [];

    foreach ($cartItems as $item) {
        if (!isset($item['id'], $item['quantity'])) {
            $errors[] = "Invalid item structure";
            continue;
        }

        $id = intval($item['id']);
        $quantity = intval($item['quantity']);

        // Check stock
        $res = $conn->query("SELECT stock, name FROM fish WHERE id=$id");
        if (!$res || $res->num_rows === 0) {
            $errors[] = "Fish ID $id not found";
            continue;
        }

        $row = $res->fetch_assoc();
        $stock = intval($row['stock']);
        $name = $row['name'];

        if ($quantity > $stock) {
            $errors[] = "Not enough stock for $name (available: $stock)";
            continue;
        }

        // Update stock
        $newStock = $stock - $quantity;
        if (!$conn->query("UPDATE fish SET stock=$newStock WHERE id=$id")) {
            $errors[] = "Failed to update stock for $name";
        }
    }

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(["error" => $errors]);
    } else {
        echo json_encode(["success" => true]);
    }

    $conn->close();
    exit;
}
?>

