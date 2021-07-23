<?php 
    session_start();
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset password</title>

    <?php require_once './sections/fonts.php'; ?>

    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/form.css">
    <script src="./login_form/scripts/form-validation-reset-password.js" defer></script>
</head>
<body>

    <?php 
        if (isset($_SESSION['login_success']) && $_SESSION['login_success']) {
            header("Location: ./");
            die();
        }
    ?>

    <?php 
        require_once './sections/header.php';
    ?>

    
    <div class="content">
        <div class="card">
            <div class="title">
                <h1>Reset your password</h1>
            </div>
            
            <form action="./forgot_password/includes/reset-request.inc.php" method="POST">
                <label for="email"> 
                    Enter your email here:
                </label>
                <input type="text" name="email" placeholder="Your email..."> 
                <button type="submit" name="reset-request">Send</button>
            </form>
        
        </div>

        <?php
            if (isset($_SESSION['reset_pwd_email'])) {
                echo "<span class='create-account-message'>An email has been sent to your account! Check out your email!</span>";
            }
        ?>

        <div class="errors">
            
        </div>
        
    </div>
</body>
</html>