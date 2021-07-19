const mistakeCtx = document.getElementById("mistake_chart").getContext("2d");
const timeCtx = document.getElementById("time_chart").getContext("2d");


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
    }
});