async function getBoard() {
    const result = await fetch("http://sugoku.herokuapp.com/board?difficulty=easy");
    return result.json();
}
let boardApi = [];

const function1 = (board) => {
    document.addEventListener("DOMContentLoaded", async () => {
    

        try {
             board = await getBoard();
    
        } catch (e) {
            console.log(e);
        }
        
        console.log(board.board);
    });
    
    return board.board;
}

boardApi = function1(boardApi);

console.log(boardApi);