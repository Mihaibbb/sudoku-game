<?php 
session_start();

require_once '../connectionDB/connection.php';

$email = $_POST['email'];
$password = $_POST['password'];
$remember_user = $_POST['remember_user'];


$sql = "SELECT * FROM users";
$result = mysqli_query($conn, $sql);

while ($row = $result->fetch_assoc()) {
    if ($email === $row['email'] && password_verify($password, $row['password'])) {

        
        $_SESSION['name'] = $row['name'];
        $_SESSION['username'] = $row['username'];
        $_SESSION['email'] = $row['email'];
        $_SESSION['login_success'] = true;
        $_SESSION['login_success_message'] = true;
        $_SESSION['login_required'] = true;
        
        
        header("Location: ../../");
        die();
    }
}


$_SESSION['login_success'] = false;
header("Location: ../../");