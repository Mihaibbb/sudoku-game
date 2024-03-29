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
    <link rel="stylesheet" href="styles/form.css" defer>
    <link rel="stylesheet" href="styles/gameModes.css" defer>
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
                <div class="end-game login active competitive">
                    <div class="game-result-card competitive">
                        <p class="login_required_message">You need to be logged in to access this page!</p>
                        <a href="login_form/forms/signup"><button type="button" class="page_buttons">Create an account here!</button></a>
                        <a href="login_form/forms/login"><button type="button" class="page_buttons">Log in here!</button></a>
                    </div>
                </div>
            ';
              
            die();
        }
    ?>

    <div class="game-mode">Competitive</div>

    <div class="end-game"> 
        <div class="game-result-card">
            <h2 class="result"></h2>
            <p class="final-score"></p>
            <p class="final-time"></p>
            
            <form action="./update_score/includes/update_score.inc.php" method="post" class="check_score">
                <input type="hidden" name="score" class="score_submit">
                <input type="hidden" name="time" class="time_submit">
                <input type="hidden" name="difficulty" class="difficulty_submit">
                <input type="hidden" name="mistakes" class="mistakes_counter">
                <button class="new-game-btn">New game</button>
            </form>
            
            
            
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
            
            <div class="game_modes competitive">
                <div class="mode_title">
                    <h1>Game Modes</h1>
                </div>
                <div class="modes">
                    <a href="../Sudoku"><div class="mode">Classic Mode</div></a>
                    <div class="mode active">Competitive Mode</div>
                    <a href="reverse"><div class="mode">Reverse Mode</div></a>
                </div>
                
            </div> 

            <div class="board_corners">
                    
                    <div class="timer mobile">
                        <h2><span class="timer_text"></span> <span class="time"><span class="hours"></span><span class="minutes">00</span>:<span class="seconds">00</span></span></h2>
                        
                    </div>

                    <div class="new-game mobile">
                        <h1>New Game</h1>
                        
                    </div>

                    <div class="new-game-selector mobile">
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

                    
                </div>

            <div class="difficulties">
                    <h1 class="easy">Easy</h1>
                
                </div>

            <table class="board">

            </table>

            <div class="game-overlay">
                
                <div class="timer desktop">
                    <h2><span class="timer_text">Timer:</span><span class="time"><span class="hours"></span><span class="minutes">00</span>:<span class="seconds">00</span></span></h2>
                    <div class="pause-time"></div>
                </div>
                
                <div class="new-game desktop">
                    <h1>New Game</h1>
                </div>

                <div class="new-game-selector desktop">
                    <h1>Select difficulty</h1>

                    <div class="mode_selector">
                        <div class="easy">Easy</div>
                        <div class="medium">Medium</div>
                        <div class="hard">Hard</div>
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

                    <div class="command scoreContainer competitive">
                        <div class="player_score">
                            <i class="fas fa-bolt"></i><span class="score">100</span>
                        </div>
                        <div class="command-title">Score</div>
                    </div>

                    <div class="command hintContainer not-clickable hide">
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

        
    </div>

    
</body>
</html>