<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    echo json_encode(["ok" => true]);
    exit;
}

$conn = new mysqli("localhost", "root", "", "fishshop-dp");
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit;
}

$username = $_POST["username"] ?? "";
$password = $_POST["password"] ?? "";

$stmt = $conn->prepare(
    "SELECT id, password, first_name, last_name FROM users WHERE username = ?"
);

$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
    exit;
}

$stmt->bind_result($id, $hashed, $firstName, $lastName);
$stmt->fetch();


if (!password_verify($password, $hashed)) {
    echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
    exit;
}

// ✅ LOGIN SUCCESS → CREATE SESSION
$_SESSION["user_id"] = $id;
$_SESSION["username"] = $username;
$_SESSION["first_name"] = $firstName;
$_SESSION["last_name"] = $lastName;

echo json_encode([
    "status" => "success",
    "message" => "Login successful",
    "username" => $username
]);

$stmt->close();
$conn->close();
