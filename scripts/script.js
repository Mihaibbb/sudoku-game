
import Sudoku from './sudokuInterface.js';
import getBoard from './generateBoard.js';

let sudokuBoard = [];

(async function createBoard() {

    const endGame = document.querySelector('.end-game');
    const gameMode = document.querySelector('.game-mode').innerText.toLowerCase();
  
    const table = document.querySelector(".board");
    const difficulty = document.querySelector(".difficulties h1");
    const mistakesCounter = localStorage.getItem(gameMode + "-mistakes") !== null ? JSON.parse(localStorage.getItem(gameMode + "-mistakes")) : 0;

    if (localStorage.getItem(gameMode + "-difficulty") !== null) {
        difficulty.innerText = JSON.parse(localStorage.getItem(gameMode + "-difficulty"));
        difficulty.classList.remove("easy");
        difficulty.classList.remove("medium");
        difficulty.classList.remove("hard");
        difficulty.classList.add(difficulty.innerText.toLowerCase());
        if (difficulty.classList.contains("medium") && window.innerWidth > 1250) {
            table.style.marginLeft = "-50px";
        }
    }

    const checkLogin = () => {
        const xmlReq = new XMLHttpRequest();

        xmlReq.open('GET', './login_storage.inc.php');
         //Send the proper header information along with the request
        

        xmlReq.onreadystatechange = function() {//Call a function when the state changes.
            if(xmlReq.readyState == 4 && xmlReq.status == 200) {
                if (xmlReq.responseText === true) {
                    localStorage.clear();
                    location.reload();
                }
                
            }
        }
 
        xmlReq.send("message=true");

        
    };

    checkLogin();

    // Score local storage
   
    let defaultScore;
    let difficultyTextContent = difficulty.innerText.toLowerCase();

    const board = document.querySelector('.board');
    const score = document.querySelector('.score');
        
    if (difficultyTextContent === "medium") score.innerText = '125';
    if (difficultyTextContent === "hard") score.innerText = '150';

    if (difficultyTextContent === "easy") defaultScore = "100";
    else if (difficultyTextContent === "medium") defaultScore = "125";
    else if (difficultyTextContent === "hard") defaultScore = "150";

    if (localStorage.getItem(gameMode + "-score") === null) localStorage.setItem(gameMode + "-score", JSON.stringify(defaultScore));

    if (localStorage.getItem(gameMode + "-score") !== null) {
        console.log(score.innerText);
        score.innerText = JSON.parse(localStorage.getItem(gameMode + "-score"));
    }

    let newSudokuBoard;

    newSudokuBoard = await getLocalStoredBoard(gameMode);

    sudokuBoard = newSudokuBoard;

    const gameElement = document.querySelector('.game');

    let numberOfSeconds = await getLocalStoredNumberOfSeconds(gameMode);
    let numberOfMinutes = await getLocalStoredNumberOfMinutes(gameMode);
    let numberOfHours = await getLocalStoredNumberOfHours(gameMode);


    let timeTarget = numberOfMinutes >= 5 ? numberOfMinutes + 1 : 5;

    if (screen.width > 1920) {
        const scaleX = screen.width / 1920;
        gameElement.style.transform = `scale(${scaleX})`;
    } else {
        gameElement.style.transform = `scale(1.00001)`;
    }

    // Header items
    const sudokuGameItem = document.querySelector('.sudoku_game_item a');
    const tipsAndTricksItem = document.querySelector('.tips_and_tricks_item a');
    const loginItem = document.querySelector('.log_in_item a');
    const signupItem = document.querySelector('.sign_up_item a');
    const logoutItem = document.querySelector('.log_out_item a');
    const accountItem = document.querySelector('.account_item a');
    const leaderboardItem = document.querySelector('.leaderboard_item a');

    // Header 

    // Change language

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

    const timer = document.querySelector('.timer.desktop');
    const timerMobile = document.querySelector('.timer.mobile');
    console.log(timerMobile);
    const hintsCount = document.querySelector('.hint-counter');

    if (localStorage.getItem(gameMode + "-hints") !== null) {
        const numberOfHints = JSON.parse(localStorage.getItem(gameMode + "-hints"));
        hintsCount.innerText = numberOfHints;
    }
    
    const gameModeTitle = document.querySelector('.mode_title h1');
    const gameModes = document.querySelectorAll(".modes .mode");
    const classicMode = document.querySelector('.modes .mode.classic');
    const competitiveMode = document.querySelector('.modes .mode.competitive');
    const reverseMode = document.querySelector('.modes .mode.reverse');
    const newGame = document.querySelector('.new-game.desktop h1');
    const signUpMessage = document.querySelector('.login_request .sign_up_message');
    const loginMessage = document.querySelector('.login_request .log_in_message');
    const errLoginMessage = document.querySelector('.login_request .fail');

    // Desktop time elements

    const timeSeconds = timer.querySelector('.seconds');
    const timeMinutes = timer.querySelector('.minutes');
    const timeHours = timer.querySelector('.hours');
    const timerText = timer.querySelector('.timer_text');
    const timeContent = timer.querySelector(".timer h2 span.time");

    // Mobile time elements

    const timeSecondsMobile = timerMobile.querySelector('.seconds');
    const timeMinutesMobile = timerMobile.querySelector('.minutes');
    const timeHoursMobile = timerMobile.querySelector('.hours');
    const timerTextMobile = timerMobile.querySelector('.timer_text');
    const timeContentMobile = timerMobile.querySelector(".timer h2 span.time");

    const game = new Sudoku(gameElement, newSudokuBoard, board, score, hintsCount, gameMode, difficulty.innerText, mistakesCounter);

    // Showing the initial board
    
    
    game.displayBoard();
    
    const solvedBoard = newSudokuBoard;
    console.log(solvedBoard);

    // Click event on cell
    const cells = document.querySelectorAll('.game-cell');
    const dataNumbers = document.querySelectorAll('[data-number]');
    const rows = document.querySelectorAll('.game-row');

    // Compute buttons
    const allCommands = document.querySelectorAll('.command');
    const scoreButton = document.querySelector('.scoreContainer');
    const eraseButton = document.querySelector('.eraseContainer');
    const undoButton = document.querySelector('.undoContainer');
    const hintButton = document.querySelector('.hintContainer');
  

    // Compute titles
    const commandTitles = document.querySelectorAll(".command-title");

    const scoreTitle = scoreButton.querySelector('.command-title');
    const hintTitle = hintButton.querySelector('.command-title');
    const undoTitle = undoButton.querySelector('.command-title');
    const eraseTitle = eraseButton.querySelector('.command-title');

    const numbersGrid = document.querySelector('.numbers-grid');
    const numbers = document.querySelectorAll('.number');
    const numbersTextContent = document.querySelectorAll('.number span');

    const gameControl = document.querySelector('.game-control');
    const boardPlayButton = document.querySelector('.play-button');

    const commandIcons = document.querySelectorAll('.command i');
    const scoreTextContent = document.querySelector('.command span.score');

    let currWidth = window.innerWidth 
        || document.documentElement.clientWidth 
        || document.body.clientWidth;

    if (window.innerWidth <= 700) {
        
        

        currWidth = currWidth - ((10 * currWidth) / 100);

        if (currWidth <= 700) {

            numbersGrid.style.width = `${currWidth}px`;
            numbers.forEach(number => {
                number.style.width = `${currWidth / 9}px`;
                number.style.height = `${currWidth / 9}px`;
            });


            table.style.height = `${currWidth}px`;
            table.style.width = `${currWidth}px`;

            
            cells.forEach(cell => {
                cell.style.width = `${currWidth / 9}px`;
                cell.style.height = `${currWidth / 9}px`;

            });

            gameControl.style.width = `${currWidth}px`;
            allCommands.forEach(command => {
                command.style.width = `${currWidth / 4}px`;
            
            }); 

            if (currWidth <= 500) {

                numbersTextContent.forEach(numberTextContent => {
                    numberTextContent.style.fontSize = `${currWidth / 12}px`;
                });

                commandTitles.forEach(commandTitle => {
                    commandTitle.style.fontSize = `${currWidth / 18}px`;
                });

                commandIcons.forEach(commandIcon => {
                    commandIcon.style.fontSize = `${currWidth / 18}px`;
                });

                scoreTextContent.style.width = `${currWidth / 18}px`;

                hintsCount.style.width =  `${currWidth / 18}px`;
            }
        }
    }
    
    // Responsive resize event listener
    window.addEventListener('resize', () => {

        if (window.innerWidth > 700) return;

        currWidth = window.innerWidth 
        || document.documentElement.clientWidth 
        || document.body.clientWidth;
        
        currWidth = currWidth - ((10 * currWidth) / 100);

        if (currWidth > 700) return;

        numbersGrid.style.width = `${currWidth}px`;
        numbers.forEach(number => {
            number.style.width = `${currWidth / 9}px`;
            number.style.height = `${currWidth / 9}px`;
        });


        table.style.height = `${currWidth}px`;
        table.style.width = `${currWidth}px`;

        
        cells.forEach(cell => {
            cell.style.width = `${currWidth / 9}px`;
            cell.style.height = `${currWidth / 9}px`;

        });

        gameControl.style.width = `${currWidth}px`;
        allCommands.forEach(command => {
            command.style.width = `${currWidth / 4}px`;
           
        }); 

        if (currWidth > 500) return;

        numbersTextContent.forEach(numberTextContent => {
            numberTextContent.style.fontSize = `${currWidth / 12}px`;
        });

        commandTitles.forEach(commandTitle => {
            commandTitle.style.fontSize = `${currWidth / 18}px`;
        });

        commandIcons.forEach(commandIcon => {
            commandIcon.style.fontSize = `${currWidth / 18}px`;
        });

        scoreTextContent.style.width = `${currWidth / 18}px`;

        hintsCount.style.width =  `${currWidth / 18}px`;
       
    });


    cells.forEach((cell, indexElement) => {

        const indexCellRow = indexElement % 9; // index of target cell in function of row
        const rowCoord = Math.floor(indexElement / 9);

        cell.addEventListener('click', () => {
            
            game.cellHighlight(cell, indexElement);

            // Event for key numbers
            
            document.addEventListener('keydown', e => {

                if (e.key === "Backspace") {
                    game.erase();
                    return;
                }

                if (parseInt(e.key) > 0 && parseInt(e.key) < 10) {
                    if (endGame.classList.contains('win') || endGame.classList.contains('lose')) return;
                    game.printValue(parseInt(e.key));         
                    if (game.gameRunning) return;
                    
                    if (game.gameResult === 'win') {
                        endGame.classList.add('active');
                        endGame.classList.add('win');
                        game.gameFinal('won');
                        localStorage.setItem(gameMode + "-end-game", JSON.stringify('won'));
                        timer.classList.add("paused");
                        return;
                    } 

                    endGame.classList.add('active');
                    endGame.classList.add('lose');
                    game.gameFinal('lost');
                    localStorage.setItem(gameMode + "-end-game", JSON.stringify('lost'));
                    timer.classList.add("paused");
                }

                // Event for key movements

                if (e.key.includes('Arrow')) {
                    const direction = e.key.slice(5, e.key.length).toLowerCase(); 
                    
                    game.moveCellHighlight(direction);

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
                    timer.classList.add("paused");
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
                timer.classList.add("paused");
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
    
    const timerPauseButton = timer.querySelector('.pause-time');

    
    const timerPauseButtonMobile = timerMobile.querySelector('.pause-time');
    
    
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

    if (timerPauseButtonMobile !== null) {
        timerPauseButtonMobile.addEventListener('click', () => {
        
            timerMobile.classList.toggle('paused');
            board.classList.toggle('paused');
    
            if (timerMobile.classList.contains('paused')) {
                timerPauseButtonMobile.innerHTML = "<i class='fas fa-play-circle'></i>";
                game.pauseBoard();
                
                const middleCell = [...cells].find((cell, idx) => {
                    return cell.classList.contains('middleCell');
                });
            
                middleCell.addEventListener('click', () => {
                    
                    timerMobile.classList.remove('paused');
                    board.classList.remove('paused');
                    timerPauseButtonMobile.innerHTML = "<i class='fas fa-pause-circle'></i>";
                    game.continueBoard();
                });
    
            } else {
                game.continueBoard();
                timerPauseButtonMobile.innerHTML = '<i class="fas fa-pause-circle"></i>';
                
            }
        });
    }

    


    // Timer count

    if (localStorage.getItem(gameMode + "-time-seconds") !== null) {
        console.log(JSON.parse(localStorage.getItem(gameMode + "-time-seconds")))
    }

    const updateDBTimer = (delay) => {
        const xmlReq = new XMLHttpRequest();

        xmlReq.open('POST', './update_time/update_time.inc.php');
         //Send the proper header information along with the request
        xmlReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xmlReq.onreadystatechange = function() {//Call a function when the state changes.
            if(xmlReq.readyState == 4 && xmlReq.status == 200) {
                console.log(xmlReq.responseText);
            }
        }
 
        xmlReq.send(`time=${delay}`);
       
    };

    
 

    const counter = () => {

        if (timer.classList.contains('paused') || timerMobile.classList.contains('paused')) return;


        if (numberOfMinutes > 59) {
            numberOfHours++;
            numberOfMinutes = 0;
            numberOfSeconds = 0;
            timeHours.innerText = numberOfHours + (timeHours.innerText.includes(':') ? 0 : ":");
            
        } 

        if (numberOfHours > 0) {
            timeHours.innerText = `0${numberOfHours}:`;
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
            
        if (numberOfMinutes >= 45 || numberOfHours > 0) {

            timer.classList.add('finalWave');
            timerMobile.classList.add('finalWave');
            timerPauseButton.classList.add('finalWave');
            timerPauseButtonMobile.classList.add('finalWave');
            timeMinutes.innerText = numberOfMinutes;

        } else if (numberOfMinutes >= 20 || numberOfHours > 0) {

            timer.classList.add('secondWave');
            timerMobile.classList.add('secondWave');
            timerPauseButton.classList.add('secondWave');
            if (timerPauseButtonMobile !== null) {
                timerPauseButtonMobile.classList.add('secondWave');
            }
            
            timeMinutes.innerText = numberOfMinutes;

        } else {
            timeMinutes.innerText = numberOfMinutes;
        }
        
        if (numberOfMinutes < 10) {

            timeMinutes.innerText = "0" + numberOfMinutes;
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
                timer.classList.add("paused");
                timerMobile.classList.add("paused");
            }

            timeTarget++;
        }

        numberOfSeconds++;

        timeSecondsMobile.innerText = timeSeconds.innerText;
        timeMinutesMobile.innerText = timeMinutes.innerText;    
        timeHoursMobile.innerText = timeHours.innerText;
        
        const time = numberOfHours * 3600 + numberOfMinutes * 60 + numberOfSeconds;
        const DELAY = 1;
                
        if (gameMode === 'competitive') updateDBTimer(DELAY);
        
    };

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
    
    const newGameSelector = document.querySelector(".new-game-selector.desktop");

    const newGameButtonMobile = document.querySelector(".new-game.mobile");
    
    const newGameSelectorMobile = document.querySelector(".new-game-selector.mobile");

    newGameButton.addEventListener('click', () => {
        newGameSelector.classList.toggle('show_selector');
    });

    newGameButtonMobile.addEventListener('click', () => {
        newGameSelectorMobile.classList.toggle('show_selector');
        if(newGameSelectorMobile.classList.contains('show_selector')) {
            table.style.visibility = 'hidden';
        } else {
            table.style.visibility = 'visible';
        }
    }); 

    document.addEventListener('click', e => {
        
        if (e.target === newGameButton && newGameSelector.classList.contains("show_selector")) return;
        console.log('over')
        
        const newGameSelectorNodes = newGameSelector.querySelectorAll("*");
        let childNodeTarget = false;
        newGameSelectorNodes.forEach(node => {
            if (node === e.target) childNodeTarget = true;
        });
        const newGameButtonTextContent = newGameButton.querySelector("h1");
        if (e.target === newGameButton || e.target === newGameButtonTextContent) childNodeTarget = true;

        if (!childNodeTarget) newGameSelector.classList.remove('show_selector');
    });

    

    // New game submit

    const newGameSubmit = document.querySelector('.new-game-submit');
    if (newGameSubmit !== null) {
        newGameSubmit.addEventListener('click', () => {
            localStorage.clear();
            
            window.location.href = "./";
        });
    }

    const newGameSubmitCompetitive = document.querySelector(".check_score .new-game-btn");
   
    if (newGameSubmitCompetitive !== null) {
        newGameSubmitCompetitive.addEventListener("click", () => {
            newLocalStorage();
        });
        
    }
   
    // Restart game submit

    const restartGameSubmit = document.querySelector(".restart-game-submit");
    if (restartGameSubmit !== null) {
        restartGameSubmit.addEventListener('click', () => {
            resetLocalStorage();    
        });    
    }   
    
    const restartGameButton = document.querySelector(".restart button");

    if (restartGameButton !== null) {
        restartGameButton.addEventListener('click', () => {
            resetLocalStorage();
        });    
    }
    
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
        leaderboardItem.innerText = 'Leaderboard';
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
        if (difficulty.innerText === "Usor") difficulty.innerText = "Easy";
        if (difficulty.innerText === "Mediu") difficulty.innerText = "Medium";
        if (difficulty.innerText === "Greu") difficulty.innerText = "Hard";
    }

    const changeLangToRo = () => {

        sudokuGameItem.innerText = 'Jocul Sudoku';
        tipsAndTricksItem.innerText = 'Sfaturi și trucuri Sudoku';
        leaderboardItem.innerText = 'Clasament';
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
        if (difficulty.innerText === "Easy") difficulty.innerText = "Usor";
        if (difficulty.innerText === "Medium") difficulty.innerText = "Mediu";
        if (difficulty.innerText === "Hard") difficulty.innerText = "Greu";
    }

    // Dark mode 

    const darkModeButton = document.querySelector("nav .dark_mode");

    darkModeButton.addEventListener("click", () => {

        const darkModeIcon = darkModeButton.querySelector("i");
        if (darkModeIcon.classList.contains("fa-moon")) {
            darkMode();      
            localStorage.setItem("darkMode", JSON.stringify("on"));     
        }

        if (darkModeIcon.classList.contains("fa-sun")) {
            lightMode();    
            localStorage.setItem("darkMode", JSON.stringify("off"));
        }
    });

    const darkMode = () => {
        darkModeButton.innerHTML = "<i class='fas fa-sun'></i>";
        document.body.classList.add("dark");
        cells.forEach(cell => cell.classList.add("dark"));
        timerText.classList.add("dark");
        dataNumbers.forEach(dataNumber => dataNumber.classList.add("dark"));
        timerPauseButton.classList.add("dark");
        timeContent.classList.add("dark");
        commandTitles.forEach(commandTitle => commandTitle.classList.add("dark"));
        gameModes.forEach(mode => mode.classList.add("dark"));
        newGameSelector.classList.add("dark");
    };

    const lightMode = () => {
        darkModeButton.innerHTML = "<i class='fas fa-moon'></i>";
        document.body.classList.remove("dark");
        cells.forEach(cell => cell.classList.remove("dark"));
        timerText.classList.remove("dark");
        dataNumbers.forEach(dataNumber => dataNumber.classList.remove("dark"));
        timerPauseButton.classList.remove("dark");
        timeContent.classList.remove("dark");
        commandTitles.forEach(commandTitle => commandTitle.classList.remove("dark"));
        gameModes.forEach(mode => mode.classList.remove("dark"));
        newGameSelector.classList.remove("dark");
    };

    // Dark mode local storage

    if (JSON.parse(localStorage.getItem("darkMode")) === "on") darkMode();
    else if (JSON.parse(localStorage.getItem("darkMode")) === "off") lightMode();

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
                newSudokuBoard = getBoard(type.toString());
                console.log(newSudokuBoard)
            } else {
                newSudokuBoard = getBoard("easy");
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
        localStorage.removeItem(gameMode + "-mistakes");

        if (localStorage.getItem(gameMode + "-hint-coords-1") !== null) {
            localStorage.removeItem(gameMode + "-hint-coords-1");
        }

        if (localStorage.getItem(gameMode + "-hint-coords-2") !== null) {
            localStorage.removeItem(gameMode + "-hint-coords-2");
        }

        if (localStorage.getItem(gameMode + "-hint-coords-3") !== null) {
            localStorage.removeItem(gameMode + "-hint-coords-3");
        }

        if (gameMode === "classic") {
            window.location.href = "./"; 
        } else {
            window.location.href = "./competitive";
        }
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
        localStorage.removeItem(gameMode + "-mistakes");

        if (localStorage.getItem(gameMode + "-hint-coords-1") !== null) {
            localStorage.removeItem(gameMode + "-hint-coords-1");
        }

        if (localStorage.getItem(gameMode + "-hint-coords-2") !== null) {
            localStorage.removeItem(gameMode + "-hint-coords-2");
        }

        if (localStorage.getItem(gameMode + "-hint-coords-3") !== null) {
            localStorage.removeItem(gameMode + "-hint-coords-3");
        }

        if (gameMode === "classic") {
            window.location.href = "./"; 
        } else if (gameMode === 'simple') {
            window.location.href = "./simple";
        } else {
            window.location.href = "./competitive";
        }
        
    }
    
})();


