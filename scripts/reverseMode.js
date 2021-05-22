import ReverseSudoku from './reverseModeInterface.js';

const gameElement = document.querySelector('.game');
const board = document.querySelector('table.board');
const timer = document.querySelector('.timer');
const timerText = timer.querySelector('.timer_text');

if (screen.width > 1920) {
    const scaleX = screen.width / 1920;
    gameElement.style.transform = 'scale(' + scaleX + ')';
}

const game = new ReverseSudoku(gameElement, board, timer);
game.createBoard();


const gameModeTitle = document.querySelector('.mode_title h1');
const classicMode = document.querySelector('.modes .mode.classic');
const competitiveMode = document.querySelector('.modes .mode.competitive');
const reverseMode = document.querySelector('.modes .mode.reverse');
const newGame = document.querySelector('.new-game h1');

// Compute titles
const undoButton = document.querySelector('.undoContainer');
const eraseButton = document.querySelector('.eraseContainer');
const solveButton = document.querySelector('.solveContainer');

const solveTitle = solveButton.querySelector('.command-title');
const undoTitle = undoButton.querySelector('.command-title');
const eraseTitle = eraseButton.querySelector('.command-title');

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

// Click event on cell
const cells = document.querySelectorAll('.game-cell');
const dataNumbers = document.querySelectorAll('[data-number]');
cells.forEach((cell, index) => {
    const cellIndex = index % 9;

    cell.addEventListener('click', () => {
        game.cellHighlight(cell, cellIndex);

         // Erase event
        eraseButton.addEventListener('click', () => {
            game.erase();
        });
    });

    document.addEventListener('keydown', e => {
           
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && isNaN(parseInt(e.key))) return;

        if (parseInt(e.key) > 0 && parseInt(e.key) < 10) {  
            game.printValue(parseInt(e.key));               
        }
    });
      
    // Event for clicking the numbers grid
    dataNumbers.forEach(dataNumber => {
        dataNumber.addEventListener('click', () => {
            game.printValue(parseInt(dataNumber.innerText));
        });
    });

   

});

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

// Click event for pause/play button
const boardPlayButton = document.querySelector('.play-button');
const timerPauseButton = document.querySelector('.pause-time');

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


const timeSeconds = timer.querySelector('.seconds');
const timeMinutes = timer.querySelector('.minutes');
const timeHours = timer.querySelector('.hours');


// Timer count

let numberOfSeconds = 0;
let numberOfMinutes = 0;
let numberOfHours = 0;

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

    numberOfSeconds++;
    
}

// Interval for timer going
let timerInterval = setInterval(counter, 1000);


solveButton.addEventListener('click', () => {
    game.solveCurrentBoard();
    
})

// New Game

const newGameButton = document.querySelector('.new-game');
newGameButton.addEventListener('click', () => {
    if (board.classList.contains('inAnimation')) return;
    game.newGame();
    console.log(newGameButton);
});


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
    solveTitle.innerText = 'Solve!';
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
    solveTitle.innerText = 'Rezolvă!'
    undoTitle.innerText = 'Înapoi';
    eraseTitle.innerText = 'Ștergere';
}