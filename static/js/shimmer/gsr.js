// import { Chart } from "chart.js/auto";

const MAX_CNT_DATA = 10;
const LABELS = new Array(MAX_CNT_DATA); // Empty label arr for x-axis without any value
LABELS.fill("", 0);
const dataArr = [];
let myChart = null;

const createAll = ()=>{
    console.log("gsr created");

    const canvas = document.querySelector("#gsr canvas");
    myChart = new Chart(canvas, {
        type: "line",
        data: {
            labels: LABELS,
            datasets: [ { label: "GSR", data: dataArr } ],
        },
        options: {
            maintainAspectRatio: false,
            animation: false,
        },
    });
};


const updateChart = (data)=>{
    console.log("gsr updated", data["GSR_ohm"]);
    dataArr.push(data["GSR_ohm"]);
    if(dataArr.length > MAX_CNT_DATA){
        dataArr.shift();
    }

    // console.log(dataArr);
    // console.log(myChart.data.datasets);

    myChart.data.datasets[0].data = dataArr;

    myChart.update();
}

export default {createAll, updateChart};
