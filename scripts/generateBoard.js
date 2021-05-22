export default async function getBoard(difficulty) {
    const result = await fetch("http://sugoku.herokuapp.com/board?difficulty=" + difficulty);
    const json = await result.json();
    const board = await json.board;
    console.log(board);
    return board;
}