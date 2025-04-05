function calculateCalories() {
    let totalCalories = 0;
    let dailyCalories = [];

    for (let i = 1; i <= 7; i++) {
        let val = parseFloat(document.getElementById('day' + i).value) || 0;
        dailyCalories.push(val);
        totalCalories += val;
    }

    let caloriesBurned = parseFloat(document.getElementById('caloriesBurned').value) || 0;
    let netCalories = totalCalories - caloriesBurned;

    alert('Your net calories this week: ' + netCalories);

 
    localStorage.setItem('weeklyNetCalories', JSON.stringify(dailyCalories.map(c => Math.round(c))));

    
    let log = JSON.parse(localStorage.getItem('calorieLogs')) || [];
    log.push({ netCalories });
    localStorage.setItem('calorieLogs', JSON.stringify(log));

    renderCalorieLogs(); 
}

function renderCalorieLogs() {
    const logTable = document.getElementById('calorieLogTable');
    logTable.innerHTML = '';
    const log = JSON.parse(localStorage.getItem('calorieLogs')) || [];

    log.forEach((entry, index) => {
        const newRow = logTable.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);

        cell1.innerText = index + 1;
        cell2.innerText = entry.netCalories;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.onclick = () => {
            log.splice(index, 1);
            localStorage.setItem('calorieLogs', JSON.stringify(log));
            renderCalorieLogs();
        };
        cell3.appendChild(deleteButton);
    });
}
window.onload = function () {
    renderCalorieLogs();
};
