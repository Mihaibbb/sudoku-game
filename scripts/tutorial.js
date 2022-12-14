const mistakeCtx = document.getElementById("mistake_chart").getContext("2d");
const timeCtx = document.getElementById("time_chart").getContext("2d");

const mistakeCanvas = document.querySelector(".ok");
const timeCanvas = document.getElementById("time_chart");

if (window.innerWidth <= 1250) {
    mistakeCanvas.style.width = (window.innerWidth - 30) + 'px';
        mistakeCanvas.style.height = mistakeCanvas.style.width;
        timeCanvas.style.width = (window.innerWidth - 30) + 'px';
        timeCanvas.style.height = timeCanvas.style.width;
}

window.addEventListener("resize", () => {
    
    if (window.innerWidth > 1250) return;

        mistakeCanvas.style.width = (window.innerWidth - 30) + 'px';
        mistakeCanvas.style.height = mistakeCanvas.style.width;
        timeCanvas.style.width = (window.innerWidth - 30) + 'px';
        timeCanvas.style.height = timeCanvas.style.width;
    
            mistakeCanvas.style.width = (window.innerWidth - 30) + 'px';
            mistakeCanvas.style.height = mistakeCanvas.style.width;
            timeCanvas.style.width = (window.innerWidth - 30) + 'px';
            timeCanvas.style.height = timeCanvas.style.width;
    
});


const mistakeLabels = [];
const mistakeData = [];

const timeLabels = ["0", "5"];
const timeData = [100];

for (let i = 10; i <= 105; i+=10) {
    timeLabels.push(i.toString());
}

timeLabels.push("105");

for (let i = 100; i >= 0; i-=10) {
    if (i === 90) i += 5;
    timeData.push(i.toString())
} 

timeData.push("0");

for (let i = 0; i < 35; i++)
    mistakeLabels.push(i.toString());

for (let i = 100; i >= 0; i -= 3)
    mistakeData.push(i.toString());

mistakeData.push(0);

const mistakeChart = new Chart(mistakeCtx, {
    type: 'line',
    data: {
        labels: mistakeLabels,

        datasets: [{
            label: "How does the mistakes affect the score",
            data: mistakeData,
            fill: true,
            backgroundColor: "rgba(255, 60, 38, .85)",
            borderColor: "rgb(255, 60, 38)"
        }]
    }
});

const timeChart = new Chart(timeCtx, {
    type: 'line',
    data: {
        labels: timeLabels,

        datasets: [{
            label: "How does the time affects the score",
            data: timeData,
            fill: true,
            backgroundColor: "rgb(58,226,145, .85)",
            borderColor: "rgb(58,226,145)",
            
        }]
    },
    
    options: {
        responsive: true
    }
});

// Dark mode 

const darkModeButton = document.querySelector("nav .dark_mode");
const itemTitles = document.querySelectorAll(".item-title");
const titleContents = document.querySelectorAll(".title-content h2");
const textContents = document.querySelectorAll(".item p");
const tabbed = document.querySelectorAll(".tabbed");


darkModeButton.addEventListener("click", () => {

    const darkModeIcon = darkModeButton.querySelector("i");
    if (darkModeIcon.classList.contains("fa-moon")) {
        darkMode();      
        localStorage.setItem("darkMode", JSON.stringify("on"));     
    }

    if (darkModeIcon.classList.contains("fa-sun")) {
        lightMode();    
        localStorage.setItem("darkMode", JSON.stringify("off"));
    }
});

const darkMode = () => {
    darkModeButton.innerHTML = "<i class='fas fa-sun'></i>";
    document.body.classList.add("dark");
    itemTitles.forEach(itemTitle => itemTitle.classList.add("dark"));
    titleContents.forEach(titleContent => titleContent.classList.add("dark"));
    textContents.forEach(textContent => textContent.classList.add("dark"));
    tabbed.forEach(tab => tab.classList.add("dark"));
};

