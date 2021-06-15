export default class ReverseSudoku {

    constructor(game, board, timer, mistakeContent) {
        this.game = game;
        this.board = board;
        this.timer = timer;
        this.realTimeBoard = this.fillBoard([]);
        this.mistakeContent = mistakeContent;
    }

    // Function that returns the board move, even if it's a good move or a bad move
    boardWithCurrentMove() {

        let currentBoard = [ [], [], [], [], [], [], [], [], [] ];  

        this.allCells.forEach((cell, index) => {
            const rowIndex = Math.floor(index / 9);
            currentBoard[rowIndex].push(cell.innerText === "" ? 0 : parseInt(cell.innerText));
        });

        return currentBoard;
        
    }

    fillBoard(board) {
        for (let i = 0; i < 9; i++) {
            board.push(new Array(9).fill(0));
        } 

        return board;
    }

    createBoard() {   
        for (let i = 0; i < 9; i++) {
            const row = document.createElement('tr');
            row.classList.add('game-row');

            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('td');
                cell.classList.add('game-cell');

                this.middleCenterX = 4;
                this.middleCenterY = 4;

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
            
        }

        this.allCells = document.querySelectorAll('.game-cell');
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

    printValue(number) { 
 
        const cellHighlighted = [...this.allCells].some(cell => {
            return cell.classList.contains('chosen_cell');
        });

        if (!cellHighlighted) return;

        const displayedRow = document.querySelectorAll('.game-row')[this.cellX];
        const displayedCell = displayedRow.querySelectorAll('.game-cell')[this.cellY];
        
        if (displayedCell.classList.contains('not-editable')) return;

        if (this.possible(this.cellX, this.cellY, number)) {
            displayedCell.classList.remove('failedCell'); 
            displayedCell.classList.add('passedCell');
        } else {
            displayedCell.classList.add('failedCell');
            displayedCell.classList.remove('passedCell');   
        }

        if (number === '') {
            const highlightedCells = document.querySelectorAll('.chosen_row_column_square');
                
            highlightedCells.forEach(highlightedCell => {
                highlightedCell.classList.remove('failedCell');
                highlightedCell.classList.remove('failedCellBg');
            });
        } 
        
        displayedCell.innerText = number;
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

    correctMove(board, row, column, number) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === number && i !== column) return false;
            
            if (board[i][column] === number && i !== row) return false;
        }

        

        const squareX = Math.floor(row / 3) * 3;
        const squareY = Math.floor(column / 3) * 3;
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[squareX + i][squareY + j] === number && (squareX + i) !== row && squareY + j !== column) return false;
            }
        }
        
        return true;
    }

    
    possibleBoard(board) {

        let possibleBoard = true;
        
        board.forEach((row, rowIdx) => {
            row.forEach((cell, cellIdx) => {
                console.log(cell);
                if (cell !== 0) {
                    if (!this.correctMove(board, rowIdx, cellIdx, cell)) possibleBoard = false;
                }
            });
        });
        
        return possibleBoard;
    }
    
    solveCurrentBoard() {
        if (this.board.classList.contains('paused')) return;
        const currBoard = this.boardWithCurrentMove();
        console.log((currBoard));

        const boardFailElement = this.mistakeContent.querySelector("p");

        if (!this.possibleBoard(currBoard)) {
            if (boardFailElement !== null) return;
            const boardFail = document.createElement("p");
            boardFail.innerText = "Current board is not a valid one!";
            this.mistakeContent.appendChild(boardFail);
            return;
        }

        if (boardFailElement !== null) {
            boardFailElement.remove();
        }

        console.log('solved');
        solveBoard(this.realTimeBoard);
        
        if (this.fullBoard()) this.printSolvedBoard();
    }

    printSolvedBoard() {
        this.board.classList.add('inAnimation');
        const lastIdx = 80;
        for (let index = 0; index < 81; index++) {
            const rowIdx = Math.floor(index / 9);
            const cellIdx = index % 9;
            
            const cell = this.allCells[index];
            
            setTimeout(() => {
                
                cell.classList.add('not-editable');
                if (cell.innerText === "") cell.classList.add('animation');
                cell.innerText = cell.innerText === "" ? this.realTimeBoard[rowIdx][cellIdx] : cell.innerText;
                if (index === lastIdx) {
                    
                    setTimeout(() => {
                        this.board.classList.remove('inAnimation');
                    }, 1800);
                
                }
                
            }, index * 35);   
        }
    }

    erase() {
        const highlightedCell = document.querySelector('.chosen_cell');
        if (highlightedCell == null) return;
        if (highlightedCell.classList.contains('not-editable')) return;

        this.printValue('');

        const currBoard = this.boardWithCurrentMove();
        if (currBoard === "") return;

        //this.archiveBoards.push(currBoard);
    }

    fullBoard() {
        return this.realTimeBoard.every(row => {
            return row.every(cell => {
                return cell !== 0;
            });
        });
    }

    newGame() {
        this.realTimeBoard = this.fillBoard([]);
        this.allCells.forEach(cell => cell.innerText = '');
        this.removeCellsClasses();
    }

    removeCellsClasses() {
        this.allCells.forEach(cell => {
            cell.classList.remove('chosen_cell');
            cell.classList.remove('chosen_row_column_square');
            cell.classList.remove('not-editable');
            cell.classList.remove('passedCell');
            cell.classList.remove('animation');
        });
    }

    possibleSolvedBoardAnimation(row, column, number) {
        for (let i = 0; i < 9; i++) {
            if (this.realTimeBoard[row][i] === number && i !== column) return false;
            if (this.realTimeBoard[i][column] === number && i !== row) return false;
            const squareX = Math.floor(row / 3) * 3;
            const squareY = Math.floor(column / 3) * 3;
            const xCoord = Math.floor(i / 3);
            const yCoord = i % 3;

            if (this.realTimeBoard[squareX + xCoord][squareY + yCoord] &&
                squareX + xCoord !== row &&
                squareY + yCoord !== column) return false;
            cell.classList.add('passedCell');
        }
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