// import { Chart } from "chart.js/auto";

const MAX_CNT_DATA = 10;
const LABELS = new Array(MAX_CNT_DATA); // Empty label arr for x-axis without any value
LABELS.fill("", 0);
const dataArr = [[], [], []];
let myChart = null;

const createAll = ()=>{
    console.log("motion created");

    const ctx = document.querySelector('#motion canvas');   
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: LABELS,
            datasets: [ 
                { label: "ACCX", data: dataArr },
                { label: "ACCY", data: dataArr },
                { label: "ACCZ", data: dataArr },
            ],
        },
        options: {
            animation : false,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


const updateChart = (data)=>{
    console.log("motion updated");
    if(data.ACCX && data.ACCY){
        dataArr[0].push(data["ACCX"]);
        dataArr[1].push(data["ACCY"]);
        dataArr[2].push(data["ACCZ"]);

        for(let i=0; i<dataArr.length; ++i){
            if(dataArr[i].length > MAX_CNT_DATA){
                dataArr[i].shift();
            }
        }

        console.table("motion dataArr", dataArr);

        for(let i=0; i<dataArr.length; ++i){
            myChart.data.datasets[i].data = dataArr[i];
        }

        myChart.update();
    }
}

export default {createAll, updateChart};