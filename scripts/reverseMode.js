import ReverseSudoku from './reverseModeInterface.js';

const gameElement = document.querySelector('.game');
const board = document.querySelector('table.board');
const timer = document.querySelector('.timer');


const game = new ReverseSudoku(gameElement, board, timer);
game.createBoard();

// Click event on cell
const cells = document.querySelectorAll('.game-cell');
const dataNumbers = document.querySelectorAll('[data-number]');
cells.forEach((cell, index) => {
    const cellIndex = index % 9;

    cell.addEventListener('click', () => {
        game.cellHighlight(cell, cellIndex);
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

// Solve Board

const solveButton = document.querySelector('.solveContainer');

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