<?php 
    session_start();
   
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Testimonials</title>
    <?php require_once './sections/fonts.php'; ?>
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/testimonials.css">

    <script src="./scripts/testimonials.js" defer></script>
</head>
<body>
    <?php require_once './sections/header.php'; ?>

    <?php require_once './connectionDB/connection.php'; ?>

    <div class="title">
        <h1>Testimonials</h1>
    </div>
    <?php 
    
        if (isset($_SESSION['login_success']) && $_SESSION['login_success']) {
            echo '<div class="login"></div>';
        }
    ?>

    <?php 
         $sql = "SELECT * FROM testimonials;";
            
         $result = $conn->query($sql);
         
         

         $ids = [];



         while ($row = $result->fetch_assoc()) {
             
             $id = $row["id"];


             if (isset($_SESSION['user_id'])) {
                 $user_id = $_SESSION['user_id'];

                 if ($user_id === $id) $feedbacked = true;
                 else $feedbacked = false;
             }

            

             if (isset($feedbacked)) {
                if (!isset($_SESSION['testimonial']) && !$feedbacked) {
                    echo '
                    <a href="./feedback">
                        <div class="create_review">
                            <h2>Give us feedback</h2>
                        </div>
                    </a>
                    ';

                    break;

                }
            }

         }
    ?>
   

    <div class="reviews_container">

        <?php
            $sql = "SELECT * FROM testimonials;";
            
            $result = $conn->query($sql);
            
            

            $ids = [];


            while ($row = $result->fetch_assoc()) {
                
                $id = $row["id"];

                

                if (isset($_SESSION['user_id'])) {
                    $user_id = $_SESSION['user_id'];

                    if ($user_id === $id) $feedbacked = true;
                    else $feedbacked = false;
                }
                
                $found = false;

                foreach ($ids as $used_id) {
                    if ($id === $used_id) $found = true;
                }
                
                array_push($ids, $id);

                $message = $row["message"];
                $rating = $row["rating"];

                if (isset($_SESSION['user_id'])) {
                    $user_id = $_SESSION['user_id'];
                    $sql_user_id = "SELECT * FROM users WHERE id='$user_id';";
                    $result_user_id = $conn->query($sql_user_id);
                    $row_user_id =  $result_user_id->fetch_assoc();
                    
                    $likes = $row_user_id['likes'];
                    $dislikes = $row_user_id['dislikes'];

                    $likes_array = explode(" ", $likes);
                    $dislikes_array = explode(" ", $dislikes);

                    $active_likes = false;
                    $active_dislikes = false;

                    foreach ($likes_array as $like_array) {
                        if ($like_array == $id) {
                            $active_likes = true;
                        }
                    }

                    foreach ($dislikes_array as $dislike_array) {
                        if ($dislike_array == $id) {
                            $active_dislikes = true;
                        }
                    }

                }

                $sql2 = "SELECT * FROM users WHERE id='$id';";

                $result2 = $conn->query($sql2);

                $row2 = $result2->fetch_assoc();

                $name = $row2['name'];
                $username = $row2['username'];

                $sql3 = "SELECT * FROM feedback WHERE id='$id';";

                $result3 = $conn->query($sql3);

                $row3 = $result3->fetch_assoc();

                $likes_number = $row3['likes'];
                $dislikes_number = $row3['dislikes'];

                


                
                
                echo '
                <div class="review">

                    <div class="profile">
                        <div class="id">'. $id .'</div>
                        <div class="image"><img src="./img/default_user.jpg" alt="" srcset=""></div>
                        <div class="details">
                            <div class="name">'. $name .'</div>
                            <div class="username">@'. $username . '</div>
                        </div>
                    </div>
                    
                    
                    <div class="text_content">'. $message .'</div>
                    <div class="rating">';

                    $empty_stars = 5 - $rating;

                    for ($i = 0; $i < $rating; $i++) {
                        echo '<i class="fas fa-star" aria-hidden="true"></i> ';
                    }

                    for ($i = 0; $i < $empty_stars; $i++) {
                        echo '<i class="far fa-star" aria-hidden="true"></i> ';
                    }

                    echo '</div>
        
                    <div class="feedback">';
                    
                    if (isset($active_likes) && $active_likes) {
                        echo ' <div class="like active">';
                    } else {
                        echo '<div class="like">';
                    }
                    
                    
                    echo '      <i class="fas fa-thumbs-up"></i>
                            <div class="numbers">'. $likes_number .'</div>
                        </div>';

                    if (isset($active_dislikes) && $active_dislikes) {
                        echo '<div class="dislike active">';
                    } else {
                        echo '<div class="dislike">';
                    }

                   

                    echo '
                            <i class="fas fa-thumbs-down"></i>
                            <div class="numbers">'. $dislikes_number .'</div>
                        </div>  
                        
                    </div>
                </div>  
                ';
            }
        ?>

        
    </div>

</body>
</html>