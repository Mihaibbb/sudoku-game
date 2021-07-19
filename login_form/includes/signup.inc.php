<?php 
session_start();

require_once '../../connectionDB/connection.php';

$name = $_POST['name'];
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$repeat_password = $_POST['repassword'];

$hash_password = password_hash($password, PASSWORD_DEFAULT);
$sql = "SELECT * FROM users";
$my_result = mysqli_query($conn, $sql);


while ($row = $my_result->fetch_assoc()) {
    
    if ($email === $row['email']) {
        $_SESSION['error'] = 'email';
        header("Location: ../../");
        die();
    } 

    if ($username === $row['username']) {
        $_SESSION['error'] = 'username';
        header("Location: ../../");
        die();
    }
}

$sql = "INSERT INTO users (name, username, email, password) VALUES ('$name', '$username', '$email', '$hash_password')";
$result = mysqli_query($conn, $sql);

$_SESSION['create_account_message'] = true;
$_SESSION['signup_success'] = true;
header("Location: ../../");


