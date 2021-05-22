
<div class="content">

    <div class="card">

        <div class="title">
            <h1>
                <span class="sign-option-button sign active-form">Sign Up</span>
                | 
                <span class="sign-option-button login">Log In</span>
                <i class="fas fa-times"></i>
            </h1>
        </div>

        <div class="forms">

            <form action="login_form/includes/signup.inc.php" method="POST" class="signup-form">
                <input type="text" name="name" placeholder="Your name...">
                <input type="text" name="username" placeholder="Your username...">
                <input type="text" name="email" class="email" placeholder="Your email..." >
                <input type="password" name="password" class="password1" placeholder="Your password...">
                <input type="password" name="repassword" class="password2" placeholder="Repeat your password...">
                <button type="submit">Create your account!</button>
                <div class="have_account">Already have an account? <a href="login.php">Log in here</a></div>
            </form>

            <form action="login_form/includes/login.inc.php" method="POST" class="login-form">
                <input type="text" name="email" placeholder="Your email..."> 
                <input type="password" name="password" class="password1" placeholder="Your password...">
                <a href="./reset-password">
                    <p class="forgot-password">Forgot your password?</p>
                </a>
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
        
    </div>


    <div class="errors">
        <?php 

        if (isset($_SESSION['login_error']) && $_SESSION['login_error']) {

            echo "<div class='error'>Email-ul sau parola sunt gresite</div>";
            $_SESSION['login_error'] = false;
        }

            if (isset($_SESSION['error']) && $_SESSION['error'] == 'email') {
                echo "<div class='error'>Email-ul este deja folosit!</div>";
                die();
            }

            if (isset($_SESSION['error']) && $_SESSION['error'] === 'user') {
                echo "<div class='error'>Username-ul este deja folosit!</div>";
                die();
            
            }

        ?>
    </div>

</div>
