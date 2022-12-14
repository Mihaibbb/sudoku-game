const dbRows = document.querySelectorAll(".row");
const dbRowsElement = document.querySelector(".database-rows");
const rows = document.querySelector(".rows");
const searchInput = document.querySelector(".search-box");
const searchElement = document.querySelector(".search");

searchInput.addEventListener("keyup", e => {
    
    const results = getCurrentResults(e.target.value);
    showResults(results);
    
});

const getCurrentResults = (word) => {
    word = word.toLowerCase();
    
    return [...dbRows].filter(row => {
        const rowItems = row.querySelectorAll("li");
        const positionRow = rowItems[0].innerText.toLowerCase();
        const nameRow = rowItems[1].innerText.toLowerCase();
        const usernameRow = rowItems[2].innerText.toLowerCase();
        const scoreRow = rowItems[3].innerText.toLowerCase();

        return positionRow.includes(word) || nameRow.includes(word) || usernameRow.includes(word) || scoreRow.includes(word);
    });
};

const showResults = (currResults) => {
    const htmlResults = currResults.map(currResult => {
        const rowItems = currResult.querySelectorAll("li");
        const positionRow = rowItems[0].innerText;
        const nameRow = rowItems[1].innerText;
        const usernameRow = rowItems[2].innerText;
        const scoreRow = rowItems[3].innerText;
        let darkMode = JSON.parse(localStorage.getItem("darkMode"));
        return `<div class='row ${darkMode === "on" ? "dark" : ""}'>
                    <li class='position-item'>${positionRow}</li>
                    <li>${nameRow}</li>
                    <li>${usernameRow}</li>
                    <li class='score-item'><i class='fas fa-bolt'></i>${scoreRow}</li>   
                </div>
                <hr>`;
    }).join('');

    dbRowsElement.innerHTML = htmlResults;
};


// Dark mode 

const darkModeButton = document.querySelector("nav .dark_mode");

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
    searchElement.classList.add("dark");
    dbRows.forEach(row => row.classList.add("dark"));
};

const lightMode = () => {
    darkModeButton.innerHTML = "<i class='fas fa-moon'></i>";
    document.body.classList.remove("dark");
    searchElement.classList.remove("dark");
    dbRows.forEach(row => row.classList.remove("dark"));
};

// Dark mode local storage

if (JSON.parse(localStorage.getItem("darkMode")) === "on") darkMode();
else if (JSON.parse(localStorage.getItem("darkMode")) === "off") lightMode();

async function checkEndGame() {

    if (localStorage.getItem(gameMode + "-end-game") === null) return;
    let result = JSON.parse(localStorage.getItem(gameMode + "-end-game"));
    console.log(result);
    endGame.classList.add("active");
    
    if (result === "lost") result = "lose";
    else if (result === "won") result = "win";
    endGame.classList.add(result); 
    
}