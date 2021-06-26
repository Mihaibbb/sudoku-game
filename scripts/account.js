//const difficultyMatches = document.getElementById("difficulty").getContext('2d');
const scoreMatches = document.getElementById("score").getContext("2d");

// Improvements section
const scoreImprovement = document.getElementById("score_improvement").getContext("2d");
const mistakesImprovement = document.getElementById("mistakes_improvement").getContext("2d");
const timeImprovement = document.getElementById("time_improvement").getContext("2d");

const easyMatches = document.querySelector(".easy_matches").innerText;
const mediumMatches = document.querySelector(".medium_matches").innerText;
const hardMatches = document.querySelector(".hard_matches").innerText;

const easyScore = document.querySelector(".easy_score").innerText;
const mediumScore = document.querySelector(".medium_score").innerText;
const hardScore = document.querySelector(".hard_score").innerText; 

const totalScores = document.querySelector(".score_array").innerText.trim();
const allScores = totalScores.split(" ");
const totalMistakes = document.querySelector(".mistakes_matches").innerText.trim();
const allMistakes = totalMistakes.split(" ");
const totalTime = document.querySelector(".times_array").innerText.trim();
const allTime = totalTime.split(" ");

// Improvement percentage variables
const lastScore = Number(allScores[allScores.length - 1]);
let allScoresSum = 0;
allScores.forEach(score => {
    allScoresSum += Number(score);
    
});
const firstScore = allScoresSum / allScores.length;

const lastNumOfMistakes = Number(allMistakes[allMistakes.length - 1]);
let allMistakesSum = 0;

allMistakes.forEach(mistake => allMistakesSum += Number(mistake));
const firstNumOfMistakes = allMistakesSum / allMistakes.length;

const lastTime = Number(allTime[allTime.length - 1]);
let allTimeSum = 0;
allTime.forEach(time => allTimeSum += Number(time));
const firstTime = allTimeSum / allTime.length;


// Improvements percentage


const scoreImpPercent = Math.round((((lastScore - firstScore) * 100) / firstScore) * 100) / 100;
const mistakesImpPercent = Math.round((((lastNumOfMistakes - firstNumOfMistakes) * 100) / firstNumOfMistakes) * 100) / 100;
const timeImpPercent = Math.round((((lastTime - firstTime) * 100) / firstTime) * 100) / 100;

// Show improvement messages

const scoreImpTextContent = document.querySelector(".score_imp");
const mistakesImpTextContent = document.querySelector(".mistakes_imp");
const timeImpTextContent = document.querySelector(".time_imp");

if (scoreImpPercent > 0) {
    scoreImpTextContent.innerText = `+${scoreImpPercent}%`;
    scoreImpTextContent.classList.add("progress");
} 
else if (scoreImpPercent === 0) {
    scoreImpTextContent.innerText = `${scoreImpPercent}%`;
    scoreImpTextContent.classList.add("stagnate");
}
else {
    scoreImpTextContent.innerText = `${scoreImpPercent}%`;
    scoreImpTextContent.classList.add("regress");
}

if (mistakesImpPercent < 0) {
    mistakesImpTextContent.innerText = `${mistakesImpPercent}%`;
    mistakesImpTextContent.classList.add("progress");
} else if (mistakesImpPercent === 0) {
    mistakesImpTextContent.innerText = `${mistakesImpPercent}%`;
    mistakesImpTextContent.classList.add("stagnate");
}
else {
    mistakesImpTextContent.innerText = `+${mistakesImpPercent}%`;
    mistakesImpTextContent.classList.add("regress");
}

if (timeImpPercent < 0) {
    timeImpTextContent.innerText = `${timeImpPercent}%`;
    timeImpTextContent.classList.add("progress");
} else if (timeImpPercent === 0) {
    timeImpTextContent.innerText = `${timeImpPercent}%`;
    timeImpTextContent.classList.add("stagnate");
}
else {
    timeImpTextContent.innerText = `+${timeImpPercent}%`;
    timeImpTextContent.classList.add("regress");
}

const difficultyData = {
    labels: [
        "Easy",
        "Medium",
        "Hard"
    ],

    datasets: [{
        data: [easyMatches, mediumMatches, hardMatches],
        backgroundColor: [
            "rgb(0,112,254)",
            "rgb(34,121,139)",
            "rgb(1,32,72)"
        ],
        hoverOffset: 3
    }]
};


