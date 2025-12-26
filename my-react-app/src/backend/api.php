<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Connect to database
$conn = new mysqli("localhost", "root", "", "fishshop-dp");

// Check connection
if ($conn->connect_error) {
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

// Select all fish including stock and image
$result = $conn->query("SELECT id, name, price, discount, rating, stock, img FROM fish");

// Fetch data into array
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Return JSON
echo json_encode($data);

// Close connection
$conn->close();
