<header>

    <nav>
        <p><img class="language" src="img/ro.png" alt="ro_img"></p>

        <?php 
             if (isset($_SESSION['login_success']) && $_SESSION['login_success']) {
                echo "<a href='account'><p class='account_item'>Account</p></a> ";
             }
        ?>
        <a href="./"><p class="sudoku_game_item">Sudoku Game</p></a>
        <p class="tips_and_tricks_item">Sudoku Tips & Tricks</p>
        <a href="leaderboard"><p>Leaderboard</p></a>

        <?php 
            if (isset($_SESSION['login_success']) && $_SESSION['login_success']) {
                echo "
                <a href='login_form/includes/logout.inc.php'><p class='log_out_item'>Log out</p></a>
                
                ";
            } else {

                echo "
                <a href='login_form/forms/login'><p class='log_in_item'>Log In</p><a>
                <a href='login_form/forms/signup'><p class='sign_up_item'>Sign Up</p></a>
                ";
            }
        ?>

        
        <label class="switch">
            <input type="checkbox">
            <span class="round"></span>
        </label>
       
            
    </nav>
    
</header>