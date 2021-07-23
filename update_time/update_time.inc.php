<?php 

session_start();

if (!isset($_POST['time'])) {
    echo 'Fail';
    die();
}

require_once '../connectionDB/connection.php';

$time = $_POST['time'];
$id = $_SESSION['user_id'];

$sql = "SELECT * FROM users WHERE id='$id';";
$result = $conn->query($sql);


$row = $result->fetch_assoc();
    
$old_time_played = $row['time_played'];
$new_time_played = $old_time_played + $time;
echo $new_time_played;


$new_sql = "UPDATE users SET time_played='$new_time_played' WHERE id='$id';";
$new_result = $conn->query($new_sql);





