// import Chart  from "../../../frontend/node_modules/chart.js/auto/auto.js";

const MAX_CNT_SENSORS = 2;  // change this number to regulate the maximum number of sensors can be selected
let selectedSensors = ["af3"];  // initial data src
let myChart = null;

////////////////////////////////////////////////////////////////////////////////
// selecting sensors to display on chart
////////////////////////////////////////////////////////////////////////////////
const updateSelectedSensors = (e)=>{
    const beforeNumOfSensors = selectedSensors.length;
    const checkboxes = document.querySelectorAll(`#bandpower #select-sensors input[type=checkbox]`);
    const newSelectedSensors = [];

    checkboxes.forEach((checkbox)=>{
        if(checkbox.checked)
            newSelectedSensors.push(checkbox.value);
    });
    selectedSensors = newSelectedSensors;

    if(selectedSensors.length >= MAX_CNT_SENSORS){
        checkboxes.forEach((checkbox)=>{
            if(!checkbox.checked)
                checkbox.disabled = true;
        });
    }else if(beforeNumOfSensors>= MAX_CNT_SENSORS && selectedSensors.length < MAX_CNT_SENSORS){
        checkboxes.forEach((checkbox)=>{
            checkbox.disabled = false;
        });
    }

    console.log("selectedSensors", selectedSensors);
};
const attachEventListeners = ()=>{
    const checkboxes = document.querySelectorAll("#bandpower #select-sensors input[type=checkbox]");
    checkboxes.forEach((checkbox)=>{
        checkbox.addEventListener('change', updateSelectedSensors);
    });
};

const createChart = ()=>{
    console.log("bandpower created");

    const canvas = document.querySelector("#bandpower canvas");
    myChart = new Chart(canvas, {
        type: "bar",
        data: {
            labels: ["alpha", "beta Low", "beta High", "theta", "gamma"],
            datasets: [ { label: "AF3", data: [] } ],
        },
        options: {
            maintainAspectRatio: false,
            animation: false,
            scales: {
                y: { max: 50 },
            }
        },
    });
};

const createAll = ()=>{
    attachEventListeners();
    createChart();
};


const updateChart = (data) => {
    // console.table(data);
    if (data.af3 && data.f7) {
        const newDataSet = [];
        selectedSensors.forEach((sensor) => {
            newDataSet.push({
                label: sensor,
                data: data[sensor],
            });
        });


        myChart.data.datasets = newDataSet;

        // console.log(selectedSensors)
        // console.log(newDataSet)

        myChart.update();
    }
}



export default {createAll, updateChart};