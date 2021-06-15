const dbRows = document.querySelectorAll(".row");
const dbRowsElement = document.querySelector(".database-rows");
const rows = document.querySelector(".rows");
const searchInput = document.querySelector(".search-box");
const searchElement = document.querySelector(".search");

searchInput.addEventListener("keydown", e => {
    dbRowsElement.classList.add("hide");
    checkMatchRow(searchInput.value)
});

const checkMatchRow = string => {
    console.log(string)
    dbRows.forEach(dbRow => {
        let match = false;
        const rowElements = dbRow.querySelectorAll("li");
        rowElements.forEach(rowElement => {
            if (rowElement.innerText.includes(string)) match = true;
            console.log(match)
        });

        if (match) {
            const cloneChild = dbRow.cloneNode(true);
            rows.appendChild(cloneChild);
        } else {
            const rowElement = document.querySelectorAll('.row');
            if (rowElement === undefined) return;

            rowElement.forEach(row => {
                if (row === dbRow) {
                    row.remove();
                };
            });

            
        }
    });
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