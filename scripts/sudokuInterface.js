export default class Sudoku {

    constructor(game, board, score, hintCounter, gameMode) {

        this.game = game;
        this.board = board;
        this.sudokuInitBoard = Sudoku.buildBoard();
        this.score = score;
        this.hintCounter = hintCounter;
        this.gameMode = gameMode.toLowerCase();

        this.mistakeBoard = this.sudokuInitBoard;
        this.hintsBoard = this.sudokuInitBoard;
        this.archiveBoards = Sudoku.buildBoard();
        this.updateArchiveBoards();
       
        this.solvedBoard = Sudoku.buildBoard();
        solveBoard(this.solvedBoard);

        this.gameRunning = true;
        this.gameResult = undefined;
        this.gameResultCard = document.querySelector('.game-result-card');
    }

    static buildBoard() {

        const sudokuBoard = [
            [6, 0, 5, 0, 0, 0, 7, 0, 9],
            [7, 3, 4, 5, 9, 8, 0, 0, 2],
            [2, 0, 0, 7, 6, 4, 3, 0, 0],
            [1, 0, 0, 0, 8, 3, 0, 0, 4],
            [0, 4, 0, 0, 1, 0, 8, 6, 0],
            [5, 0, 8, 4, 0, 0, 0, 0, 3],
            [0, 0, 1, 0, 4, 0, 2, 0, 0],
            [9, 0, 6, 8, 0, 1, 4, 3, 0],
            [0, 0, 0, 2, 0, 0, 0, 0, 0]
        ];

        return sudokuBoard;
    }

    // Function that returns the board move, even if it's a good move or a bad move
    boardWithCurrentMove() {

        let currentBoard = [ [], [], [], [], [], [], [], [], [] ];  

        this.allCells.forEach((cell, index) => {
            const rowIndex = Math.floor(index / 9);
            currentBoard[rowIndex].push(cell.innerText === "" ? 0 : parseInt(cell.innerText));
        });

        if (this.archiveBoards[this.archiveBoards.length - 1] === currentBoard) return "";

        return currentBoard;
        
    }

    displayBoard() {
        this.rows = this.sudokuInitBoard;
        this.columns = this.sudokuInitBoard[0];
        this.createBoard(this.sudokuInitBoard);
    }

    createBoard(board) {
        
        for (let i = 0; i < this.rows.length; i++) {
            const row = document.createElement('tr');
            row.classList.add('game-row');

            for (let j = 0; j < this.columns.length; j++) {
                const cell = document.createElement('td');
                cell.classList.add('game-cell');

                this.middleCenterX = parseInt(this.rows.length / 2);
                this.middleCenterY = parseInt(this.columns.length / 2);

                if (board[i][j] !== 0) {
                    cell.innerText = board[i][j];
                    // Making not editable
                    cell.classList.add('not-editable');
                }

                if (i == this.middleCenterX && j == this.middleCenterY) {

                    const playButton = document.createElement('div');
                    playButton.classList.add('play-button');

                    const icon = document.createElement('i');
                    icon.classList.add('fas');
                    icon.classList.add('fa-play-circle');

                    playButton.appendChild(icon);
                    cell.appendChild(playButton);
                    cell.classList.add('middleCell');
                }

                row.appendChild(cell);
            }

            this.board.appendChild(row);
            // Changing the actual board
            this.realTimeBoard = this.sudokuInitBoard;
        }

        this.allCells = document.querySelectorAll('.game-cell');
    }

    checkResult() {
        let result = [...this.allCells].every(cell => {
            return !(cell.classList.contains('failedCell'));
        });

        if (result) return 'win';
        else return 'lose';
    }

    checkGameEnds() {
        this.gameResult = this.checkResult();
        if (this.gameResult === 'lose') return;
        
        return [...this.allCells].every(cell => {
            return cell.innerText !== "";
        });
    }

    checkGameOver() {
        return parseInt(this.score.innerText) <= 0;
    }

    cellHighlight(cell, index) {
        
        this.allCells.forEach(cell => cell.classList.remove('chosen_row_column_square'));

        // Checking for previous highlighted cell
        const highlightedCell = document.querySelector('.chosen_cell');

        if (highlightedCell !== null) highlightedCell.classList.remove('chosen_cell');
        
        // Cell adding highlight
        cell.classList.add('chosen_cell');
        
        // Checking for previous highlighted coordonates of  cell
        const rowCells = cell.parentElement.querySelectorAll('.game-cell');
        const highlightedCellsCoordonates = document.querySelectorAll('.chosen_row_column_square');
        
        if (highlightedCellsCoordonates !== null) {

            highlightedCellsCoordonates.forEach(highlightedCellCoordonates => {
                highlightedCellCoordonates.classList.remove('chosen_row_column_square');
            });

        }

        // Cell's row highlight
        rowCells.forEach(rowCell => {
            rowCell.classList.add('chosen_row_column_square');
        });

        // Cell's column highlight
        
        // Highlighting every cell from the row of the target cell
        this.displayedRows = document.querySelectorAll('.game-row');
        this.displayedRows.forEach((displayedRow) => {
            this.cellsFromRow = displayedRow.querySelectorAll('.game-cell');
            this.cellsFromRow[index].classList.add('chosen_row_column_square');
        });

        // Cell's square highlight
        this.currentRow = cell.parentElement;
        this.displayedRows.forEach((row, yCoordonate) => {
            if (row == this.currentRow) {
                this.cellX = yCoordonate;
                const cellsFromCurrentRow = row.querySelectorAll('.game-cell');
                cellsFromCurrentRow.forEach((cellFromRow, xCoordonate) => {
                    if (cell == cellFromRow) {
                        this.cellY = xCoordonate;
                    }
                });
            }  
        });
       
       // Square coordonates
       this.squareX = Math.floor(this.cellX / 3) * 3;
       this.squareY = Math.floor(this.cellY / 3) * 3;

       for (let i = 0; i < 3; i++) {
           for (let j = 0; j < 3; j++) {
               let squareRow = this.board.querySelectorAll('.game-row');
               let squareColumn = squareRow[this.squareX + i].querySelectorAll('.game-cell');
               squareColumn[this.squareY + j].classList.add('chosen_row_column_square');
           }
       }
    }

    cellHighlightArrowKey(direction, cell, cellIdx, rowIdx) {
        let newHighLightedCell;

        if (direction === 'ArrowUp') {
            if (rowIdx === 0) return;
            
            const cellInRow = document.querySelectorAll('.game-row')[rowIdx - 1];
            newHighLightedCell = cellInRow.querySelectorAll('.game-cell')[cellIdx];
            
        }

        if (direction === 'ArrowDown') {
            if (rowIdx === 8) return;
            
            const cellInRow = document.querySelectorAll('.game-row')[rowIdx + 1];
            newHighLightedCell = cellInRow.querySelectorAll('.game-cell')[cellIdx];
           
        }

        if (direction === 'ArrowLeft') {
            if (cellIdx === 0) return;

            const cellInRow = document.querySelectorAll('.game-row')[rowIdx];
            newHighLightedCell = cellInRow.querySelectorAll('.game-cell')[cellIdx - 1];
            
        }

        if (direction === 'ArrowRight') {
            if (cellIdx === 8) return;

            const cellInRow = document.querySelectorAll('.game-row')[rowIdx];
            newHighLightedCell = cellInRow.querySelectorAll('.game-cell')[cellIdx + 1];
        }

        this.cellHighlight(newHighLightedCell, cellIdx);
    }

    findCellPosition(cell) {
        let position;
        this.allCells.forEach((elem, idx) => {
            if (elem === cell) position = idx;
        });

        return position;
    }

    cleanCellsHighlight() {
        
        this.allCells.forEach(cell => {
            cell.classList.remove('failedCell');
            cell.classList.remove('failedCellBg');
            cell.classList.remove('passedCell');
        });
    }

    getDifferentCell(fBoard, sBoard) {
        let cellBoardIdx = -1;
        fBoard.forEach((row, rowIdx) => {
            row.forEach((cell, cellIdx) => {
                if (cell !== sBoard[rowIdx][cellIdx]) {
                    cellBoardIdx = 9 * rowIdx + cellIdx;
                    
                }
            });
        });

        return cellBoardIdx;
    }

    printValue(number) { 
 
        const cellHighlighted = [...this.allCells].some(cell => {
            return cell.classList.contains('chosen_cell');
        });

        if (!cellHighlighted) return;

        const displayedRow = document.querySelectorAll('.game-row')[this.cellX];
        const displayedCell = displayedRow.querySelectorAll('.game-cell')[this.cellY];
        
        
        if (number === '') {
            const highlightedCells = document.querySelectorAll('.chosen_row_column_square');
            
            highlightedCells.forEach(highlightedCell => {
                highlightedCell.classList.remove('failedCell');
                highlightedCell.classList.remove('failedCellBg');
            });

            displayedCell.innerText = number;
            return;
        } 

        // For accessing the player's board cells and rows 
        if (!displayedCell.classList.contains('not-editable')) {

            if (this.possible(this.cellX, this.cellY, number)) {
                displayedCell.classList.remove('failedCell'); 
                displayedCell.classList.add('passedCell');
            } else {

                if (this.mistakeBoard[this.cellX][this.cellY] !== number) {
                    this.mistakeBoard[this.cellX][this.cellY] = number;
                    this.score.innerText = parseInt(this.score.innerText) - 3 < 0 ? "0" : parseInt(this.score.innerText) - 3;   
                    
                    if (parseInt(this.score.innerText) == 0) {
                        this.gameRunning = false;
                        this.gameResult = 'lose';
                    }
                }

                displayedCell.classList.add('failedCell');
                displayedCell.classList.remove('passedCell'); 
                
            }

            displayedCell.innerText = number;
            if (this.checkGameEnds()) {
                this.gameRunning = false;
                this.gameResult = 'win';
            }
        }

        const currBoard = this.boardWithCurrentMove();
        if (currBoard === "") return;

        this.archiveBoards.push(currBoard);
    }

    checkEveryCell(board, xIdx, yIdx) {

        if(board[xIdx][yIdx] === 0) return;

        const currRow = document.querySelectorAll('.game-row')[xIdx];
        const currCell = currRow.querySelectorAll('.game-cell')[yIdx];

        if (this.possible(xIdx, yIdx, board[xIdx][yIdx])) {
            currCell.classList.remove('failedCell');
            currCell.classList.remove('failedCellBg');
            return;
        }

        currCell.classList.add('failedCell');
        currCell.classList.remove('passedCell'); 
    }

    checkHintedCell(x, y) {
       
        const row = document.querySelectorAll('.game-row')[x];
        const cell = row.querySelectorAll('.game-cell')[y];
        if (cell.classList.contains('correctCell')) return true;
        return false;
    }

    // Check for highlighting the cell if it's a wrong move
    possible(row, column, number) {

        // Number of not-working cells
        let mistakes = 0;
        this.universalCellMistake = undefined;

        // Checking the row
        for (let i = 0; i < 9; i++) {
            const rowMistake = this.board.querySelectorAll('.game-row')[row];
            const cellMistake = rowMistake.querySelectorAll('.game-cell')[i];
        
            if (this.realTimeBoard[row][i] === number && column !== i) {
                mistakes++;
                cellMistake.classList.add('failedCell');
                cellMistake.classList.add('failedCellBg');
                this.universalCellMistake = cellMistake;
            } else {
                cellMistake.classList.remove('failedCell');
                cellMistake.classList.remove('failedCellBg');
            }
        }

        // Checking the column
        for (let i = 0; i < 9; i++) {

            const rowMistake = this.board.querySelectorAll('.game-row')[i];
            const cellMistake = rowMistake.querySelectorAll('.game-cell')[column];
            
            if (this.realTimeBoard[i][column] === number && row != i) {  
                mistakes++;
                cellMistake.classList.add('failedCell');
                cellMistake.classList.add('failedCellBg');

                if (this.universalCellMistake === undefined) {
                    this.universalCellMistake = cellMistake;
                }
                
            } else {
                if (cellMistake != this.universalCellMistake) {
                    cellMistake.classList.remove('failedCell');
                    cellMistake.classList.remove('failedCellBg');
                }
            }
        }

        // Checking the square
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                const rowMistake = this.board.querySelectorAll('.game-row')[this.squareX + i];
                const cellMistake = rowMistake.querySelectorAll('.game-cell')[this.squareY + j];    
                
                if (this.realTimeBoard[this.squareX + i][this.squareY + j] === number && row !== (this.squareX + i) && column !== (this.squareY + j)) {
                    mistakes++;
                    cellMistake.classList.add('failedCell');
                    cellMistake.classList.add('failedCellBg');
                    if (this.universalCellMistake === undefined) {
                        this.universalCellMistake = cellMistake;
                    }    
                } else if (cellMistake != this.universalCellMistake) {
                    cellMistake.classList.remove('failedCell');
                    cellMistake.classList.remove('failedCellBg');
                }
            }
        }

        // for every mistake 3 points are taken away

        if (mistakes > 0) return false;
        
        // Changing the value of board with the chosen coords 
        this.realTimeBoard[row][column] = number;
        return true;      
    } 
    
    // Pause board if timer is off
    pauseBoard() {
        const cells = document.querySelectorAll('.game-cell');
        cells.forEach((cell, index) => {
            
            if (index !== parseInt(cells.length / 2)) {
                cell.innerText = '';                
            }

            if (index === parseInt(cells.length / 2)) {
                cell.innerHTML = 
                ` <div class="play-button show">
                    <i class="fas fa-play-circle"></i>
                  </div>`;
            }
        });
    }

    // Continue board if timer is on
    continueBoard() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const rows = document.querySelectorAll('.game-row')[i];
                const cell = rows.querySelectorAll('.game-cell')[j];
                if (this.realTimeBoard[i][j] !== 0) {
                    cell.innerText = this.realTimeBoard[i][j];
                }

                if (i === 4 && j === 4 && this.realTimeBoard[i][j] === 0) {
                    cell.innerHTML = 
                    ` <div class="play-button">
                        <i class="fas fa-play-circle"></i>
                    </div>`;
                }
            }   
        }
    } 
    
    erase() {
        const highlightedCell = document.querySelector('.chosen_cell');
        if (highlightedCell == null) return;
        if (highlightedCell.classList.contains('not-editable')) return;

        this.printValue('');

        const currBoard = this.boardWithCurrentMove();
        if (currBoard === "") return;

        this.archiveBoards.push(currBoard);
    }

    undo() {
        
        if (this.archiveBoards.length < 2) return;
        
        const newCurrentBoard = this.archiveBoards[this.archiveBoards.length - 2];
        this.cleanCellsHighlight();
        
        this.allCells.forEach((cell, index) => {
            const xCoordonate = Math.floor(index / 9);
            const yCoordonate = index % 9; 
            cell.innerText = newCurrentBoard[xCoordonate][yCoordonate] === 0 ? "" : newCurrentBoard[xCoordonate][yCoordonate];
            
            
            if (!isNaN(parseInt(cell.innerText)) && parseInt(cell.innerText) !== this.realTimeBoard[xCoordonate][yCoordonate]) {
                if (this.checkHintedCell(xCoordonate, yCoordonate)) return;
                
                if (this.possible(xCoordonate, yCoordonate, newCurrentBoard[xCoordonate][yCoordonate])) {
                    cell.classList.remove('failedCell');
                    cell.classList.remove('failedCellBg');
                    cell.classList.add('passedCell');
                } else {
                    cell.classList.add('failedCell');
                    cell.classList.remove('failedCellBg');
                    cell.classList.remove('passedCell');
                }
            }
        });

        this.realTimeBoard = newCurrentBoard;
        this.archiveBoards.pop();
    }

    // The numbers of the hinted cell (correct cell)

    numberOfHintedCells() {
        let correctCells = 0;
        this.allCells.forEach(cell => cell.classList.contains('correctCell') ? correctCells++ : null)
        return correctCells;
    }

    hint() {

        const currBoard = this.boardWithCurrentMove();
        if (this.hintCounter.innerText == 0) return;
        const numberOfCorrectCells = this.numberOfHintedCells();
        console.log(numberOfCorrectCells);
        if (numberOfCorrectCells != this.hintCounter.innerText) this.hintCounter.innerText = 3 - numberOfCorrectCells;
        if (this.hintsBoard[this.cellX][this.cellY] !== 0 && this.possible(this.cellX, this.cellY, this.hintsBoard[this.cellX][this.cellY]) && currBoard[this.cellX][this.cellY] === this.solvedBoard[this.cellX][this.cellY]) return;

        const cellHighlighted = [...this.allCells].some(cell => {
            return cell.classList.contains('chosen_cell');
        });

        if (!cellHighlighted) return;

        this.printValue(this.solvedBoard[this.cellX][this.cellY]);
        if (this.checkGameEnds()) {
            this.gameRunning = false;
            this.gameResult = 'win';
        }

        // Making the cell color green for a hinted cell
        const row = document.querySelectorAll('.game-row')[this.cellX];
        const cell = row.querySelectorAll('.game-cell')[this.cellY];

        cell.classList.remove('passedCell');
        cell.classList.add('correctCell');
        cell.classList.add('not-editable');

        this.updateHintCounter();
    }

    updateHintCounter() {
        this.hintCounter.innerText = parseInt(this.hintCounter.innerText) - 1;
    }

    updateArchiveBoards() {
        this.archiveBoards = [this.archiveBoards];
    }

    gameFinal(result) {
        const finalResult = this.gameResultCard.querySelector('.result');
        finalResult.innerText = "You've " + result + "!";

        const finalScore = this.gameResultCard.querySelector('.final-score');
        finalScore.innerHTML = 'Score: <i class="fas fa-bolt"></i>' + this.score.innerText;

        const finalTime = this.gameResultCard.querySelector('.final-time');
        const timeHours = document.querySelector('span.hours');
        const timeMinutes = document.querySelector('span.minutes');
        const timeSeconds = document.querySelector('span.seconds');
        finalTime.innerHTML = 'Time: <i class="fas fa-clock"></i>' + (timeHours.innerText === "" ? "" : timeHours.innerText + ":") + timeMinutes.innerText + ":" + timeSeconds.innerText;
    
        // Cause of lose
    }

   

}


// Sudoku solving functions (private)

function isValid(board, row, column, number) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === number || board[i][column] === number) return false;
    }

    const squareXCoord = Math.floor(row / 3) * 3;
    const squareYCoord = Math.floor(column / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[squareXCoord + i][squareYCoord + j] === number) return false;
        }
    }

    return true;
}



function solveBoard(currBoard) {

    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            
            if (currBoard[row][column] === 0) {
                for(let number = 1; number <= 9; number++) {

                    if (isValid(currBoard, row, column, number)) {
                        currBoard[row][column] = number;

                        if (solveBoard(currBoard)) {
                            return true;
                        } else {
                            currBoard[row][column] = 0;
                        }

                    }
                }
                return false;
            }
        }
    }

    return true;
}

function equalArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
    const sameArray = arr1.every((elem, index) => elem === arr2[index]);
    return sameArray;
}

function saveBoard(board) {
                              
}

function saveSelectedCell() {

}

function saveHints() {

}

function saveTime() {

}

function saveScore() {
    
}
