// import { Chart } from "chart.js/auto";

const MAX_CNT_DATA = 10;
const LABELS = new Array(MAX_CNT_DATA); // Empty label arr for x-axis without any value
LABELS.fill("", 0);
const dataArr = [];
let myChart = null;

const createAll = ()=>{
    console.log("ppg created");

    const canvas = document.querySelector("#ppg canvas");
    myChart = new Chart(canvas, {
        type: "line",
        data: {
            labels: LABELS,
            datasets: [ { label: "PPG", data: dataArr } ],
        },
        options: {
            maintainAspectRatio: false,
            animation: false,
        },
    });
}


const updateChart = (data)=>{
    console.log("ppg updated", data["PPG_mv"]);
    dataArr.push(data["PPG_mv"]);
    if(dataArr.length > MAX_CNT_DATA){
        dataArr.shift();
    }

    // console.log(dataArr);
    // console.log(myChart.data.datasets);

    myChart.data.datasets[0].data = dataArr;

    myChart.update();
}

export default {createAll, updateChart};