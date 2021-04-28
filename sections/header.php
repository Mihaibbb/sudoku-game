<header>

    <nav>
        <a href="./"><p>Sudoku Game</p></a>
        <p>Sudoku Tips & Tricks</p>

        <?php 
            if (isset($_SESSION['login_success']) && $_SESSION['login_success']) {
                echo "
                <a href='login_form/includes/logout.inc.php'><p>Log out</p></a>
                <a href='account'><p>Account</p></a>  
                ";
            } else {

                echo "
                <a href='login_form/forms/login.php'><p>Log In</p><a>
                <a href='login_form/forms/signup.php'><p>Sign Up</p></a>
                ";
            }
        ?>
            
    </nav>
    
</header>