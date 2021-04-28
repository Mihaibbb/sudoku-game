function isValid(board, row, col, number) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] == number || board[i][col] == number || board[m][n] == number) {
          return false;
        }
    }
    return true;
}


function sudokuSolver(curr_board) {

    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            if (curr_board[row][column] == 0) {
                for(let number = 1; number <= 9; number++) {
                    if (isValid(curr_board, row, column, number)) {
                        curr_board[row][column] = number;
                        if (sudokuSolver(curr_board)) {
                            return true;
                        } else {
                            curr_board[row][column] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }

    return true;
}