const difficultyConfig = {
    type: 'doughnut',
    data: difficultyData,
    options: {

        plugins: {

            legend: {
                display: true,
                position: "right",
                align: "start",
                labels: {
                    font: {
                        size: 20,
                        
                    },
                    color: "rgb(1,87,155)",
                },
            }

        },

        layout: {
            padding: {
                right: 10
            }
        },

        responsive: true,
    }
};

const scoreData = {
    labels: [
        "Easy",
        "Medium",
        "Hard"
    ],

    datasets: [{
        data: [easyScore, mediumScore, hardScore],
        backgroundColor: [
            "rgb(132,218,236)",
            "rgb(0,169,201)",
            "rgb(19,61,130)"
        ],
        hoverOffset: 3
    }]
};


const scoreConfig = {
    type: 'doughnut',
    data: scoreData,
    options: {

        plugins: {

            legend: {
                display: true,
                position: "right",
                align: "start",
                labels: {
                    font: {
                        size: 20,
                        
                    },
                    color: "rgb(1,87,155)",
                },

               
            }

        },

        layout: {
            padding: {
                right: 60
            }
        },

        responsive: true,
    }
};

const totalMatches = allScores.length;
let matches = [];

for (let i = 1; i <= totalMatches; i++) 
    matches.push(i);


console.log(matches);

const scoreImpData = {
    labels: matches,

    datasets: [{
        label: "Score Improvements",
        data: allScores,
        fill: true,
        borderColor: "rgb(77,155,229)",
        backgroundColor: "rgba(77,155,229, .9)",
        pointBorderColor: "rgb(77,155,229)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 3,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "rgba(255, 255, 255, .8)",
        pointHoverBorderColor: "rgb(77,155,229)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 15,
        responsive: true
    }],
};

const mistakesImpData = {
    labels: matches,

    datasets: [{
        label: "Mistakes Improvements",
        data: allMistakes,
        fill: true,
        borderColor: "rgb(255,89,70)",
        backgroundColor: "rgba(255,89,70, .9)",
        pointBorderColor: "rgb(255,89,70)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 3,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "rgba(255, 255, 255, .8)",
        pointHoverBorderColor: "rgb(255,89,70)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 15,
        responsive: true
    }],
};

const mistakesImpConfig = {
    type: 'line',
    data: mistakesImpData,
    options: {
        plugins: {
            legend: false
        }
    }
};

const timeImpData = {
    labels: matches,

    datasets: [{
        
        data: allTime,
        fill: true,
        borderColor: "rgb(64,227,148)",
        backgroundColor: "rgba(64,227,148, .9)",
        pointBorderColor: "rgb(64,227,148)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 3,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "rgba(255, 255, 255, .8)",
        pointHoverBorderColor: "rgb(64,227,148)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 15,
        responsive: true

    }]
};



const scoreImpConfig = {
    type: "line",
    data: scoreImpData,
    options: {
        
        plugins: {
            
            legend: false
        }
    },

};

const timeImpConfig = {
    type: 'line',
    data: timeImpData,
    options: {
        plugins: {
            legend: false
        }
    }
};

//const difficultyChart = new Chart(difficultyMatches, difficultyConfig);
const scoreChart = new Chart(scoreMatches, scoreConfig);
const scoreImprovementChart = new Chart(scoreImprovement, scoreImpConfig);
const mistakesImprovementChart = new Chart(mistakesImprovement, mistakesImpConfig);
const timeImprovementChart = new Chart(timeImprovement, timeImpConfig);


// Dark Mode

// Dark mode 

const darkModeButton = document.querySelector("nav .dark_mode");
const titles = document.querySelectorAll(".container h2");
const details = document.querySelectorAll(".container .detail");
const graphicsTitle = document.querySelector(".graphics_title");

const darkMode = () => {
    darkModeButton.innerHTML = "<i class='fas fa-sun'></i>";
    document.body.classList.add("dark");
    titles.forEach(title => title.classList.add("dark"));
    details.forEach(detail => detail.classList.add("dark"));
    graphicsTitle.classList.add("dark");
};

const lightMode = () => {
    darkModeButton.innerHTML = "<i class='fas fa-moon'></i>";
    document.body.classList.remove("dark");
    titles.forEach(title => title.classList.remove("dark"));
    details.forEach(detail => detail.classList.remove("dark"));
    graphicsTitle.classList.remove("dark");
};


if (localStorage.getItem("darkMode") !== null) {
    if (JSON.parse(localStorage.getItem("darkMode")) === "on") darkMode();
    else if (JSON.parse(localStorage.getItem("darkMode")) === "off") lightMode();
}

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