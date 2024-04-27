import Chart from "chart.js/auto";

const dataList = [];

////////////////////////////////////////////////////////////////////////////////////

const line = document.querySelector("#line");
const tmp = document.querySelector("#tmp");

const labelsList = [];

const myLineChart = new Chart(line, {
    type: "line",
    data: {
        labels: labelsList,
        datasets: [
            {
                label: "label name",
                data: dataList
            }
        ],
    },
    options: {
        animation: false
    }
});

////////////////////////////////////////////////////////////////////////////////////

const pie = document.querySelector("#pie");
const pieDataList = [];

const myPieChart = new Chart(pie, {
    type: "pie",
    data: {
        labels: ["the actual data", "rest", "bla"],
        datasets: [
            {
                label: "pie chart wil be like",
                data: pieDataList,
                backgroundColor: ["tomato", "lemonchiffon", "powderblue"]
            }
        ],
    },
    options: {
        animation: false
    }
});

////////////////////////////////////////////////////////////////////////////////////

const bar = document.querySelector("#bar");
const myBarChart = new Chart(bar, {
    type: "bar",
    data: {
        labels: labelsList,
        datasets: [
            {
                label: "bar would be like...",
                data: dataList,
            },
        ],
    },
    options: {
        animation: false
    }
})


////////////////////////////////////////////////////////////////////////////////////

const socket = new WebSocket("wss://ws.bitmex.com/realtime");
let cnt = 0;

socket.onopen = (e)=>{
    const data = {"op": "subscribe", "args": ["trade"]};
    socket.send(JSON.stringify(data));
};
socket.onmessage = (e)=>{
    const data = JSON.parse(e.data).data[0];
    // console.log(data);
    // console.log(data.price);
    tmp.innerText = data.price;

    if(data.price < 1) return;

    const filterd = data.price % 10;

    dataList.push(filterd);
    if(dataList.length > 20){
        dataList.shift();
    }
    labelsList.push(String(cnt));
    if(labelsList.length > 20){
        labelsList.shift();
    }
    cnt = (cnt +1) % 100;
    // console.log(dataList);

    pieDataList[0] = parseInt(filterd);
    pieDataList[1] = parseInt(filterd%9 + 7);
    pieDataList[2] = parseInt(filterd+3);

    // console.log(pieDataList);


    myLineChart.update();
    myPieChart.update();
    myBarChart.update();
};
socket.onerror = ()=>{
    console.log("err!");
};