<?php 
session_start();



if (!isset($_POST['time']) || !isset($_POST['score'])) {
    $_SESSION['error'] = 'submit';
    header("Location: ../../");
    die();
}

$time = $_POST['time'];
$time_seconds = strtotime($time) - strtotime('TODAY');
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

// Updating the all times

$all_times = $row["all_times"];

if ($all_times !== "00:00:00")
    $all_times = $all_times . " " . $time_seconds;
else 
    $all_times = $time_seconds;

// Update mistakes/match column

$mistakes_matches = $row["mistakes_matches"];

if ($mistakes_matches !== "0") {
    $mistakes_matches = $mistakes_matches . " " . $mistakes;
} else {
    $mistakes_matches = $mistakes;
}

// Update the time

$time_db = $row["time_played"];
$total_time = $time_seconds + $time_db;

// Update the score on difficulty category

$difficulty_score_db = $row[$difficulty . "_score"];
$total_difficulty_score = $score + $difficulty_score_db;

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


$result3 = $conn->query($sql);

if ($difficulty === "easy") $sql = "UPDATE users SET easy_score='$total_difficulty_score' WHERE id='$user_id';";
else if ($difficulty === "medium") $sql = "UPDATE users SET medium_score='$total_difficulty_score' WHERE id='$user_id';";
else if ($difficulty === "hard") $sql = "UPDATE users SET hard_score='$total_difficulty_score' WHERE id='$user_id';";

$result4 = $conn->query($sql);

$sql = "UPDATE users SET mistakes='$total_mistakes' WHERE id='$user_id';";
$result5 = $conn->query($sql);

$sql = "UPDATE users SET mistakes_matches='$mistakes_matches' WHERE id='$user_id';";
$result7 = $conn->query($sql);

$sql = "UPDATE users SET all_times='$all_times' WHERE id='$user_id';";
$result8 = $conn->query($sql);

if ($result && $result2 && $result3 && $result4 && $result5 && $result7 && $result8) {
    $_SESSION["score"] = $final_score;
    $_SESSION["last_match_score"] = $score;
    $_SESSION["time"] = $time;
    $_SESSION["time_db"] = $time_db;
    header("Location: ../../account");
    die();
}


        
  








