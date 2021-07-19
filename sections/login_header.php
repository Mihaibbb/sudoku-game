<header>

    <nav>

    <p><img class="language" src="../../img/ro.png" alt="ro_img"></p>

    <?php 
        if (isset($_SESSION['login_success']) && $_SESSION['login_success']) {
            echo "<a href='account'><p class='account_item'>Account</p></a> ";
        }
    ?>

        <?php 
             if (isset($_SESSION['login_success']) && $_SESSION['login_success']) {
                echo "<a href='account'><p class='account_item'>Account</p></a> ";
             }
        ?>
        <a href="../../"><p>Sudoku Game</p></a>
        <p>Sudoku Tips & Tricks</p>
        <p>Leaderboard</p>
        <?php 
            if (isset($_SESSION['login_success']) && $_SESSION['login_success']) {
                echo " <a href='login_form/includes/logout.inc.php'><p>Log out</p></a> ";
            } else {
                echo "
                <a href='login'><p>Log In</p><a>
                <a href='signup'><p>Sign Up</p></a>
                ";
            }
        ?>

        
        <div class="dark_mode">
            <i class="fas fa-moon"></i>
        </div>
   
            
    </nav>
    
</header>