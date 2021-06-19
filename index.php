<?php 
   session_start();
   
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <link rel="stylesheet" href="styles/style.css" defer>
    <link rel="stylesheet" href="styles/form.css">
    

    <script src="scripts/script.js" type="module"></script>
    <script src="./login_form/scripts/form-validation.js" defer></script>
    <script src="./login_form/scripts/form-validation-login.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.3.2/chart.min.js"></script>
    
    <?php 
        require_once 'sections/fonts.php';
    ?>
    
    <title>Sudoku - Classic Mode</title>
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

    <div class="game-mode">Classic</div>

    <div class="end-game"> 
        <div class="game-result-card">
            <h2 class="result">You've</h2>
            <p class="final-score">Score: <i class="fas fa-bolt"></i></p>
            <p class="final-time">Time: <i class="fas fa-clock"></i></p>
            
            <button type="button" class="new-game-submit">New game</button>
            <button type="button" class="restart-game-submit">Restart <i class="fas fa-redo"></i></button> 
        </div>
        
    </div>
    
    <div class="game">
    
        <div class='success'>
            <?php 
                if (isset($_SESSION['create_account_message']) && $_SESSION['create_account_message']) {
                    echo "<span class='create-account-message'>Your account was successfully created</span>";
                    $_SESSION['create_account_message'] = false;
                }

                if (isset($_SESSION['login_success_message']) && $_SESSION['login_success_message'] && isset($_SESSION['username'])) {
                    echo "<span class='login-message'>Welcome, " . $_SESSION['username'] . "</span>";
                    $_SESSION['login_success_message'] = false;
                }
            ?>
        </div>

        

        

        

        <div class="game-grid">
            
            <div class="game_modes">
                <div class="mode_title">
                    <h1>Game Modes</h1>
                </div>
                <div class="modes">
                    <div class="mode active classic">Classic Mode</div>
                    <a href="competitive"><div class="mode competitive">Competitive Mode</div></a>
                    <a href="reverse"><div class="mode reverse">Reverse Mode</div></a>
                </div>

                <div class="timer mobile">
                    <h2><span class="timer_text">Timer:</span> <span class="time"><span class="hours"></span><span class="minutes">00</span>:<span class="seconds">00</span></span></h2>
                    <div class="pause-time"><i class="fas fa-pause-circle"></i></div>
                </div>

                <div class="new-game mobile">
                    <h1>New Game</h1>
                </div>
                
                <div class="modes">
                    <div class="difficulty active">Easy</div>
                    <div class="difficulty">Medium</div>
                    <div class="difficulty">Hard</div>
                </div>
                
            </div> 

           
                <div class="difficulties">
                    <h1 class="easy">Easy</h1>
                
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

                <div class="new-game-selector">
                    <h1>Select difficulty</h1>

                    <div class="mode_selector">
                        <div class="easy">Easy</div>
                        <div class="medium">Medium</div>
                        <div class="hard">Hard</div>
                    </div>

                    <div class="restart">
                        <button type="button"><i class="fas fa-redo"></i> Restart </button>
                    </div>
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

                <div class="game-control">

                    <div class="command scoreContainer">
                        <div class="player_score">
                            <i class="fas fa-bolt"></i><span class="score">100</span>
                        </div>
                        <div class="command-title">Score</div>
                    </div>

                    <div class="command hintContainer">
                        <div class="hint">
                            <i class="far fa-lightbulb"></i>
                            <div class="hint-counter">3</div>
                        </div>
                        <div class="command-title">Hint</div>
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
                    echo 'Don\'t have an account? Sign Up <span class="sign-up-form">here</span>';
                    die();    
                }

                if (!isset($_SESSION['login_success']) || !$_SESSION['login_success']) {
                    echo 'Log in <span class="sign-up-form">here</span>';    
                    
                }

                if (isset($_SESSION['login_success']) && !$_SESSION['login_success']) {
                    echo '<p class="fail">Your email or password is incorrect</p>';
                    unset($_SESSION['login_success']);
                }
                
            ?>

            
        </p>
    </div>
    
</body>
</html>