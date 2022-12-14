<?php 
session_start();


if (!isset($_POST['pwd']) || !isset($_POST['repeat-pwd']) || !isset($_POST['reset-password'])) {
    header("Location: ../../reset-password");
    die();
}

require_once '../../connectionDB/connection.php';

$selector = $_POST['selector'];
$validator = $_POST['validator'];
$password = $_POST['pwd'];
$repeatPassword = $_POST['repeat-pwd'];

$currentDate = date("U");

$sql = "SELECT * FROM pwdreset WHERE resetSelector=? AND resetExpires >= ?;";

$stmt = $conn->stmt_init();
if (!$stmt->prepare($sql)) {
    die("There was an error");
}
$stmt->bind_param("ss", $selector, $currentDate);
$stmt->execute();

$result = $stmt->get_result(); 

if (!$row = $result->fetch_assoc()) {
    die("You need to re-submit your reset password request.");
}

$tokenBin = hex2bin($validator);
$tokenCheck = password_verify($tokenBin, $row['resetToken']);

if (!$tokenCheck) {
    die("You need to re-submit your reset password request.");
}

$tokenEmail = $row['resetEmail'];

$sql = "SELECT * FROM users WHERE emailUsers = ?;";
$stmt = $conn->stmt_init();
if (!$stmt->prepare($sql)) {
    die("There was an error");
}
$stmt->bind_param("s", $tokenEmail);
$stmt->execute();

$result = $stmt->get_result();
if (!$row = $result->fetch_assoc()) {
    die("You need to re-submit your reset password request.");
}

$sql = "UPDATE users SET password=? WHERE email=?;";
$conn->stmt_init();
if (!$stmt->prepare($sql)) {
    die("There was an error");
}

// Crypting the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$stmt->bind_param("ss", $hashed_password, $tokenEmail);
$stmt->execute();

$sql = "DELETE FROM pwdreset WHERE resetEmail=?;";
$stmt = $conn->stmt_init();

if (!$stmt->prepare($sql)) {
    die("There was an error");
}

$stmt->bind_param("s", $tokenEmail);
$stmt->execute();
$_SESSION['password_reseted'] = true;
header("../../login_form/forms/login");


