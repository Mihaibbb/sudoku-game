<?php 
session_start();


if (!isset($_POST['time']) || !isset($_POST['score'])) {
    $_SESSION['error'] = 'submit';
    header("Location: ../../");
    die();
}

$time = $_POST['time'];
$score = $_POST['score'];
$difficulty = $_POST['difficulty'];
$mistakes = $_POST['mistakes'];


if (!isset($_SESSION['login_success']) || $_SESSION['login_success'] === false) {
    header("Location: ../../");
    die();
}

require_once '../../connectionDB/connection.php';

$user_id = $_SESSION['user_id'];


$sql = "SELECT * FROM users WHERE id='$user_id'";
$result = $conn->query($sql);


$row = $result->fetch_assoc();
// Updating the all scores column 

$all_scores = $row["all_scores"];

if ($all_scores !== "0") {
    $all_scores = $all_scores . " " . $score;
} else {
    $all_scores = $score;
}

// Update the mistakes column

$mistakes_db = $row["mistakes"];
$total_mistakes = $mistakes_db + $mistakes;

// Update the difficulty matches column
$difficulty_matches_db = $row[$difficulty];
$total_matches =  $difficulty_matches_db + 1;

$score_db = $row['score'];
$time_played_db = $row['time_played'];
$final_score = $score + $score_db;

$sql = "UPDATE users SET score='$final_score' WHERE id='$user_id';";
$result = $conn->query($sql);

$sql = "UPDATE users SET all_scores='$all_scores' WHERE id='$user_id';";
$result2 = $conn->query($sql);

if ($difficulty === "easy") $sql = "UPDATE users SET easy='$total_matches' WHERE id='$user_id';";
else if ($difficulty === "medium") $sql = "UPDATE users SET medium='$total_matches' WHERE id='$user_id';";
else if ($difficulty === "hard") $sql = "UPDATE users SET hard='$total_matches' WHERE id='$user_id';";
else $result3 = FALSE;

$result3 = $conn->query($sql);

$sql = "UPDATE users SET mistakes='$total_mistakes' WHERE id='$user_id';";
$result4 = $conn->query($sql);

if ($result && $result2 && $result3 && $result4) {
    $_SESSION["score"] = $final_score;
    $_SESSION["last_match_score"] = $score;
    header("Location: ../../account");
    die();
}


        
  








