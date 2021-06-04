const dbRows = document.querySelectorAll(".row");
const dbRowsElement = document.querySelector(".database-rows");
const rows = document.querySelector(".rows");
const searchInput = document.querySelector(".search-box");

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