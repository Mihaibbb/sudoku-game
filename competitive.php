<?php 
    session_start();
?>
<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sudoku - Competitive Mode</title>
    <link rel="stylesheet" href="styles/style.css" defer>
    <link rel="stylesheet" href="styles/form.css">
    <?php 
        if (isset($_SESSION['login_success']) && $_SESSION['login_success']) {
            echo '<script src="scripts/script.js" type="module" defer></script>';
        }
    ?>
    

    <?php require_once 'sections/fonts.php'; ?>
</head>
<body>

    <?php 
        require_once 'sections/header.php';
    ?>

    <?php 
        if (!isset($_SESSION['login_required']) || !$_SESSION['login_required']) {
            echo '
                <p class="login_required_message">You need to be logged in to acces this page</p>
            ';
            

            die();
        }
    ?>


    <div class="game-mode">Competitive</div>

    <div class="end-game">
        <div class="game-result-card">
            <h2 class="result">You've</h2>
            <p class="final-score">Score: <i class="fas fa-bolt"></i></p>
            <p class="final-time">Time: <i class="fas fa-clock"></i></p>
            
            <button type="submit">New game</button>
            
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
            
            <div class="game_modes">
                <div class="mode_title">
                    <h1>Game Modes</h1>
                </div>
                <div class="modes">
                    <a href="../Sudoku"><div class="mode">Classic Mode</div></a>
                    <a href="competitive.php"><div class="mode active">Competitive Mode</div></a>
                    <div class="mode">Reverse Mode</div>
                </div>
                
            </div> 

            <table class="board">

            </table>

            
            <div class="game-overlay">
                
                <div class="timer desktop">
                    <h2>Timer: <span class="time"><span class="hours"></span><span class="minutes">00</span>:<span class="seconds">00</span></span></h2>
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

                <div class="game-control">

                    <div class="command">
                        <div class="player_score">
                            <i class="fas fa-bolt"></i><span class="score">100</span>
                        </div>
                        <div class="command-title">Score</div>
                    </div>

                    <div class="command hintContainer not-clickable">
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
                if (!isset($_SESSION['signup_success'])) {
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