<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (isset($_SESSION["user_id"])) {
    echo json_encode([
        "loggedIn" => true,
        "firstName" => $_SESSION["first_name"],
        "lastName" => $_SESSION["last_name"]
    ]);
} else {
    echo json_encode([
        "loggedIn" => false
    ]);
}
