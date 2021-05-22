<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create new password</title>
    <?php require_once '../sections/fonts.php'; ?>

    <link rel="stylesheet" href="../styles/style.css">
    <link rel="stylesheet" href="../styles/form.css">
</head>
<body>

    <?php 

        if (isset($_SESSION['login_success']) && $_SESSION['login_success']) {
            header("Location: ../reset-password");
            die();
        }


        if (!isset($_GET['selector']) || !isset($_GET['validator'])) {
            header("Location: ../reset-password");
            die();
        }

        


        $selector = $_GET['selector'];
        $validator = $_GET['validator'];

        if (!ctype_xdigit($selector) || !ctype_xdigit($validator)) {
            header("Location: ../reset-password");
            die();
        }

    ?>

    <?php 
        require_once '../sections/reset_password_header.php';
    ?>

    
    <div class="content">
        <div class="card">
            <div class="title">
                <h1>Reset your password!</h1>
            </div>
            
            <form action="includes/reset-password.inc.php" method="POST">
                
                <input type="hidden" name="selector" value="<?php echo $selector; ?>">
                <input type="hidden" name="validator" value="<?php echo $validator; ?>">
                <input type="password" name="pwd" placeholder="Your new password...">
                <input type="password" name="repeat-pwd" placeholder="Repeat your new password...">

                <button type="submit" name="reset-password">Reset password</button>
                
            </form>
        
            
        </div>

        <div class="errors">
            
        </div>
        
        <?php
            if (isset($_COOKIE['reset_pwd_email']) && $_COOKIE['reset_pwd_email']) {
                echo "<span class='create-account-message'>An email has been sent to your account! Check out your email!</span>";
            }
        ?>

    </div>

</body>
</html>

