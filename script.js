let timer;
let milliseconds = 0, seconds = 0, minutes = 0, hours = 0;
let isRunning = false;
let logCount = 0;

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTime, 10);
    }
}

function stopTimer() {
    isRunning = false;
    clearInterval(timer);
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("time").innerText = "00:00:00.000";
}

function updateTime() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    
    let formattedTime = 
        (hours < 10 ? "0" : "") + hours + ":" + 
        (minutes < 10 ? "0" : "") + minutes + ":" + 
        (seconds < 10 ? "0" : "") + seconds + "." +
        (milliseconds < 100 ? "0" : "") + (milliseconds < 10 ? "0" : "") + milliseconds;
    
    document.getElementById("time").innerText = formattedTime;
}

function logTime() {
    const time = document.getElementById("time").innerText;
    let times = JSON.parse(localStorage.getItem('timerLogs')) || [];

    times.push(time);
    localStorage.setItem('timerLogs', JSON.stringify(times));
    renderTimerLogs();
}
function renderTimerLogs() {
    let logTableBody = document.getElementById("logTableBody");
    logTableBody.innerHTML = '';
    let times = JSON.parse(localStorage.getItem('timerLogs')) || [];

    times.forEach((t, i) => {
        let newRow = logTableBody.insertRow();
        newRow.insertCell(0).innerText = i + 1;
        newRow.insertCell(1).innerText = t;

        let deleteCell = newRow.insertCell(2);
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.onclick = function () {
            times.splice(i, 1);
            localStorage.setItem('timerLogs', JSON.stringify(times));
            renderTimerLogs();
        };
        deleteCell.appendChild(deleteButton);
    });
}
window.onload = function () {
    renderTimerLogs();
};
