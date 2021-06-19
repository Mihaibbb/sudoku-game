const difficultyMatches = document.getElementById("difficulty").getContext('2d');
const scoreMatches = document.getElementById("score").getContext("2d");

const easyMatches = document.querySelector(".easy_matches").innerText;
const mediumMatches = document.querySelector(".medium_matches").innerText;
const hardMatches = document.querySelector(".hard_matches").innerText;

const difficultyData = {
    labels: [
        "Easy",
        "Medium",
        "Hard"
    ],

    datasets: [{
        data: [easyMatches, mediumMatches, hardMatches],
        backgroundColor: [
            "rgb(132,218,236)",
            "rgb(0,169,201)",
            "rgb(19,61,130)"
        ],
        hoverOffset: 3
    }]
};

const scoreData = {
    labels: [
        "Easy",
        "Medium",
        "Hard"
    ],

    datasets: [{
        data: [132, 56, 205],
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
                right: 10
            }
        },

        responsive: true,
    }
};


const difficultyChart = new Chart(difficultyMatches, difficultyConfig);
const scoreChart = new Chart(scoreMatches, scoreConfig)
