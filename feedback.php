<?php 
    session_start();
    if (isset($_SESSION['feedback']) && $_SESSION['feedback']) {
        header("Location: ../");
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback</title>
    <?php require_once './sections/fonts.php'; ?>
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/feedback.css">

    <script src="./scripts/feedback.js" defer></script>
</head>
<body>
    <?php require_once './sections/header.php'; ?>

    <div class="container">
        <div class="feedback_container">
            <h2 class="title">Create testimonial</h2>

            <form class="content" action="./update_testimonials/update_testimonials.inc.php" method="post">
                
                <textarea name="message" class="comment" placeholder="Your opinion about our application..."></textarea>

                <div class="rating">
                    <p>How was the overall experience with our application?</p>
                    <div class="stars">
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                    </div>
                    
                </div>

                <div class="improvements">
                    <h2>What can we do to make it better?</h2>
                </div>

                <textarea name="improvements" class="comment" placeholder=""></textarea>

                

                <input type="hidden" name="stars" class="number_of_stars" value="0">

                <button type="submit" class="submit-button">Submit</button>
                
            </form>

            
        </div>
    </div>
    
</body>
</html>