

import getBoard from './generateBoard.js';
export default function generateBoard() {
    document.addEventListener("DOMContentLoaded", () - )
    let response = [];

    getBoard().fetch(res => {
        response = res;
    })
    console.log(response);
    return response;
}
