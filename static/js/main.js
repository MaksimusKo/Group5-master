import bandpower from "./epocX/bandpower.js";
import performanceMetric from "./epocX/performanceMetric.js";
import motion from "./epocX/motion.js";
import ppg from "./shimmer/ppg.js";
import gsr from "./shimmer/gsr.js";


////////////////////////////////////////////////////////////
// execute corresponding functions to the URL path
////////////////////////////////////////////////////////////
const currentUrl = window.location.href;
const splitBySlash = currentUrl.split("/");
const chosenPath = splitBySlash[splitBySlash.length -1];

console.log("chosenPath : ", chosenPath);

const WEBSOCKET_URL = "ws://localhost:8000/ws";
const socket = new WebSocket(WEBSOCKET_URL);

if (chosenPath === "") {
    console.log("home");

} else if (chosenPath === "epocX") {
    console.log("epocX");

    bandpower.createAll();
    performanceMetric.createAll();
    motion.createAll();

    socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data)
        bandpower.updateChart(data);
        performanceMetric.updateChart(data);
        motion.updateChart(data);
    };
} else if (chosenPath === "shimmer") {
    console.log("shimmer");

    gsr.createAll();
    ppg.createAll();

    socket.onmessage = (e) => {
        // for the actual data
        // const data = JSON.parse(e.data);

        // dummy data for test
        const data = {
            "PPG_mv": Math.random(),
            "GSR_ohm": Math.random(),
        };

        // run update functions
        gsr.updateChart(data);
        ppg.updateChart(data);
    };
} else {
}