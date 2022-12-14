<?php 
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <?php require_once '../../sections/fonts.php'; ?>

    <link rel="stylesheet" href="../../styles/style.css">
    <link rel="stylesheet" href="../../styles/form.css">
    <script src="../scripts/form-validation.js" defer></script>
</head>
<body>

    <?php   
        if (isset($_SESSION['signup_success']) && $_SESSION['signup_success']) {
            header("Location: ../../");
            die();
        }
    ?>

    <?php 
        require_once '../../sections/login_header.php';
    ?>

    

    <div class="content">
        <div class="card">
            <div class="title">
                <h1>Signup</h1>
            </div>
            
            <form action="../includes/signup.inc.php" method="POST" class="signup-form">
                <input type="text" name="name" placeholder="Your name...">
                <input type="text" name="username" placeholder="Your username...">
                <input type="text" name="email" class="email" placeholder="Your email..." >
                <input type="password" name="password" class="password1" placeholder="Your password...">
                <input type="password" name="repassword" class="password2" placeholder="Repeat your password...">
                <button type="submit">Create your account!</button>
                <div class="have_account">Already have an account? <a href="login.php">Log in here</a></div>
            </form>
        
            
        </div>

        <div class="errors">
            <?php 
                if (isset($_SESSION['error']) && $_SESSION['error'] == 'email') {
                    echo "<div class='error'>Email-ul este deja folosit!</div>";
                    
                }

                if (isset($_SESSION['error']) && $_SESSION['error'] === 'user') {
                    echo "<div class='error'>Username-ul este deja folosit!</div>";
                   
                }

            ?>
        </div>
</div>
    
</body>
</html>