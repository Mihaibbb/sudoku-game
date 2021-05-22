
import Sudoku from './sudokuInterface.js';
import getBoard from './generateBoard.js';

let sudokuBoard = [];

(async function createBoard() {

    const endGame = document.querySelector('.end-game');
    const gameMode = document.querySelector('.game-mode').innerText.toLowerCase();

    await checkEndGame();

    let newSudokuBoard;

    newSudokuBoard = await getLocalStoredBoard(gameMode);

    sudokuBoard = newSudokuBoard;

    const gameElement = document.querySelector('.game');

    let numberOfSeconds = await getLocalStoredNumberOfSeconds(gameMode);
    let numberOfMinutes = await getLocalStoredNumberOfMinutes(gameMode);
    let numberOfHours = await getLocalStoredNumberOfHours(gameMode);
    let timeTarget = numberOfMinutes >= 5 ? numberOfMinutes + 1 : 5;

    

    // Header items
    const sudokuGameItem = document.querySelector('.sudoku_game_item');
    const tipsAndTricksItem = document.querySelector('.tips_and_tricks_item');
    const loginItem = document.querySelector('.log_in_item');
    const signupItem = document.querySelector('.sign_up_item');
    const logoutItem = document.querySelector('.log_out_item');
    const accountItem = document.querySelector('.account_item');

    // Header 

    const language = document.querySelector('img.language');
    language.addEventListener('click', () => {
        
        if (language.src.toString().includes('ro')) {
            language.src = language.src.toString().replace("ro", "en");
            changeLangToRo();
        } else {
            language.src = language.src.toString().replace("en", "ro");
            changeLangToEn();
        }
        
    });

    
    const board = document.querySelector('table.board');
    const score = document.querySelector('.score');

    if (localStorage.getItem(gameMode + "-score") !== null) {
        score.innerText = JSON.parse(localStorage.getItem(gameMode + "-score"));
    }

    const timer = document.querySelector('.timer.desktop');
    const hintsCount = document.querySelector('.hint-counter');

    if (localStorage.getItem(gameMode + "-hints") !== null) {
        const numberOfHints = JSON.parse(localStorage.getItem(gameMode + "-hints"));
        hintsCount.innerText = numberOfHints;
    }
    
    const gameModeTitle = document.querySelector('.mode_title h1');
    const classicMode = document.querySelector('.modes .mode.classic');
    const competitiveMode = document.querySelector('.modes .mode.competitive');
    const reverseMode = document.querySelector('.modes .mode.reverse');
    const newGame = document.querySelector('.new-game h1');
    const signUpMessage = document.querySelector('.login_request .sign_up_message');
    const loginMessage = document.querySelector('.login_request .log_in_message');
    const errLoginMessage = document.querySelector('.login_request .fail');

    const timeSeconds = timer.querySelector('.seconds');
    const timeMinutes = timer.querySelector('.minutes');
    const timeHours = timer.querySelector('.hours');
    const timerText = timer.querySelector('.timer_text');

    const game = new Sudoku(gameElement, newSudokuBoard, board, score, hintsCount, gameMode);

    // Showing the initial board
    
    
    game.displayBoard();
    
    const solvedBoard = newSudokuBoard;
    console.log(solvedBoard);

    // Click event on cell
    const cells = document.querySelectorAll('.game-cell');
    const dataNumbers = document.querySelectorAll('[data-number]');

    // Compute buttons
    const scoreButton = document.querySelector('.scoreContainer');
    const eraseButton = document.querySelector('.eraseContainer');
    const undoButton = document.querySelector('.undoContainer');
    const hintButton = document.querySelector('.hintContainer');
  

    // Compute titles

    const scoreTitle = scoreButton.querySelector('.command-title');
    const hintTitle = hintButton.querySelector('.command-title');
    const undoTitle = undoButton.querySelector('.command-title');
    const eraseTitle = eraseButton.querySelector('.command-title');

    

    cells.forEach((cell, indexElement) => {

        const indexCellRow = indexElement % 9; // index of target cell in function of row

        cell.addEventListener('click', () => {
            
            game.cellHighlight(cell, indexCellRow);

            // Event for key numbers
            
            document.addEventListener('keydown', e => {
            
                if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && isNaN(parseInt(e.key))) return;
                
                // if (isNaN(parseInt(e.key))) {
                //     const currentHighlightedCell = [...game.allCells].find(cell => {
                //         return cell.classList.contains('chosen_cell');
                //     });
                    
                //     const pos = game.findCellPosition(currentHighlightedCell);
                //     console.log(pos);
                //     const newRowPos = Math.floor(pos / 9);
                //     const newCellPos = pos % 9;
                //     game.cellHighlightArrowKey(e.key, cell, newCellPos, newRowPos);
                // }

                if (parseInt(e.key) > 0 && parseInt(e.key) < 10) {
                    if (endGame.classList.contains('win') || endGame.classList.contains('lose')) return;
                    game.printValue(parseInt(e.key));         
                    if (game.gameRunning) return;
                    
                    if (game.gameResult === 'win') {
                        endGame.classList.add('active');
                        endGame.classList.add('win');
                        game.gameFinal('won');
                        localStorage.setItem(gameMode + "-end-game", JSON.stringify('won'));
                        game.pauseBoard();
                        return;
                    } 

                    endGame.classList.add('active');
                    endGame.classList.add('lose');
                    game.gameFinal('lost');
                    localStorage.setItem(gameMode + "-end-game", JSON.stringify('lost'));
                    game.pauseBoard();
                }
            });

            
            // Event for clicking the numbers grid
            dataNumbers.forEach(dataNumber => {
                dataNumber.addEventListener('click', () => {
                    game.printValue(parseInt(dataNumber.innerText));
                    if (game.gameRunning) return;
                    
                    if (game.gameResult === 'win') {
                        endGame.classList.add('active');
                        endGame.classList.add('win');
                        game.winGame();
                        game.gameFinal('won');
                        localStorage.setItem(gameMode + "-end-game", JSON.stringify('won'));
                        return;
                    } 

                    endGame.classList.add('active');
                    endGame.classList.add('lose');
                    game.gameFinal('lost');
                    localStorage.setItem(gameMode + "-end-game", JSON.stringify('lost'));
                    game.pauseBoard();
                });
            });

            // Erase button event     
            eraseButton.addEventListener('click', () => {
                game.erase();
            });
            

            // Undo button event
            undoButton.addEventListener('click', () => {
                game.undo();
            });

            // Hint Button
            hintButton.addEventListener('click', () => {
                game.hint();
                if (game.gameRunning) return;
                endGame.classList.add('active');
                endGame.classList.add('win');
                game.gameFinal('won');
                localStorage.setItem(gameMode + "-end-game", JSON.stringify('won'));
                game.pauseBoard();
            });
        });
    });

    // Game Modes

    

    // Sign up form

    const signupFormReq = document.querySelector('.sign-up-form');
    const loginFormReq = document.querySelector('.login-form');
    const loginSystem = document.querySelector('.login_system');

    // Blur effect / close form page

    const cardElement = document.querySelector('.card');
    document.addEventListener('click', e => {
        if (game.gameMode === 'competitive') return;
        if (!loginSystem.classList.contains('active')) return;
        const formPageElements = cardElement.querySelectorAll('*');
        let sameElement = false;

        formPageElements.forEach(formPageElement => {
            //if (e.target === forms) return;
            if (e.target !== formPageElement) return;
            sameElement = true;
        });

        if (!sameElement && e.target !== signupFormReq) {
            loginSystem.classList.remove('active');
            timer.classList.remove('paused');
            board.classList.remove('paused');
            game.continueBoard();
            timerPauseButton.innerHTML = '<i class="fas fa-pause-circle"></i>';
        }
    });

    if (signupFormReq !== null) {
        signupFormReq.addEventListener('click', () => {

            loginSystem.classList.add('active');
            timer.classList.add('paused');
            board.classList.add('paused');
            timerPauseButton.innerHTML = "<i class='fas fa-play-circle'></i>";
            game.pauseBoard();
        
        });
    }


    if (game.gameMode !== 'competitive') {
        const closeForm = cardElement.querySelector('i.fas.fa-times');
        closeForm.addEventListener('click', () => {
            if (loginSystem.classList.contains('active')) loginSystem.classList.remove('active');
        });

        // Event listener of sign/login form

        const signUpButton = document.querySelector('.sign-option-button.sign');
        const loginButton = document.querySelector('.sign-option-button.login');
        const forms = document.querySelector('.forms');

        signUpButton.addEventListener('click', () => {
            signUpButton.classList.add('active-form');
            loginButton.classList.remove('active-form');
            forms.classList.remove('reverse-content');
        });

        loginButton.addEventListener('click', () => {
            signUpButton.classList.remove('active-form');
            loginButton.classList.add('active-form');
            forms.classList.add('reverse-content');
        });

    }

    // Click event for pause/play button
    const boardPlayButton = timer.querySelector('.play-button');
    const timerPauseButton = timer.querySelector('.pause-time');
    // if (gameMode === 'Competitive') {
    //     timerPauseButton.classList.add('hide');
    //     boardPlayButton.classList.add('hide');
    // }
    timerPauseButton.addEventListener('click', () => {
        
        timer.classList.toggle('paused');
        board.classList.toggle('paused');

        if (timer.classList.contains('paused')) {
            timerPauseButton.innerHTML = "<i class='fas fa-play-circle'></i>";
            game.pauseBoard();
        
            
            const middleCell = [...cells].find((cell, idx) => {
                return cell.classList.contains('middleCell');
            });
        
            middleCell.addEventListener('click', () => {
                
                timer.classList.remove('paused');
                board.classList.remove('paused');
                timerPauseButton.innerHTML = "<i class='fas fa-pause-circle'></i>";
                game.continueBoard();
            });

        } else {
            game.continueBoard();
            timerPauseButton.innerHTML = '<i class="fas fa-pause-circle"></i>';
            
        }
    });


    // Timer count

    if (localStorage.getItem(gameMode + "-time-seconds") !== null) {
        console.log(JSON.parse(localStorage.getItem(gameMode + "-time-seconds")))
    }

    const counter = () => {

        if (screen.width > 1920) {
            const scaleX = screen.width / 1920;
            gameElement.style.transform = 'scale(' + scaleX + ')';
        } else {
            gameElement.style.transform = 'scale(1)';
        }

        if (timer.classList.contains('paused')) return;

        if (numberOfMinutes > 59) {
            numberOfHours++;
            numberOfMinutes = 0;
            numberOfSeconds = 0;
            timeHours.innerText = numberOfHours + (timeHours.innerText.includes(':') ? 0 : ":");
        }

        localStorage.setItem(gameMode + "-time-hours", JSON.stringify(numberOfHours));

        if (numberOfSeconds > 59) {
            numberOfMinutes++;
            numberOfSeconds = 0;
            timeSeconds.innerText = "0" + numberOfSeconds;
            
        }  
        else if (numberOfSeconds < 10) {
            timeSeconds.innerText = "0" + numberOfSeconds;
            
        }
        else {
            timeSeconds.innerText = numberOfSeconds;
        }

        localStorage.setItem(gameMode + "-time-seconds", JSON.stringify(numberOfSeconds));
            
        if (numberOfMinutes >= 45) {

            timer.classList.add('finalWave');
            timerPauseButton.classList.add('finalWave');
            timeMinutes.innerText = numberOfMinutes;

        } else if (numberOfMinutes < 10) {

            timeMinutes.innerText = "0" + numberOfMinutes;

        } else if (numberOfMinutes >= 20) {

            timer.classList.add('secondWave');
            timerPauseButton.classList.add('secondWave');
            timeMinutes.innerText = numberOfMinutes;

        } else {
            timeMinutes.innerText = numberOfMinutes;
        }

        localStorage.setItem(gameMode + "-time-minutes", JSON.stringify(numberOfMinutes));
        
            // Checking for lowering the score
        if (numberOfMinutes === timeTarget) {
            game.score.innerText = parseInt(game.score.innerText) - 1;
            localStorage.setItem(gameMode + "-score", JSON.stringify(game.score.innerText));
            if (game.checkGameOver()) {
                game.gameRunning = false;
                endGame.classList.add('active');
                endGame.classList.add('lose');
                game.gameResult = 'lose';
                game.gameFinal('lost');
                localStorage.setItem(gameMode + "-end-game", JSON.stringify('lost'));
                game.pauseBoard();
            }

            timeTarget++;
        }

        numberOfSeconds++;
        
    }

    // Interval for timer going
    counter();
    let timerInterval = setInterval(counter, 1000);

    // The blur effect of the board
    document.addEventListener('click', e => {
        let highlighted = false;

        cells.forEach(cell => cell.classList.contains('chosen_cell') ? highlighted = true : null);
        if (!highlighted) return; 
        let checkTargetOfBoard = 0; // Checking if the target of event is a child of the board
        const allChildrenBoard = board.querySelectorAll('*');
        const gameOverlay = gameElement.querySelector('.game-overlay');
        const allChildrenGameOverlay = gameOverlay.querySelectorAll('*');

        allChildrenBoard.forEach(childBoard => {
            if (e.target === childBoard) checkTargetOfBoard++;
        });

        allChildrenGameOverlay.forEach(childGameOverlay => {
            if (e.target === childGameOverlay) checkTargetOfBoard++;
        });

        if (checkTargetOfBoard === 0) {

            cells.forEach(cell => {
                cell.classList.remove('chosen_cell');
                cell.classList.remove('chosen_row_column_square');
            });
        }
    });

    // New game button

    const newGameButton = document.querySelector(".new-game.desktop");
    console.log(newGameButton)
    const newGameSelector = document.querySelector(".new-game-selector");
    newGameButton.addEventListener('click', () => {
        newGameSelector.classList.toggle('show_selector');
        console.log(newGameSelector);
    });

    // New game submit

    const newGameSubmit = document.querySelector('.new-game-submit');
    newGameSubmit.addEventListener('click', () => {
        localStorage.clear();
        
        window.location.href = "./";
    });

    // Restart game submit

    const restartGameSubmit = document.querySelector(".restart-game-submit");
    restartGameSubmit.addEventListener('click', () => {
        resetLocalStorage();    
    });

    const restartGameButton = document.querySelector(".restart button");
    restartGameButton.addEventListener('click', () => {
        resetLocalStorage();
    });

    // new game difficulty

    const difficulties = document.querySelectorAll(".mode_selector div");

    difficulties.forEach(difficulty => {
        difficulty.addEventListener("click", () => {
            const type = difficulty.innerText.toLowerCase();
            localStorage.setItem(gameMode + "-difficulty", JSON.stringify(type));
            
            newLocalStorage();
          
        });
        
    });

    // Login / signup messages disappear

    const successMessages = document.querySelector('.success');

    if (successMessages.innerText !== '') {
        setTimeout(() => {
            successMessages.classList.add('hide');
        }, 5000);
    }

    // const successSignupMessage = document.querySelector('.create-account-message');
    // const successLoginMessage = document.querySelector('.login-message');
    // if (successSignupMessage !== null) {
    //     signupFormReq.classList.add('hide');   
    // }

    // if (successLoginMessage !== null) {
    //     loginFormReq.classList.add('hide');
    // }

    const changeLangToEn = () => {

        sudokuGameItem.innerText = 'Sudoku Game';
        tipsAndTricksItem.innerText = 'Sudoku Tips & Tricks';
        if (loginItem !== null) {
            loginItem.innerText = 'Log In';
        }

        if (signupItem !== null) {
            signupItem.innerText = 'Sign Up';
        }

        if (logoutItem !== null) {
            logoutItem.innerText = 'Log out';
        }

        if (accountItem !== null) {
            accountItem.innerText = 'Account';
        }
        
        gameModeTitle.innerText = 'Game Modes';
        classicMode.innerText = 'Classic Mode';
        competitiveMode.innerText = 'Competitive Mode';
        reverseMode.innerText = 'Reverse Mode';
        timerText.innerText = 'Timer:';
        newGame.innerText = 'New Game';
        scoreTitle.innerText = 'Score';
        hintTitle.innerText = 'Hint';
        undoTitle.innerText = 'Undo';
        eraseTitle.innerText = 'Erase';  
    }

    const changeLangToRo = () => {

        sudokuGameItem.innerText = 'Jocul Sudoku';
        tipsAndTricksItem.innerText = 'Sfaturi și trucuri Sudoku';
        if (loginItem !== null) {
            loginItem.innerText = 'Logheaza-te';
        }

        if (signupItem !== null) {
            signupItem.innerText = 'Inscrie-te';
        }

        if (logoutItem !== null) {
            logoutItem.innerText = 'Delogheaza-te';
        }

        if (accountItem !== null) {
            accountItem.innerText = 'Contul Meu';
        }
        
        gameModeTitle.innerText = 'Moduri de joc';
        classicMode.innerText = 'Modul Clasic';
        competitiveMode.innerText = 'Modul Competitiv';
        reverseMode.innerText = 'Modul Invers';
        timerText.innerText = 'Timp:';
        newGame.innerText = 'Joc Nou';
        scoreTitle.innerText = 'Scor';
        hintTitle.innerText = 'Indiciu';
        undoTitle.innerText = 'Înapoi';
        eraseTitle.innerText = 'Ștergere';
    }

    async function checkEndGame() {

        if (localStorage.getItem(gameMode + "-end-game") === null) return;
        let result = JSON.parse(localStorage.getItem(gameMode + "-end-game"));
        console.log(result);
        endGame.classList.add("active");
        
        if (result === "lost") result = "lose";
        else if (result === "won") result = "win";
        endGame.classList.add(result); 
        
    }

    async function getLocalStoredBoard(mode) {
        let newSudokuBoard;

        if (localStorage.getItem(mode + "-init-board") !== null) {
            newSudokuBoard = JSON.parse(localStorage.getItem(mode + "-init-board"));
        }
        
        if (localStorage.getItem(mode + "-board") !== null) {  
            newSudokuBoard = JSON.parse(localStorage.getItem(mode + "-board"));
        } 

        if (newSudokuBoard === undefined) {

            if (localStorage.getItem(mode + "-difficulty") !== null) {
                const type = JSON.parse(localStorage.getItem(mode + "-difficulty"));
                console.log(type);
                newSudokuBoard = await getBoard(type.toString());
            } else {
                newSudokuBoard = await getBoard("easy");
            }
           
        }

        return newSudokuBoard;
    }

    async function getLocalStoredNumberOfSeconds(mode) {
        if (localStorage.getItem(mode + "-time-seconds") === null) return 0;
            
        return JSON.parse(localStorage.getItem(mode + "-time-seconds"));
    }

    async function getLocalStoredNumberOfMinutes(mode) {
        if (localStorage.getItem(mode + "-time-minutes") === null) return 0;
        return JSON.parse(localStorage.getItem(mode + "-time-minutes"));
    }
    
    async function getLocalStoredNumberOfHours(mode) {
        if (localStorage.getItem(mode + "-time-hours") === null) return 0;
        return JSON.parse(localStorage.getItem(mode + "-time-hours"));
    }

    function resetLocalStorage() {
       
       
        localStorage.removeItem(gameMode + "-board");
        localStorage.removeItem(gameMode + "-time-seconds");
        localStorage.removeItem(gameMode + "-time-minutes");
        localStorage.removeItem(gameMode + "-time-hours");
        const initBoard = JSON.parse(localStorage.getItem(gameMode + "-init-board"));
        localStorage.setItem(gameMode + "-board", JSON.stringify(initBoard));
        localStorage.removeItem(gameMode + "-score");
        localStorage.removeItem(gameMode + "-end-game");
        localStorage.removeItem(gameMode + "-hints");

        if (localStorage.getItem(gameMode + "-hint-coords-1") !== null) {
            localStorage.removeItem(gameMode + "-hint-coords-1");
        }

        if (localStorage.getItem(gameMode + "-hint-coords-2") !== null) {
            localStorage.removeItem(gameMode + "-hint-coords-2");
        }

        if (localStorage.getItem(gameMode + "-hint-coords-3") !== null) {
            localStorage.removeItem(gameMode + "-hint-coords-3");
        }


        window.location.href = "./"; 
    }

    function newLocalStorage() {
        
        localStorage.removeItem(gameMode + "-init-board");
        localStorage.removeItem(gameMode + "-board");
        localStorage.removeItem(gameMode + "-time-seconds");
        localStorage.removeItem(gameMode + "-time-minutes");
        localStorage.removeItem(gameMode + "-time-hours");  
        localStorage.removeItem(gameMode + "-score");
        localStorage.removeItem(gameMode + "-end-game");
        localStorage.removeItem(gameMode + "-hints");

        if (localStorage.getItem(gameMode + "-hint-coords-1") !== null) {
            localStorage.removeItem(gameMode + "-hint-coords-1");
        }

        if (localStorage.getItem(gameMode + "-hint-coords-2") !== null) {
            localStorage.removeItem(gameMode + "-hint-coords-2");
        }

        if (localStorage.getItem(gameMode + "-hint-coords-3") !== null) {
            localStorage.removeItem(gameMode + "-hint-coords-3");
        }

        window.location.href = "./"; 
    }
    
})();


