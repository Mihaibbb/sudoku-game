<?php 
session_start();


if (!isset($_POST['time']) || !isset($_POST['score'])) {
    $_SESSION['error'] = 'submit';
    header("Location: ../../");
    die();
}

$time = $_POST['time'];
$score = $_POST['score'];


if (!isset($_SESSION['login_success']) || $_SESSION['login_success'] === false) {
    header("Location: ../../");
    die();
}

require_once '../../connectionDB/connection.php';

$user_id = $_SESSION['user_id'];


$sql = "SELECT * FROM users WHERE id='$user_id'";
$result = $conn->query($sql);

$row = $result->fetch_assoc();
$score_db = $row['score'];
$time_played_db = $row['time_played'];
$final_score = $score + $score_db;

$sql = "UPDATE users SET score='$final_score' WHERE id='$user_id';";
$result = $conn->query($sql);

if ($result) {
    $_SESSION["score"] = $final_score;
    header("Location: ../../competitive");
    die();
}


        
  








