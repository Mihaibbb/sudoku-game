export default class Sudoku {

    constructor(game, sudokuBoard, board, score, hintCounter, gameMode, difficulty, mistakesCounter) {
        
        this.game = game;
        this.board = board;
        
        this.score = score;

        this.hintCounter = hintCounter;
        this.gameMode = gameMode.toLowerCase();
        this.difficulty = difficulty.toLowerCase();
        this.sudokuInitBoard = sudokuBoard;
        this.mistakesCounter = mistakesCounter;
        
        saveInitBoard(this.sudokuInitBoard, this.gameMode);
        this.sudokuBoard = sudokuBoard;
        this.mistakeBoard = this.sudokuInitBoard;
        this.hintsBoard = this.sudokuInitBoard;
    
        this.gameRunning = true;
        this.gameResult = undefined;
        this.gameResultCard = document.querySelector('.game-result-card');

    }

    // Function that returns the board move, even if it's a good move or a bad move
    boardWithCurrentMove() {

        let currentBoard = [ [], [], [], [], [], [], [], [], [] ];  

        this.allCells.forEach((cell, index) => {
            const rowIndex = Math.floor(index / 9);
            currentBoard[rowIndex].push(cell.innerText === "" ? 0 : parseInt(cell.innerText));
        });
        // if (this.archiveBoards !== undefined) {
        //     if (this.archiveBoards[this.archiveBoards.length - 1] === currentBoard) return "";
        // }
        
        return currentBoard;
        
    }

    displayBoard() {
        this.rows = this.sudokuInitBoard;
        this.columns = this.sudokuInitBoard[0];
        this.createBoard(this.sudokuInitBoard);

        if (localStorage.getItem(this.gameMode + "-init-board") !== null) {
            const initBoard = JSON.parse(localStorage.getItem(this.gameMode + "-init-board"));
            
            for (let i = 0; i < this.rows.length; i++) {
                for (let j = 0; j < this.columns.length; j++) {
                    if (this.sudokuInitBoard[i][j] !== initBoard[i][j] && this.sudokuInitBoard[i][j] !== 0) {
                        
                        const row = document.querySelectorAll('.game-row')[i];
                        const cell = row.querySelectorAll('.game-cell')[j];
                        cell.classList.remove('not-editable');

                        let hintedCells = 0;
                        
                        if (localStorage.getItem(this.gameMode + "-hint-coords-1") !== null) {
                            const hint = JSON.parse(localStorage.getItem(this.gameMode + "-hint-coords-1"));
                            if (hint.x === i && hint.y === j) {
                                cell.classList.add('correctCell');
                                cell.classList.add('not-editable');
                                hintedCells++;
                            }
                        }

                        if (localStorage.getItem(this.gameMode + "-hint-coords-2") !== null) {
                            const hint = JSON.parse(localStorage.getItem(this.gameMode + "-hint-coords-2"));
                            if (hint.x === i && hint.y === j) {
                                cell.classList.add('correctCell');
                                cell.classList.add('not-editable');
                                hintedCells++;
                            }
                        }

                        if (localStorage.getItem(this.gameMode + "-hint-coords-3") !== null) {
                            const hint = JSON.parse(localStorage.getItem(this.gameMode + "-hint-coords-3"));
                            if (hint.x === i && hint.y === j) {
                                cell.classList.add('correctCell');
                                cell.classList.add('not-editable');
                                hintedCells++;
                            }
                        }
                        if (hintedCells !== 0) continue;
                        if (this.possible(i, j, this.sudokuInitBoard[i][j])) {
                            cell.classList.remove('failedCell'); 
                            cell.classList.add('passedCell');
                        } else {

                            cell.classList.add('failedCell');
                            cell.classList.remove('passedCell');     
                        }
                    }
                }
            }
            
        }
    }

    createBoard(board) {
        
        this.realTimeBoard = this.sudokuInitBoard;

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
            
        }

        this.allCells = document.querySelectorAll('.game-cell');

        this.solvedBoard = this.boardWithCurrentMove();
        if (localStorage.getItem(this.gameMode + "-init-board") !== null) {
            this.solvedBoard = JSON.parse(localStorage.getItem(this.gameMode + "-init-board"));    
        }
        solveBoard(this.solvedBoard)
        

        this.archiveBoards = this.boardWithCurrentMove();
        console.log(this.archiveBoards);
        this.updateArchiveBoards();
    }

    checkResult() {
        let result = [...this.allCells].every(cell => {
            return !(cell.classList.contains('failedCell'));
        });

        if (result) return 'win';
        return 'lose';
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
                    if (parseInt(this.score.innerText) > parseInt(JSON.parse(localStorage.getItem(this.gameMode + "-score"))) && this.difficulty === "easy") this.score.innerText = JSON.parse(localStorage.getItem(this.gameMode + "-score"));
                    else if (parseInt(this.score.innerText) > parseInt(JSON.parse(localStorage.getItem(this.gameMode + "-score"))) && this.difficulty === "medium") this.score.innerText = JSON.parse(localStorage.getItem(this.gameMode + "-score"));
                    else if (parseInt(this.score.innerText) > parseInt(JSON.parse(localStorage.getItem(this.gameMode + "-score"))) && this.difficulty === "hard") this.score.innerText = JSON.parse(localStorage.getItem(this.gameMode + "-score"));
                    
                    
                    this.score.innerText = parseInt(this.score.innerText) - 3 < 0 ? "0" : parseInt(this.score.innerText) - 3;   
                    this.mistakesCounter++;
                    
                    localStorage.setItem(this.gameMode + "-mistakes", JSON.stringify(this.mistakesCounter));
                    localStorage.setItem(this.gameMode + "-score", JSON.stringify(this.score.innerText));
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
        if (!displayedCell.classList.contains('correctCell')) {
            this.archiveBoards.push(currBoard);
            console.log('in if');
        } else {
            this.checkHintedCellInArchive(this.cellX, this.cellY, displayedCell.innerText);
        }

        saveBoard(currBoard, this.gameMode);
    }

    checkHintedCellInArchive(x, y, value) {
        
        this.archiveBoards.forEach(board => {
            board[x][y] = parseInt(value);
        });
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

        const squareX = Math.floor(row / 3) * 3;
        const squareY = Math.floor(column / 3) * 3;

        // Checking the square
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                
                const rowMistake = this.board.querySelectorAll('.game-row')[squareX + i];
                
                const cellMistake = rowMistake.querySelectorAll('.game-cell')[squareY + j];    
                
                if (this.realTimeBoard[squareX + i][squareY + j] === number && row !== (squareX + i) && column !== (squareY + j)) {
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
        
        localStorage.setItem(this.gameMode + "-board", JSON.stringify(currBoard));
        this.archiveBoards.push(currBoard);
        
    }

    undo() {
        console.log(this.archiveBoards);
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
        const numberOfCorrectCells = this.numberOfHintedCells();
        
        if (numberOfCorrectCells === 3) this.hintCounter.innerText = 0;
        if (this.hintCounter.innerText == 0) return;
        if (numberOfCorrectCells < this.hintCounter.innerText) this.hintCounter.innerText = 3 - numberOfCorrectCells;
        //if (this.hintsBoard[this.cellX][this.cellY] !== 0 && this.possible(this.cellX, this.cellY, this.hintsBoard[this.cellX][this.cellY]) && currBoard[this.cellX][this.cellY] === this.solvedBoard[this.cellX][this.cellY]) return;

        const cellHighlighted = [...this.allCells].find(cell => {
            return cell.classList.contains('chosen_cell');
        });
        
        if (cellHighlighted === null) return;
        if (cellHighlighted.classList.contains('correctCell') || (cellHighlighted.classList.contains('failedCellBg') && cellHighlighted.classList.contains('not-editable'))) return;
        
        // Making the cell color green for a hinted cell
        const row = document.querySelectorAll('.game-row')[this.cellX];
        const cell = row.querySelectorAll('.game-cell')[this.cellY];
        
        cell.classList.add('correctCell');
        this.printValue(this.solvedBoard[this.cellX][this.cellY]);
        const numberOfHints = this.hintCounter.innerText;
        localStorage.setItem(this.gameMode + "-hint-coords-" + numberOfHints, JSON.stringify({x: this.cellX, y: this.cellY}));
        cell.classList.remove('passedCell');
        cell.classList.add('not-editable');

        if (this.checkGameEnds()) {
            this.gameRunning = false;
            this.gameResult = 'win';
        }
        
        this.updateHintCounter();
    }

    updateHintCounter() {
        this.hintCounter.innerText = parseInt(this.hintCounter.innerText) - 1;
        localStorage.setItem(this.gameMode + "-hints", JSON.stringify(this.hintCounter.innerText));
    }

    updateArchiveBoards() {
        this.archiveBoards = [this.archiveBoards];
        
    }

    gameFinal(result) {
        const finalResult = this.gameResultCard.querySelector('.result');
        if (this.score.innerText === "100") finalResult.innerText = "You've " + result + " with perfect score!";
        else finalResult.innerText = "You've " + result + "!";

        const finalScore = this.gameResultCard.querySelector('.final-score');
        finalScore.innerHTML = `Score: <span class="game-result"><i class="fas fa-bolt"></i>${this.score.innerText}</span>`;

        const finalTime = this.gameResultCard.querySelector('.final-time');
        console.log(finalTime);
        const timeHours = document.querySelector('.timer.desktop span.hours');
        
        const timeMinutes = document.querySelector('.timer.desktop span.minutes');
        console.log(timeMinutes.innerText);
        const timeSeconds = document.querySelector('.timer.desktop span.seconds');
        finalTime.innerHTML = 'Time: <span class="game-result"><i class="fas fa-clock"></i>' + (timeHours.innerText === "" ? "00:" : timeHours.innerText + ":") + timeMinutes.innerText + ":" + timeSeconds.innerText + "</span>";
        
        if (this.gameMode === "classic") return;

        const submitButton = document.querySelector(".new-game-btn");
        submitButton.setAttribute("type", "submit");

        const scoreSubmit = document.querySelector(".score_submit");
        const timeSubmit = document.querySelector(".time_submit");
        const difficultySubmit = document.querySelector(".difficulty_submit");
        const mistakesSubmit = document.querySelector(".mistakes_counter");
        scoreSubmit.value = this.score.innerText;
        timeSubmit.value = (timeHours.innerText === "" ? "00:" : timeHours.innerText + ":") + timeMinutes.innerText + ":" + timeSeconds.innerText;
        difficultySubmit.value = this.difficulty;
        mistakesSubmit.value = this.mistakesCounter;
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

function saveBoard(board, mode) { 
    localStorage.setItem(mode + "-board", JSON.stringify(board));
}

function saveInitBoard(board, mode) {
    if (localStorage.getItem(mode + "-init-board") !== null) return;
    localStorage.setItem(mode + "-init-board", JSON.stringify(board));
    
}
