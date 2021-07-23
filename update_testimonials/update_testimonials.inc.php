<?php 
session_start();

require_once '../connectionDB/connection.php';

if (!isset($_POST['message']) || !isset($_POST['stars']) || !isset($_POST['improvements'])) header("Location: ../../");

$message = $_POST['message'];
$stars = $_POST['stars'];
$improvements = $_POST['improvements'];
$id = $_SESSION['user_id'];

$sql = "INSERT INTO testimonials (message, rating, id) VALUES ('$message', '$stars', '$id');";
$result = $conn->query($sql);



$sql = "INSERT INTO feedback (likes, dislikes, id) VALUES ('0', '0', '$id');";
$result = $conn->query($sql);


// Email the improvements

$sql = "SELECT * FROM users WHERE id='$id';";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

if ($improvements !== "") {
    
    $to = "mihaibbb10@gmail.com";
    $subject = "Improvements on the Sudoku App";
    $message = "You have received an e-mail from " . $row["email"] . "\n\n" .  $improvements;
    $headers = "From: " . $row["email"];
    mail($to, $subject, $message, $headers);
}


$_SESSION['testimonial'] = true;


header("Location: ../testimonials");