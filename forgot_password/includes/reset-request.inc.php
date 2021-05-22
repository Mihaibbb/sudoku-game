<?php 
session_start();
if (!isset($_POST['reset-request']))  {
    header("Location: ../../reset-password");
    die();
}    

require_once '../../connectionDB/connection.php';

$selector = bin2hex(random_bytes(8));
$token = random_bytes(32);

$url = "http://www.localhost/Sudoku/forgot_password/create-new-password?selector=" . $selector . "&validator=" . bin2hex($token);
$expire_date = date("U") + 1800;

$userEmail = $_POST['email'];

$sql = "DELETE FROM pwdreset WHERE resetEmail=?";
$stmt = $conn->stmt_init();

if (!$stmt->prepare($sql)) {
    die("There was an error" . mysqli_error());
}

$stmt->bind_param("s", $userEmail);
$stmt->execute();

$sql = "INSERT INTO pwdreset (resetEmail, resetSelector, resetToken, resetExpires) VALUES (?, ?, ?, ?);";

$stmt = $conn->stmt_init();
if (!$stmt->prepare($sql)) {
    die("There was an error" . mysqli_error());
}
$hashedToken = password_hash($token, PASSWORD_DEFAULT);
$stmt->bind_param("ssss", $userEmail, $selector, $hashedToken, $expire_date);
$stmt->execute();
$stmt->close();
mysqli_close($conn);

$to = $userEmail;
$subject = 'Reset your password from sudoku game!';
$message = '<p>You\'re receiving this email because you requested a password reset for your Sudoku Account. If you did not request this change, you can safely ignore this email.</p><br>';
$message .= '<p>To choose a new password and complete your request, please follow the link below:</p><br>';
$message .= '<a href="' . $url . '"><p>' . $url . '</p></a><br>';
$message .= '<p>If it is not clickable, please copy and paste the URL into your browser\'s address bar.</p><br><br>';
$message .= '<p>Happy playing!, <br> The Sudoku Team </p>';

$headers = "From: sudokuTeam <sudoku_team@gmail.com>\r\n";
$headers .= "Reply-To: sudokuTeam@gmail.com\r\n";
$headers .= "Content-type: text/html\r\n";

mail($to, $subject, $message, $headers);
$_SESSION['reset_pwd_email'] = true;
header("Location: ../../reset-password");