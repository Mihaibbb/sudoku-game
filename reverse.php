<?php 
   session_start();
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="styles/style.css" defer>
    <link rel="stylesheet" href="styles/form.css">

    <script src="scripts/reverseMode.js" type="module"></script>
    <script src="./login_form/scripts/form-validation.js" defer></script>
    <script src="./login_form/scripts/form-validation-login.js" defer></script>

    <?php 
        require_once 'sections/fonts.php';
    ?>
    
    <title>Sudoku - Reverse Mode</title>
</head>
<body>

    <?php 
        require_once 'sections/header.php';
    ?>

    <div class="login_system">
        <?php 
            require_once 'login_form/forms/form.php';
        ?>
    </div>

    <div class="game-mode">Reverse</div>
    <div class="end-game">
        <div class="game-result-card">
            <h2 class="result">You've</h2>
            <p class="final-score">Score: <i class="fas fa-bolt"></i></p>
            <p class="final-time">Time: <i class="fas fa-clock"></i></p>
            
            <button type="submit" class="newGame">New game</button>
            
        </div>
    </div>

    <div class="game">

        <div class='success'>
            <?php 
                if (isset($_SESSION['create_account_message']) && $_SESSION['create_account_message']) {
                    echo "<span class='create-account-message'>Your account was successfully created!</span>";
                    $_SESSION['create_account_message'] = false;
                }

                if (isset($_SESSION['login_success_message']) && $_SESSION['login_success_message']) {
                    echo "<span class='login-message'>Welcome, " . $_SESSION['username'] . "!</span>";
                    $_SESSION['login_success_message'] = false;
                }
            ?>
        </div>

        <div class="game-grid">
            
            <div class="game_modes reverse">
                <div class="mode_title">
                    <h1>Game Modes</h1>
                </div>
                <div class="modes">
                    <a href="./"><div class="mode classic">Classic Mode</div></a>
                    <a href="competitive"><div class="mode competitive">Competitive Mode</div></a>
                    <div class="mode reverse active">Reverse Mode</div>
                </div>
                
            </div> 

            <table class="board">

            </table>

            
            <div class="game-overlay">
                
                <div class="timer desktop">
                    <h2><span class="timer_text">Timer:</span> <span class="time"><span class="hours"></span><span class="minutes">00</span>:<span class="seconds">00</span></span></h2>
                    <div class="pause-time"><i class="fas fa-pause-circle"></i></div>
                </div>
                
                <div class="new-game desktop">
                    <h1>New Game</h1>
                </div>

                <div class="numbers-grid">
                
                    <div class="number" data-number><span>1</span></div>
                    <div class="number" data-number><span>2</span></div>
                    <div class="number" data-number><span>3</span></div>
                    <div class="number" data-number><span>4</span></div>
                    <div class="number" data-number><span>5</span></div>
                    <div class="number" data-number><span>6</span></div>
                    <div class="number" data-number><span>7</span></div>
                    <div class="number" data-number><span>8</span></div>
                    <div class="number" data-number><span>9</span></div>

                </div>

                <div class="game-control reverse">

                    <div class="command solveContainer">
                        <div class="solver"><i class="fas fa-tools"></i></div>
                        <div class="command-title">Solve</div>
                    </div>

                    <div class="command undoContainer">
                        <div class="undo"><i class="fas fa-history"></i></div>
                        <div class="command-title">Undo</div>
                    </div>

                    <div class="command eraseContainer">
                        <div class="erase"><i class="fas fa-backspace"></i></div>
                        <div class="command-title">Erase</div>
                    </div>
                </div>
                
            </div>
        </div>

        <p class="login_request">
            <?php 
                if (!isset($_SESSION['signup_success']) && !isset($_SESSION['login_success'])) {
                    echo 'Don\'t have an account? Sign Up <span class="sign-up-form">here!</span>';
                    die();    
                }

                if (!isset($_SESSION['login_success']) || !$_SESSION['login_success']) {
                    echo 'Log in <span class="sign-up-form">here!</span>';    
                }

                if (isset($_SESSION['login_success']) && !$_SESSION['login_success']) {
                    echo '<p class="fail">Your email or password is incorrect!</p>';
                    unset($_SESSION['login_success']);
                }
            ?>

            
        </p>
    </div>
    
</body>
</html>