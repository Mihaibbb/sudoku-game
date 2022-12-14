

let counter = 0;

const checkGrid = (grid) => {
    for (let row = 0; row < 9; row++)
        for (let column = 0; column < 9; column++)
            if (grid[row][column] === 0) return false;

    return true;
};  

const solveGrid = (grid) => {
    let column, row;
    for (let i = 0; i < 81; i++) {
        row = Math.floor(i / 9);
        column = i % 9;

        if (grid[row][column] == 0) {
            for (let value = 1; value < 10; value++) {
                const valueInGrid = grid[row].some(colValue => colValue === value);
                if (!valueInGrid) {
                    if (value !== grid[0][column] && 
                        value !== grid[1][column] &&
                        value !== grid[2][column] && 
                        value !== grid[3][column] && 
                        value !== grid[4][column] && 
                        value !== grid[5][column] && 
                        value !== grid[6][column] &&
                        value !== grid[7][column] &&
                        value !== grid[8][column]
                    ) {
                        let square = [];

                        if (row < 3) {
                        
                            for (let i = 0; i < 3; i++) {
                                if (column < 3) {
                                    square.push([grid[i][0], grid[i][1], grid[i][2]]);
                                } else if (column < 6) {
                                    square.push([grid[i][3], grid[i][4], grid[i][5]]);
                                } else {
                                    square.push([grid[i][6], grid[i][7], grid[i][8]]);
                                }
                            }
                          
                        } else if (row < 6) {
                            for (let i = 3; i < 6; i++) {
                                if (column < 3) {
                                    square.push([grid[i][0], grid[i][1], grid[i][2]]);
                                } else if (column < 6) {
                                    square.push([grid[i][3], grid[i][4], grid[i][5]]);
                                } else {
                                    square.push([grid[i][6], grid[i][7], grid[i][8]]);
                                }
                            }
                        } else {
                            for (let i = 6; i < 9; i++) {
                                if (column < 3) {
                                    square.push([grid[i][0], grid[i][1], grid[i][2]]);
                                } else if (column < 6) {
                                    square.push([grid[i][3], grid[i][4], grid[i][5]]);
                                } else {
                                    square.push([grid[i][6], grid[i][7], grid[i][8]]);
                                }
                            }
                        }

                        const squareConcat = [...square[0], ...square[1], ...square[2]];
                        const inSquare = squareConcat.some(val => val === value);
                        if (!inSquare) {
                            grid[row][column] = value;
                            if (checkGrid(grid)) {
                                counter++;
                                break;
                            } else {
                                if (solveGrid(grid)) return true;
                            }
                        }
                    }
                }
            }

            break;
        }
    }

    grid[row][column] = 0;
}; 

let numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const fillGrid = (grid) => {
    let column, row;
    for (let i = 0; i < 81; i++) {
        row = Math.floor(i / 9);
        column = i % 9;
        if (grid[row][column] == 0) {
            const shuffled = numberList.sort(() => Math.random() - 0.5);
            for (let idx = 0; idx < shuffled.length; idx++) {
                const value = shuffled[idx];

                const valueInGrid = grid[row].some(colValue => colValue === value);
                if (!valueInGrid) {
                    if (value !== grid[0][column] && 
                        value !== grid[1][column] &&
                        value !== grid[2][column] && 
                        value !== grid[3][column] && 
                        value !== grid[4][column] && 
                        value !== grid[5][column] && 
                        value !== grid[6][column] &&
                        value !== grid[7][column] &&
                        value !== grid[8][column]
                    ) {
                        let square = [];

                        if (row < 3) {
                        
                            for (let i = 0; i < 3; i++) {
                                if (column < 3) {
                                    square.push([grid[i][0], grid[i][1], grid[i][2]]);
                                } else if (column < 6) {
                                    square.push([grid[i][3], grid[i][4], grid[i][5]]);
                                } else {
                                    square.push([grid[i][6], grid[i][7], grid[i][8]]);
                                }
                            }
                          
                        } else if (row < 6) {
                            for (let i = 3; i < 6; i++) {
                                if (column < 3) {
                                    square.push([grid[i][0], grid[i][1], grid[i][2]]);
                                } else if (column < 6) {
                                    square.push([grid[i][3], grid[i][4], grid[i][5]]);
                                } else {
                                    square.push([grid[i][6], grid[i][7], grid[i][8]]);
                                }
                            }
                        } else {
                            for (let i = 6; i < 9; i++) {
                                if (column < 3) {
                                    square.push([grid[i][0], grid[i][1], grid[i][2]]);
                                } else if (column < 6) {
                                    square.push([grid[i][3], grid[i][4], grid[i][5]]);
                                } else {
                                    square.push([grid[i][6], grid[i][7], grid[i][8]]);
                                }
                            }
                        }

                        const squareConcat = [...square[0], ...square[1], ...square[2]];
                        console.log(squareConcat);
                        const inSquare = squareConcat.some(val => val === value);
                        if (!inSquare) {
                            grid[row][column] = value;
                            if (checkGrid(grid)) return true;
                            else if (fillGrid(grid)) return true;
                            
                        }
                    }
                }
            }

            break;
        }
    }

    grid[row][column] = 0;
};



const generateBoard = (difficulty) => {

    const grid = []
    grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        
    fillGrid(grid);
    console.log(difficulty)
    let attempts = difficulty === "hard" ? 8 : difficulty === "medium" ? 5 : 3;
    counter = 1;

    while (attempts > 0) {
        let row = randomInt(0, 8);
        let column = randomInt(0, 8);

        while (grid[row][column] === 0) {
            row = randomInt(0, 8);
            column = randomInt(0, 8);
        }

        let backup = grid[row][column];
        grid[row][column] = 0;
        let copyGrid = [];
        for (let cpyRow = 0; cpyRow < 9; cpyRow++) {
            copyGrid.push([]);
            for (let cpyCol = 0; cpyCol < 9; cpyCol++) {
                copyGrid[cpyRow].push(grid[cpyRow][cpyCol]);
            }
        }

        counter = 0;
        solveGrid(grid);

        if (counter != 1) {
            grid[row][column]=backup
            attempts--;
        }
    }

    console.log(grid);
    return grid;

};

const randomInt = (a, b) => {
    return Math.floor(Math.random() * (b - a + 1)) + a;
};


export default generateBoard;