const lightMode = () => {
    darkModeButton.innerHTML = "<i class='fas fa-moon'></i>";
    document.body.classList.remove("dark");
    itemTitles.forEach(itemTitle => itemTitle.classList.remove("dark"));
    titleContents.forEach(titleContent => titleContent.classList.remove("dark"));
    textContents.forEach(textContent => textContent.classList.remove("dark"));
    tabbed.forEach(tab => tab.classList.remove("dark"));
};

// Dark mode local storage

if (JSON.parse(localStorage.getItem("darkMode")) === "on") darkMode();
else if (JSON.parse(localStorage.getItem("darkMode")) === "off") lightMode();


// Change language

const language = document.querySelector('img.language');
language.addEventListener('click', () => {
    
    if (language.src.toString().includes('ro')) {
        language.src = language.src.toString().replace("ro", "en");
        changeLangToRo();
    } else {
        language.src = language.src.toString().replace("en", "ro");
        changeLangToEn();
    }
    
});

const sudokuGameItem = document.querySelector('.sudoku_game_item a');
const tipsAndTricksItem = document.querySelector('.tips_and_tricks_item a');
const loginItem = document.querySelector('.log_in_item a');
const signupItem = document.querySelector('.sign_up_item a');
const logoutItem = document.querySelector('.log_out_item a');
const accountItem = document.querySelector('.account_item a');

const container = document.querySelector('.container');

const changeLangToEn = () => {

    sudokuGameItem.innerText = 'Sudoku Game';
    tipsAndTricksItem.innerText = 'Sudoku Tips & Tricks';
    if (loginItem !== null) {
        loginItem.innerText = 'Log In';
    }

    if (signupItem !== null) {
        signupItem.innerText = 'Sign Up';
    }

    if (logoutItem !== null) {
        logoutItem.innerText = 'Log out';
    }

    if (accountItem !== null) {
        accountItem.innerText = 'Account';
    }

    container.innerHTML = `
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
            <h2>Why is sudoku online better?</h2>
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
        
        <div class="item-content play def">
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

            <div class="charts">
            <canvas id="mistake_chart" class="ok"></canvas>
            <canvas id="time_chart"></canvas>
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

        <div class="item-title">
                    <h2>Game Modes</h2>
                </div>

                <div class="image content">
                    
                </div>

                <div class="item-content play gap">

                    <div class="text">
                        <p>If you are getting bored by playing the same game mode, you have other options.<br> <b>The game modes are</b>: Classic, Competitive, Reverse and Beginner(in beta).</p>
                        
                        

                        

                    </div>

                    <div class="image">
                        <img class="not-shadow" src="./img/game_modes.jpeg" alt="new game mode button">
                    </div>
        
                </div>

                <div class="title-content">
                    <a href="./beginner"><h2>Beginner Mode</h2></a>
                </div>

               

                <div class="item-content play">

                    <div class="text">
                        <p><b>Beginner mode</b> is made for the absolute beginners.So far it's similar to classic mode, only that it gives you a lot more help.<br>
                        In every mode, if you put an incorrect value because there's the same number in the same row, column or square, then it will tell you because it's an obvious mistake.
                        The big advantage in the begginer mode is that even if you put a valid value, but not the correct number, will show you a question mark in the right-top corner, which makes the games easiser for most beginners.<br>
                        For now it's in beta, because is not fully completed.<br>
                        Test it right now <a href="./beginner">here</a>. </p>
                        

                    </div>

                    
        
                </div>


    </div>
</div>

    `;

    const mistakeCtx = document.getElementById("mistake_chart").getContext("2d");
    const timeCtx = document.getElementById("time_chart").getContext("2d");

    const mistakeCanvas = document.querySelector(".ok");
    const timeCanvas = document.getElementById("time_chart");

    if (window.innerWidth <= 1250) {
        mistakeCanvas.style.width = (window.innerWidth - 30) + 'px';
            mistakeCanvas.style.height = mistakeCanvas.style.width;
            timeCanvas.style.width = (window.innerWidth - 30) + 'px';
            timeCanvas.style.height = timeCanvas.style.width;
    }

    window.addEventListener("resize", () => {
        
        if (window.innerWidth > 1250) return;

            mistakeCanvas.style.width = (window.innerWidth - 30) + 'px';
            mistakeCanvas.style.height = mistakeCanvas.style.width;
            timeCanvas.style.width = (window.innerWidth - 30) + 'px';
            timeCanvas.style.height = timeCanvas.style.width;
        
                mistakeCanvas.style.width = (window.innerWidth - 30) + 'px';
                mistakeCanvas.style.height = mistakeCanvas.style.width;
                timeCanvas.style.width = (window.innerWidth - 30) + 'px';
                timeCanvas.style.height = timeCanvas.style.width;
        
    });


    const mistakeLabels = [];
    const mistakeData = [];

    const timeLabels = ["0", "5"];
    const timeData = [100];

    for (let i = 10; i <= 105; i+=10) {
        timeLabels.push(i.toString());
    }

    timeLabels.push("105");

    for (let i = 100; i >= 0; i-=10) {
        if (i === 90) i += 5;
        timeData.push(i.toString())
    } 

    timeData.push("0");

    for (let i = 0; i < 35; i++)
        mistakeLabels.push(i.toString());

    for (let i = 100; i >= 0; i -= 3)
        mistakeData.push(i.toString());

    mistakeData.push(0);

    const mistakeChart = new Chart(mistakeCtx, {
        type: 'line',
        data: {
            labels: mistakeLabels,

            datasets: [{
                label: "How does the mistakes affect the score",
                data: mistakeData,
                fill: true,
                backgroundColor: "rgba(255, 60, 38, .85)",
                borderColor: "rgb(255, 60, 38)"
            }]
        }
    });

    const timeChart = new Chart(timeCtx, {
        type: 'line',
        data: {
            labels: timeLabels,

            datasets: [{
                label: "How does the time affects the score",
                data: timeData,
                fill: true,
                backgroundColor: "rgb(58,226,145, .85)",
                borderColor: "rgb(58,226,145)",
                
            }]
        },
        
        options: {
            responsive: true
        }
    });

   
}

