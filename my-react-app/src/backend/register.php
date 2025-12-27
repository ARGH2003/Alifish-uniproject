<?php
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    echo json_encode(["ok" => true]);
    exit;
}

$conn = new mysqli("localhost", "root", "", "fishshop-dp");
if ($conn->connect_error) {
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

$firstName = $_POST["first-name"] ?? "";
$lastName  = $_POST["last-name"] ?? "";
$phone     = $_POST["phone"] ?? "";
$address   = $_POST["address"] ?? "";
$email     = $_POST["email"] ?? "";
$username  = $_POST["username"] ?? "";
$password  = $_POST["password"] ?? "";
$confirm   = $_POST["confirm-password"] ?? "";

if ($password !== $confirm) {
    echo json_encode(["status" => "error", "message" => "Passwords do not match"]);
    exit;
}

$hashed = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare(
    "INSERT INTO users (first_name, last_name, phone, address, email, username, password)
     VALUES (?, ?, ?, ?, ?, ?, ?)"
);

$stmt->bind_param(
    "sssssss",
    $firstName,
    $lastName,
    $phone,
    $address,
    $email,
    $username,
    $hashed
);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Registered successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Insert failed"]);
}

$stmt->close();
$conn->close();
