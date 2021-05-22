<?php 

echo (int) 7200 / 3600;

if (!isset($_POST['time']) || !isset($_POST['score'])) {
    $_SESSION['error'] = 'submit';
    header("Location: ../../");
    die();
}

$time = $_POST['time'];
$score = $_POST['score'];
$gamemode = $_POST['mode'];

if ($gamemode === "classic" && (!isset($_SESSION['login_success']) || $_SESSION['login_success'] === false)) {
    header("Location: ../../");
    die();
}

require_once '../../connectionDB/connection.php';

$user_id = $_SESSION['user_id'];

if ($gamemode === "classic") {
    $sql = "SELECT * FROM users WHERE id='$user_id'";
    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()) {
        $score_db = $row['classic_score'];
        $time_played_db = $row['time_played'];

        $final_score = $score + $score_db;
        $final_time = fromTimeToSeconds($time) + $time_played_db;
        
    }

}

function fromTimeToSeconds($time) {
   
}

function fromSecondsToTime($time) {
    
}