const changeLangToRo = () => {

    sudokuGameItem.innerText = 'Jocul Sudoku';
    tipsAndTricksItem.innerText = 'Sfaturi și trucuri Sudoku';
    if (loginItem !== null) {
        loginItem.innerText = 'Logheaza-te';
    }

    if (signupItem !== null) {
        signupItem.innerText = 'Inscrie-te';
    }

    if (logoutItem !== null) {
        logoutItem.innerText = 'Delogheaza-te';
    }

    if (accountItem !== null) {
        accountItem.innerText = 'Contul Meu';
    }

    container.innerHTML = `
    <div class="init">

        <div class="item">

            <div class="item-title">
                <h2>Ce este sudoku?</h2>
            </div>

            <div class="item-content">
                <p>
                Sudoku este un joc combinatorial bazat pe logica.<br> 
                <strong>În modul clasic sudoku</strong>, obiectivul este de a umple o matrice de 9x9 cifre, astfel încât fiecare coloană, fiecare rând și fiecare dintre cele nouă submatrice de 3×3 care compun matricea conține toate cifrele de la 1 la 9.<br>
                <strong>În modul competitiv sudoku</strong>, obiectivul este de a termina jocul cât mai repede posibil și de a face cât mai puține greșeli posibil, dacă faceți un scor bun s-ar putea obține în liderii clasamentului.<br>
                <strong>În modul invers sudoku</strong>,  acesta este unul creativ, unde trebuie să oferiți computerului o combinație validă de sudoku și o va rezolva pentru tine.<br>
                Acest joc este în mod normal, jucat pe hârtie cu un stilou / creion pe hartie, dar acesta este un joc online sudoku.
                </p>
            </div>

        </div>

        <div class="item">

            <div class="item-title">
                <h2>De ce este sudoku online mai bun?</h2>
            </div>

            <div class="item-content">
                <p>
                La inceputul aparitiei jocului, Sudoku a fost conceput pentru a fi jucat cu un creion și o hârtie. Navetiștii au jucat Sudoku pe ziare în ture sau în cărți sudoku de hârtie cu zeci sau sute de pagini de puzzle-uri.<br>
                Cu toate acestea, odată cu apariția tehnologiei digitale, pe măsură ce telefoanele mobile au devenit mai inteligente și au devenit capabile să găzduiască aplicații mobile, Sudoku poate fi acum jucat online sau din aplicații pentru smartphone, fără a fi nevoie de creion sau hârtie. În timp ce unii oameni doresc cu siguranță moduri vechi de a juca pe hârtie. Pentru cea mai mare parte este mult mai ușor și mai distractiv pentru a juca Sudoku online.
                </p>
                
            </div>

        </div>
    </div>

    <div class="items">

        <div class="item-title">
            <h2>Cum se joacă?</h2>
        </div>

        <div class="item">
            
            <div class="item-content play def">
                <div class="text">
                    <p>
                    Sudoku este un puzzle combinatorial bazat pe logică.
                    În sudoku clasic, obiectivul este de a umple o grilă 9×9 cu cifre, astfel încât fiecare coloană, fiecare rând, și fiecare dintre cele nouă subgrile 3×3 care compun grila conține toate cifrele de la 1 la 9.
                    În sudoku competitiv, obiectivul este de a termina jocul cât mai repede posibil și de a face cât mai puține greșeli posibil, dacă faceți un scor bun s-ar putea obține în liderii clasamentului.
                    În sudoku inversă, aceasta este una creativă, în cazul în care aveți nevoie pentru a da calculator o combinație valabilă de sudoku și se va rezolva pentru tine.                </p>
                </div>

                <div class="image">
                    <img src="./img/board.jpeg" alt="board image">
                </div>
            </div>

            <div class="title-content">
                <h2>Selectarea unei celule</h2>
            </div>

            <div class="item-content play">
                <div class="text">
                    <p>În fiecare mod pe care îl redați, pentru a selecta o celulă pentru a pune un număr în ea, trebuie să faceți clic pe celula specifică.</p>
                    <p>Pentru a adăuga un număr în celula evidențiată aveți 2 metode:</p>
                        <div class="tabbed">1. Selectați un număr de la tastatură de la 1 la 9.</div><br>
                        <div class="tabbed">2. Selectați un număr din tabela numerica din dreapta tablei de joc.</div><br>

                        <div class="image">
                            <img src="./img/numbers_grid.jpeg" alt="">
                        </div>
                    <p>Când numărul este pus în celulă, puteți verifica dacă numărul se potrivește (nu apare de două sau mai multe ori pe același rând, coloană sau pătrat), prin schimbarea culorii celulei, dacă celula se potrivește, atunci celula va avea culoarea albastră, altfel celula va avea culoarea roșie (în acest caz , cealaltă celulă nereușită va avea fundalul roșu pentru a demonstra de ce placa curentă nu este validă).</p>
                </div>

                <div class="image">
                    <img src="./img/highlighted_board.jpeg" alt="highlight board image">
                </div>
            </div>

            <div class="title-content">
                <h2>Butonul de scor</h2>
            </div>

            <div class="image content">
                <img src="./img/score_highlighted.jpeg" alt="">
            </div>
            
            <div class="item-content play">
                <div class="text">
                    <p>În modul clasic și competitiv aveți un buton de scor, astfel încât să puteți ști la ce nivel și în ce interval sunteți (de puncte). Mecanica că scorul este de lucru este simplu.
                    În partea dreaptă, puteți vedea o schemă a modului în care funcționează scorul.
                    În fiecare meci nou, este inițial 100, dar scade în 2
                    moduri:</p>
                        <div class="tabbed">1. Pentru fiecare greșeală de a pune un număr greșit într-o celulă, scorul scade cu 3 puncte.</div><br>
                        <div class="image">
                            <img src="./img/mistake_board.jpeg" alt="board image">
                        </div>
                        <div class="tabbed">2. În fiecare minut al cronometrului (după minutul 5), scorul scade cu un punct.</div><br>
                
                </div>

                <div class="charts">
                <canvas id="mistake_chart" class="ok"></canvas>
                <canvas id="time_chart"></canvas>
                </div>
            </div>

            <div class="title-content">
                <h2>Butonul de sugestie</h2>
            </div>

            <div class="image content">
                <img src="./img/hint_highlighted.jpeg" alt="">
            </div>

            <div class="item-content play">

                <div class="text">
                    <p>În modul clasic, aveți un buton de sugestie, care vă poate ajuta atunci când sunteți blocat. Ai 3 indicii disponibile în fiecare meci. Acest lucru funcționează foarte simplu. Algoritmul este rezolvarea bord întreg și jocul este returnarea vă numărul corect, care trebuie să fie în celula evidențiată.</p>
                    
                </div>

                <div class="image">
                    <video src="./img/hint.mp4" alt="hinted board video" width="600" height="600" autoplay loop></video>
                </div>
            </div>

            <div class="title-content">
                <h2>Butonul de anulare</h2>
            </div>

            <div class="image content">
                <img src="./img/undo_highlighted.jpeg" alt="">
            </div>

            <div class="item-content play">

                <div class="text">
                    <p>În modul clasic și competitiv, aveți un buton de anulare. Asta te-ar putea ajuta și să-ți ușurezi gameplay-ul. Numele spune totul despre asta. Dacă ați făcut o greșeală și doriți vechea placă, apăsați butonul anulare și o obțineți, dar sare peste celulele sugerate (care sunt întotdeauna corecte).</p>
                    
                </div>

                
            </div>

            <div class="title-content">
                <h2>Butonul de stergere</h2>
            </div>

            <div class="image content">
                <img src="./img/erase_highlighted.jpeg" alt="">
            </div>

            <div class="item-content play">

                <div class="text">
                    <p>În fiecare mod, aveți un buton de ștergere, care funcționează numai dacă o celulă este evidențiată și șterge numărul din celula evidențiată.</p>
                    <p>Pentru a șterge un număr din celula evidențiată aveți 2 metode: </p>
                    <div class="tabbed">
                        1. Apăsați tasta "BackSpace" de pe tastatură
                    </div>

                    <div class="image">
                        <img src="./img/backspace_button.jpg" alt="backspace button on keyboard">
                    </div>

                    <div class="tabbed">     
                        2. Apăsați pe butonul de ștergere din comenzile care se află lângă placă.
                    </div>

                </div>

                <div class="image">
                    <video src="./img/erase.mp4" width="600" height=auto autoplay loop></video>
                </div>

                
            </div>

            <div class="title-content">
                <h2>Butonul de joc nou</h2>
            </div>

            <div class="image content">
                <img src="./img/new_game_button.jpeg" alt="new game button">
            </div>

            <div class="item-content play">

                <div class="text">
                    <p>Dacă ați terminat jocul, doriți să reporniți tabla curentă sau doriți să generați o nouă tablă, puteți apăsa noul buton al jocului și vă va apărea un meniu ca cel de mai jos:   </p>
                    
                    

                    <div class="image">
                        <img src="./img/new_game_menu.jpeg" alt="backspace button on keyboard">
                    </div>

                </div>

                <div class="image">
                    <video src="./img/new_game_video.mp4" width="700" height=auto autoplay loop></video>
                </div>

            </div>

            <div class="item-title">
                    <h2>Moduri de joc</h2>
                </div>

                <div class="image content">
                    
                </div>

                <div class="item-content play gap">

                    <div class="text">
                        <p>Dacă vă plictisiți jucând același mod de joc, aveți alte opțiuni.<br>
                        <b>Modurile de joc sunt</b>: Clasic, Competitiv, Invers și Începător (în versiune beta).
                        
                        </p>
                        
                        

                        

                    </div>

                    <div class="image">
                        <img class="not-shadow" src="./img/game_modes.jpeg" alt="new game mode button">
                    </div>
        
                </div>

                <div class="title-content">
                    <a href="./beginner"><h2>Modul începător</h2></a>
                </div>

               

                <div class="item-content play">

                    <div class="text">
                        <p><b>Modul începător</b> ste făcut pentru începătorii absoluți. Până în prezent, este similar cu modul clasic, doar că vă oferă mult mai mult ajutor.<br>
                        În fiecare mod, dacă puneți o valoare incorectă, deoarece există același număr în același rând, coloană sau pătrat, atunci vă va spune pentru că este o greșeală evidentă. Marele avantaj în modul begginer este că, chiar dacă puneți o valoare validă, dar nu numărul corect, vă va arăta un semn de întrebare în colțul din dreapta sus, ceea ce face ca jocurile să fie mai potrivite pentru majoritatea începătorilor.<br>
                        Pentru moment acest mod de joc este în versiune beta, pentru că nu este complet finalizat.<br>
                        Testați-l chiar acum aici. <a href="./beginner">here</a>. </p>
                        

                    </div>

                    
        
                </div>


        </div>
    </div>
    `;

    const mistakeCtx = document.getElementById("mistake_chart").getContext("2d");
    const timeCtx = document.getElementById("time_chart").getContext("2d");

    const mistakeCanvas = document.querySelector(".ok");
    const timeCanvas = document.getElementById("time_chart");

    if (window.innerWidth <= 1250) {
        mistakeCanvas.style.width = (window.innerWidth - 30) + 'px';
            mistakeCanvas.style.height = mistakeCanvas.style.width;
            timeCanvas.style.width = (window.innerWidth - 30) + 'px';
            timeCanvas.style.height = timeCanvas.style.width;
    }

    window.addEventListener("resize", () => {
        
        if (window.innerWidth > 1250) return;

            mistakeCanvas.style.width = (window.innerWidth - 30) + 'px';
            mistakeCanvas.style.height = mistakeCanvas.style.width;
            timeCanvas.style.width = (window.innerWidth - 30) + 'px';
            timeCanvas.style.height = timeCanvas.style.width;
        
            mistakeCanvas.style.width = (window.innerWidth - 30) + 'px';
            mistakeCanvas.style.height = mistakeCanvas.style.width;
            timeCanvas.style.width = (window.innerWidth - 30) + 'px';
            timeCanvas.style.height = timeCanvas.style.width;
        
    });


    const mistakeLabels = [];
    const mistakeData = [];

    const timeLabels = ["0", "5"];
    const timeData = [100];

    for (let i = 10; i <= 105; i+=10) {
        timeLabels.push(i.toString());
    }

    timeLabels.push("105");

    for (let i = 100; i >= 0; i-=10) {
        if (i === 90) i += 5;
        timeData.push(i.toString())
    } 

    timeData.push("0");

    for (let i = 0; i < 35; i++)
        mistakeLabels.push(i.toString());

    for (let i = 100; i >= 0; i -= 3)
        mistakeData.push(i.toString());

    mistakeData.push(0);

    const mistakeChart = new Chart(mistakeCtx, {
        type: 'line',
        data: {
            labels: mistakeLabels,

            datasets: [{
                label: "How does the mistakes affect the score",
                data: mistakeData,
                fill: true,
                backgroundColor: "rgba(255, 60, 38, .85)",
                borderColor: "rgb(255, 60, 38)"
            }]
        }
    });

    const timeChart = new Chart(timeCtx, {
        type: 'line',
        data: {
            labels: timeLabels,

            datasets: [{
                label: "How does the time affects the score",
                data: timeData,
                fill: true,
                backgroundColor: "rgb(58,226,145, .85)",
                borderColor: "rgb(58,226,145)",
                
            }]
        },
        
        options: {
            responsive: true
        }
    });
}