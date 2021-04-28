import Sudoku from './sudokuInterface.js';

const gameElement = document.querySelector('.game');

if (screen.width > 1920) {
    const scaleX = screen.width / 1920;
    gameElement.style.transform = 'scale(' + scaleX + ')';
}

const board = document.querySelector('table.board');
const score = document.querySelector('.score');
const timer = document.querySelector('.timer');
const hintsCount = document.querySelector('.hint-counter');
const gameMode = document.querySelector('.game-mode').innerText;


const timeSeconds = timer.querySelector('.seconds');
const timeMinutes = timer.querySelector('.minutes');
const timeHours = timer.querySelector('.hours');

const game = new Sudoku(gameElement, board, score, hintsCount, gameMode);

// Showing the initial board
game.displayBoard();

// Click event on cell
const cells = document.querySelectorAll('.game-cell');
const dataNumbers = document.querySelectorAll('[data-number]');

// Compute buttons
const eraseButton = document.querySelector('.eraseContainer');
const undoButton = document.querySelector('.undoContainer');
const hintButton = document.querySelector('.hintContainer');

const endGame = document.querySelector('.end-game');

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
                    return;
                } 

                endGame.classList.add('active');
                endGame.classList.add('lose');
                game.gameFinal('lost');
                
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
                    return;
                } 

                endGame.classList.add('active');
                endGame.classList.add('lose');
                game.gameFinal('lost')
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
        });
    });
});

// Game Modes

const gameModes = document.querySelectorAll('.mode');
gameModes.forEach(gameMode => {
    gameMode.addEventListener('click', () => {
        
        const prevActiveMode = document.querySelector('.mode.active');
        prevActiveMode.classList.remove('active');
        gameMode.classList.add('active');
        
    });
});

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
        if (e.target === forms) return;
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
const boardPlayButton = document.querySelector('.play-button');
const timerPauseButton = document.querySelector('.pause-time');
if (gameMode === 'Competitive') {
    timerPauseButton.classList.add('hide');
    boardPlayButton.classList.add('hide');
}
timerPauseButton.addEventListener('click', () => {
    
    timer.classList.toggle('paused');
    board.classList.toggle('paused');

    if (timer.classList.contains('paused')) {
        timerPauseButton.innerHTML = "<i class='fas fa-play-circle'></i>";
        game.pauseBoard();
    
        boardPlayButton.classList.add('show');
        
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
        boardPlayButton.classList.remove('show');
    }
});


// Timer count

let numberOfSeconds = 0;
let numberOfMinutes = 0;
let numberOfHours = 0;
let timeTarget = 5;

const counter = () => {

    if (timer.classList.contains('paused')) return;

    if (numberOfMinutes > 59) {
        numberOfHours++;
        numberOfMinutes = 0;
        numberOfSeconds = 0;
        timeHours.innerText = numberOfHours + (timeHours.innerText.includes(':') ? 0 : ":");
    }

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
    
        // Checking for lowering the score
    if (numberOfMinutes === timeTarget) {
        game.score.innerText = parseInt(game.score.innerText) - 1;

        if (game.checkGameOver()) {
            game.gameRunning = false;
            endGame.classList.add('active');
            endGame.classList.add('lose');
            game.gameResult = 'lose';
            game.gameFinal('lost');
        }

        timeTarget++;
    }

    numberOfSeconds++;
    
}

// Interval for timer going

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


