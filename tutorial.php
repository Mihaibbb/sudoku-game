<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tutorial Sudoku</title>
    <?php require_once "./sections/fonts.php"; ?>
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/tutorial.css">
</head>
<body>
    <?php require_once "./sections/header.php"; ?>

    <div class="tutorial_title">
        <h1>Sudoku tutorial</h1>
    </div>

    <div class="init">
        <div class="item">

            <div class="item-title">
                <h2>What is sudoku?</h2>
            </div>

            <div class="item-content">
                <p>
                Sudoku is a logic-based combinatorial number-placement puzzle.<br> 
                <strong>In classic sudoku</strong>, the objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid contains all of the digits from 1 to 9.<br>
                <strong>In competitive sudoku</strong>, the objective is to finish the game as fast as possible and make as few mistakes as possible, if you make a good score you might get in the leaderboard leaders.<br>
                <strong>In reverse sudoku</strong>, this is a creative one, where you need to give computer a valid combination of sudoku and it will resolve it for you.<br>
                This game is normally played on paper with a pen/pencil, but this is a sudoku online game.
                </p>
            </div>

        </div>

        <div class="item">

            <div class="item-title">
                <h2>Why is sudoku online better</h2>
            </div>

            <div class="item-content">
                <p>
                In the early days of the Sudoku craze, Sudoku used to be played with pen and paper. Commuters played Sudoku on newspapers on their laps, or in paper Sudoku books with dozens or hundreds of pages of puzzles.<br>
                However, with the rise of digital technology, as mobile phones got smarter and became capable of hosting mobile apps, Sudoku is now able to be played online or from smartphone apps, without any pencil or paper required. While some people surely miss the old ways of playing on paper, for the most part it’s much easier, more fun and just better overall to play Sudoku online.
                </p>
                
            </div>

        </div>
    </div>

    <div class="items">

        <div class="item-title">
            <h2>How to play?</h2>
        </div>

        <div class="item">
            
            <div class="item-content play">
                <div class="text">
                    <p>
                        Sudoku is a logic-based combinatorial number-placement puzzle.<br>
                        In classic sudoku, the objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid contains all of the digits from 1 to 9.<br>
                        In competitive sudoku, the objective is to finish the game as fast as possible and make as few mistakes as possible, if you make a good score you might get in the leaderboard leaders.<br>
                        In reverse sudoku, this is a creative one, where you need to give computer a valid combination of sudoku and it will resolve it for you.<br>
                    </p>
                </div>

                <div class="image">
                    <img src="./img/board.jpeg" alt="board image">
                </div>
            </div>

            <div class="title-content">
                <h2>Select a cell</h2>
            </div>

            <div class="item-content play">
                <div class="text">
                    <p>In every mode you play, to select a cell to put a number in it, you need to click on the specific cell.</p>
                    <p>To add a number in the highlighted cell you have 2 methods:</p>
                        <div class="tabbed">1. Select a number from the keyboard from 1 to 9.</div><br>
                        <div class="tabbed">2. Select a number from the number grid next to the board.</div><br>

                        <div class="image">
                            <img src="./img/numbers_grid.jpeg" alt="">
                        </div>
                    <p>When the number is put in the cell, you can check if the number fit in (not appear twice on the same row or column or square), by cell changing its color, if the cell fit in, then the cell will have the blue color, else the cell will have the red color (in this case, the other failed cell will have the red background to demonstrate why the current board is not valid).</p>
                </div>

                <div class="image">
                    <img src="./img/highlighted_board.jpeg" alt="highlight board image">
                </div>
            </div>

            <div class="title-content">
                <h2>Score button</h2>
            </div>

            <div class="image content">
                <img src="./img/score_highlighted.jpeg" alt="">
            </div>
            
            <div class="item-content play">
                <div class="text">
                    <p>In classic and competitive mode you have a score button, so that you can know at what level and in what range you are (of points). The mechanics that the score is working is simple.<br> On the right side, you can see a scheme of how score is working.<br><br> In every new match, it is initially 100, but it's dropping in 2 ways: </p>
                        <div class="tabbed">1. For every mistake of putting wrong number in a cell, the score is dropping with 3 points.</div><br>
                        <div class="image">
                            <img src="./img/mistake_board.jpeg" alt="board image">
                        </div>
                        <div class="tabbed">2. In every minute of the timer (after the minute 5), the score is dropping with one point.</div><br>
                   
                </div>

                <div class="image">
                   
                </div>
            </div>

            <div class="title-content">
                <h2>Hint button</h2>
            </div>

            <div class="image content">
                <img src="./img/hint_highlighted.jpeg" alt="">
            </div>

            <div class="item-content play">

                <div class="text">
                    <p>In classic mode, you have a hint button, that might help you when you are stuck. You have 3 hints available in every match. This works very simple. The algorithm is solving the whole board and the game is returning you the correct number that must be in the highlighted cell.</p>
                    
                </div>

                <div class="image">
                    <video src="./img/hint.mp4" alt="hinted board video" width="600" height="600" autoplay loop></video>
                </div>
            </div>

            <div class="title-content">
                <h2>Undo button</h2>
            </div>

            <div class="image content">
                <img src="./img/undo_highlighted.jpeg" alt="">
            </div>

            <div class="item-content play">

                <div class="text">
                    <p>In classic and competitive mode, you have an undo button. That might help you and make your gameplay easier. The name is telling everything about it. If you made a mistake and you want your old board, you press the undo button and you get it, but it is skipping the hinted cells (which are always correct).</p>
                    
                </div>

                
            </div>

            <div class="title-content">
                <h2>Erase button</h2>
            </div>

            <div class="image content">
                <img src="./img/erase_highlighted.jpeg" alt="">
            </div>

            <div class="item-content play">

                <div class="text">
                    <p>In every mode, you have an erase button, which works only if a cell is highlighted and is erasing the number from the highlighted cell.</p>
                    <p>To erase a number in the highlighted cell you have 2 methods: </p>
                    <div class="tabbed">
                        1. Press the "BackSpace" key on your keyboard
                    </div>

                    <div class="image">
                        <img src="./img/backspace_button.jpg" alt="backspace button on keyboard">
                    </div>

                    <div class="tabbed">
                        2. Press on the erase button from the commands that are next to the board.
                    </div>

                </div>

                <div class="image">
                    <video src="./img/erase.mp4" width="600" height=auto autoplay loop></video>
                </div>

                
            </div>

            <div class="title-content">
                <h2>New Game button</h2>
            </div>

            <div class="image content">
                <img src="./img/new_game_button.jpeg" alt="new game button">
            </div>

            <div class="item-content play">

                <div class="text">
                    <p>If you finished the game, you want to restart the current board or you want to generate a new board, you can press the new game button and a menu will appear to you like the one below:  </p>
                    
                    

                    <div class="image">
                        <img src="./img/new_game_menu.jpeg" alt="backspace button on keyboard">
                    </div>

                </div>

                <div class="image">
                    <video src="./img/new_game_video.mp4" width="700" height=auto autoplay loop></video>
                </div>
     
            </div>

        </div>
    </div>
    

</body>
</html>