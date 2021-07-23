<?php 

require_once '../connectionDB/connection.php';
session_start();

$type = $_POST['type'];
$likes = $_POST['likes'];
$dislikes = $_POST['dislikes'];
$id = $_POST['id'];
$feedback_id = $_SESSION['user_id'];

$sql = "SELECT * FROM users WHERE id='$feedback_id'";

$result = $conn->query($sql);

$row = $result->fetch_assoc();

$likes_id = $row['likes'];
$dislikes_id = $row['dislikes'];

$likes_id_array = explode(" ", $row['likes']);
$dislikes_id_array = explode(" ", $row['dislikes']);

if ($type === 'likes') {

    $found_like = false;
    $found_dislike = false;

    $new_like_array = "";
    $new_dislike_array = "";

    foreach ($likes_id_array as $like_id) {
        if ($like_id === $id) {
            $found_like = true;
            
        }  else {
            $new_like_array = $new_like_array . " " . $like_id;
        }
    }

    foreach ($dislikes_id_array as $dislike_id) {
        if ($dislike_id === $id) {
            $found_dislike = true;
        } else {
            $new_dislike_array = $new_dislike_array . " " . $dislike_id;
        }
    }
    
    if ($found_like) {
        
        $update_sql = "UPDATE users SET likes='$new_like_array' WHERE id='$feedback_id';";
        $update_result = $conn->query($update_sql);
        
        $update_feedback_sql = "UPDATE feedback SET likes='$likes', dislikes='$dislikes' WHERE id='$id';";
        $update_feedback_result = $conn->query($update_feedback_sql);
        

    } else if ($found_dislike) {
        if ($likes_id !== "") {
            $new_like_array = $likes_id . " " . $id;
        } else {
            $new_like_array = $id;
        }

        $update_sql = "UPDATE users SET likes='$new_like_array', dislikes='$new_dislike_array' WHERE id='$feedback_id';";
        $update_result = $conn->query($update_sql);

        $update_feedback_sql = "UPDATE feedback SET likes='$likes', dislikes='$dislikes' WHERE id='$id';";
        $update_feedback_result = $conn->query($update_feedback_sql);

    } else if (!$found_like && !$found_dislike) {
        
        if ($likes_id !== "") {
            $new_like_array = $likes_id . " " . $id;
        } else {
            $new_like_array = $id;
        }
        
        $update_sql = "UPDATE users SET likes='$new_like_array' WHERE id='$feedback_id';";
        $update_result = $conn->query($update_sql);
        
        $update_feedback_sql = "UPDATE feedback SET likes='$likes', dislikes='$dislikes' WHERE id='$id';";
        $update_feedback_result = $conn->query($update_feedback_sql);
        
    }

} else if ($type === 'dislikes') {

    $found_like = false;
    $found_dislike = false;

    $new_like_array = "";
    $new_dislike_array = "";

    foreach ($likes_id_array as $like_id) {
        if ($like_id === $id) {
            $found_like = true;
            
        }  else {
            $new_like_array = $new_like_array . " " . $like_id;
        }
    }

    foreach ($dislikes_id_array as $dislike_id) {
        if ($dislike_id === $id) {
            $found_dislike = true;
        } else {
            $new_dislike_array = $new_dislike_array . " " . $dislike_id;
        }
    }
    
    if ($found_like) {
        
        if ($dislikes_id !== "") {
            $new_dislike_array = $dislikes_id . " " . $id;
        } else {
            $new_dislike_array = $id;
        }

        $update_sql = "UPDATE users SET likes='$new_like_array', dislikes='$new_dislike_array' WHERE id='$feedback_id';";
        $update_result = $conn->query($update_sql);

        $update_feedback_sql = "UPDATE feedback SET likes='$likes', dislikes='$dislikes' WHERE id='$id';";
        $update_feedback_result = $conn->query($update_feedback_sql);
        

    } else if ($found_dislike) {
        $update_sql = "UPDATE users SET dislikes='$new_dislike_array' WHERE id='$feedback_id';";
        $update_result = $conn->query($update_sql);

        $update_feedback_sql = "UPDATE feedback SET likes='$likes', dislikes='$dislikes' WHERE id='$id';";
        $update_feedback_result = $conn->query($update_feedback_sql);

    } else if (!$found_like && !$found_dislike) {
        
        if ($dislikes_id !== "") {
            $new_dislike_array = $dislikes_id . " " . $id;
        } else {
            $new_dislike_array = $id;
        }
        
        $update_sql = "UPDATE users SET dislikes='$new_dislike_array' WHERE id='$feedback_id';";
        $update_result = $conn->query($update_sql);

        $update_feedback_sql = "UPDATE feedback SET likes='$likes', dislikes='$dislikes' WHERE id='$id';";
        $update_feedback_result = $conn->query($update_feedback_sql);
    }
}


if ($update_result) {
    echo 'Success';
}
