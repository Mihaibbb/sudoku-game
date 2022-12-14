<header>

  


    <nav>

        <input type="checkbox" id="check">
        <label for="check" class="checkbtn">
            <i class="fas fa-bars"></i>
        </label>

        <li class="dark_mode">
                <i class="fas fa-moon"></i>
        </li>
        
        
        <li class="img"><img class="../../language" src="../../img/ro.png" alt="ro_img"></li>
        <ul>
       
                <?php 

                    if (isset($_SESSION['login_success']) && $_SESSION['login_success']) {
                                            
                        echo "<li class='item account_item'><a href='../../../account'>Account</a></li> "; 
                    }


                    echo '<li class="item sudoku_game_item"><a href="../../">Sudoku Game</a></li>
                        <li class="item"><a href="../../tutorial">Tutorial</a></li>
                        <li class="item tips_and_tricks_item"><a href="../../testimonials">Testimonials</a></li>
                        <li class="item"><a href="../../leaderboard">Leaderboard</a></li>';
                ?> 

                <?php 
                    if (isset($_SESSION['login_success']) && $_SESSION['login_success']) {
                        
                            echo "
                            <li class='item log_out_item'><a href='../../login_form/includes/logout.inc.php'>Log out</a></li>
                            ";
                       
                    } else {  
                            echo "
                            <li class='item log_in_item'><a href='../../login_form/forms/login'>Log in</a></li>
                            <li class='item sign_up_item'><a href='../../login_form/forms/signup'>Sign up</a></li>
                            ";
                    }
                ?>
        </ul>
    </nav>
    
</header>

