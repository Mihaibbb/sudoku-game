<?php 
    session_start();
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log In</title>

    <?php require_once '../../sections/fonts.php'; ?>

    <link rel="stylesheet" href="../../styles/style.css">
    <link rel="stylesheet" href="../../styles/form.css">
    <script src="../scripts/form-validation-login.js" defer></script>
</head>
<body>
    <?php 
        require_once '../../sections/login_header.php';
    ?>

    <div class="content">
        <div class="card">
            <div class="title">
                <h1>Log in!</h1>
            </div>
            
            <form action="../includes/login.inc.php" method="POST" class="login-form">
                <input type="text" name="email" placeholder="Your email..."> 
                <input type="password" name="password" class="password1" placeholder="Your password...">
                <div class="checkbox-content">
                    <input type="checkbox" name="remember_user" class="check-box">
                    <span>Remember me</span>
                    <?php 
                        
                    ?>
                </div>
                
                <button type="submit">Login</button>
                <div class="no_account">Don't have an account? <a href="signup.php">Sign up here!</a></div>
            </form>
        
            
        </div>

        <div class="errors">
            <?php 

                if (isset($_SESSION['login_error']) && $_SESSION['login_error']) {

                    echo "<div class='error'>Email-ul sau parola sunt gresite</div>";
                    $_SESSION['login_error'] = false;
                }
            ?>
        </div>
        
        
    </div>
</body>
</html>