// Load workout data from localStorage or initialize empty logs for each day
let workoutLogsByDay = JSON.parse(localStorage.getItem('workoutLogsByDay')) || {
    day1: [], day2: [], day3: [], day4: [],
    day5: [], day6: [], day7: []
};

// Function to log a new workout
function logWorkout() {
    const workoutName = document.getElementById('workoutName').value;
    const exerciseType = document.getElementById('exerciseType').value;
    const hours = document.getElementById('hours').value || 0;
    const minutes = document.getElementById('minutes').value || 0;
    const weight = document.getElementById('weight').value || 0;
    const weightUnit = document.getElementById('weightUnit').value;
    const workoutDay = document.getElementById('workoutDay').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;

    const totalDuration = (parseInt(hours) * 60) + parseInt(minutes);

    const newWorkout = {
        workoutName,
        exerciseType,
        duration: totalDuration,
        weight,
        weightUnit,
        workoutDay,
        sets,
        reps
    };

    workoutLogsByDay[workoutDay].push(newWorkout);
    localStorage.setItem('workoutLogsByDay', JSON.stringify(workoutLogsByDay));

    displayWorkouts();
    document.getElementById('workout-form').reset();

    let emoji = {
        strength: "🏋️‍♀️",
        endurance: "🏃‍♂️",
        balance: "🧘",
        flexibility: "🤸",
        other: "✨"
    };
    showToast(`${emoji[exerciseType] || "💪"} ${workoutName} logged for ${workoutDay.toUpperCase()}`);
    
}

// Function to display all logged workouts by day
function displayWorkouts() {
    const workoutContainer = document.getElementById('workoutContainer');
    workoutContainer.innerHTML = ''; 

   
    for (let day = 1; day <= 7; day++) {
        const dayKey = `day${day}`;
        const dayWorkouts = workoutLogsByDay[dayKey];

        if (dayWorkouts.length > 0) {
            // Create a table for this day
            const dayTable = document.createElement('table');
            dayTable.className = 'table table-striped mt-4';
            
            // Create table header
            const tableHeader = document.createElement('thead');
            tableHeader.innerHTML = `
                <tr>
                    <th>#</th>
                    <th>Workout Name</th>
                    <th>Exercise Type</th>
                    <th>Duration</th>
                    <th>Weight</th>
                    <th>Sets</th>
                    <th>Reps</th>
                    <th>Actions</th>
                </tr>
            `;
            dayTable.appendChild(tableHeader);
            
            const tableBody = document.createElement('tbody');

            dayWorkouts.forEach((workout, index) => {
                const hours = Math.floor(workout.duration / 60);
                const minutes = workout.duration % 60;
                
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${workout.workoutName}</td>
                    <td>${workout.exerciseType}</td>
                    <td>${hours} hours ${minutes} minutes</td>
                    <td>${workout.weight} ${workout.weightUnit}</td>
                    <td>${workout.sets}</td>
                    <td>${workout.reps}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editWorkout(${index}, '${dayKey}')">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteWorkout(${index}, '${dayKey}')">Delete</button>
                    </td>
                `;
            });

            dayTable.appendChild(tableBody);

            const dayHeader = document.createElement('h3');
            dayHeader.innerText = `Workout Day ${day}`;
            workoutContainer.appendChild(dayHeader);
            workoutContainer.appendChild(dayTable);
        }
    }
}
// Function to edit a workout entry
function editWorkout(index, dayKey) {
    const workout = workoutLogsByDay[dayKey][index];
    if (workout) {
        document.getElementById('workoutName').value = workout.workoutName;
        document.getElementById('exerciseType').value = workout.exerciseType;
        document.getElementById('hours').value = Math.floor(workout.duration / 60);
        document.getElementById('minutes').value = workout.duration % 60;
        document.getElementById('weight').value = workout.weight;
        document.getElementById('workoutDay').value = dayKey;
        document.getElementById('sets').value = workout.sets;
        document.getElementById('reps').value = workout.reps;

        deleteWorkout(index, dayKey);
        showToast("✏️ Loaded workout into editor.");
    }
}

// Function to delete a workout entry
function deleteWorkout(index, dayKey) {
    workoutLogsByDay[dayKey].splice(index, 1);
    displayWorkouts();
    showToast("🗑️ Workout deleted.");
}
// Load saved data and display workouts on page load
window.onload = function () {
    const savedData = localStorage.getItem('workoutLogsByDay');
    if (savedData) {
        try {
            workoutLogsByDay = JSON.parse(savedData);
        } catch (e) {
            console.error("Error parsing saved workout data:", e);
            workoutLogsByDay = {
                day1: [], day2: [], day3: [], day4: [],
                day5: [], day6: [], day7: []
            };
        }
    }
    displayWorkouts();
};

