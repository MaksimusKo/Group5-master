// import { Chart } from "chart.js/auto";

let myChart = null;
let dataArr = [0, 0, 0, 0, 0, 0, 0];

const createAll = ()=>{
    console.log("performanceMetric created");

    const ctx = document.querySelector('#performanceMetric canvas'); 
    myChart = new Chart(ctx, {
        type: 'radar',
        data: {
        labels: ['ENG', 'EXC', 'LEX', 'STR', 'REL', 'INT', 'FOC'],
        datasets: [{
            label: 'Performance Metric',
            data: dataArr,
            borderWidth: 5
        }]},
        options: {
            maintainAspectRatio: false,
            scales: {
                r: {
                    max: 1.0,
                    min: 0,
                }
            }
        }
    });
}

const updateChart = (data)=>{
    if (typeof data.eng === 'number' && !isNaN(data.eng)) {
        myChart.data.datasets[0].data[0] = data.eng;
        myChart.data.datasets[0].data[1] = data.exc;
        myChart.data.datasets[0].data[2] = data.lex;
        myChart.data.datasets[0].data[3] = data.str123;
        myChart.data.datasets[0].data[4] = data.rel;
        myChart.data.datasets[0].data[5] = data.int;
        myChart.data.datasets[0].data[6] = data.foc;
        myChart.update();
    }
}

export default {createAll, updateChart};