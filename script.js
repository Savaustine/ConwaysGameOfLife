// JavaScript for UI interactions
const rows = 20; // Rows
const cols = 40; // Columns
let initialGridData = createEmptyGrid(rows, cols); // Store the initial state of the grid
let gridData = createEmptyGrid(rows, cols); // Initialize with an empty grid
let isRunning = false;
let intervalId = null;
let speed = 1000; // Initial speed in milliseconds
let generationCount = 0; // Track the generation count

// Function to create an empty grid
function createEmptyGrid(rows, cols) {
    return new Array(rows).fill(null).map(() => new Array(cols).fill(0));
}

// Function to update the grid display
function updateGrid() {
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell' + (gridData[i][j] ? ' live' : '');
            cell.addEventListener('click', () => toggleCell(i, j)); // Add click event to toggle cell state
            gridContainer.appendChild(cell);
        }
    }
}

// Function to clear the grid
function clearGrid() {
    gridData = createEmptyGrid(rows, cols);
    updateGrid();
    stopSimulation();
    generationCount = 0; // Reset generation count
    updateGenerationLabel();
}

// Function to toggle cell state (live/dead)
function toggleCell(x, y) {
    gridData[x][y] = gridData[x][y] ? 0 : 1;
    updateGrid();
}

// Function to start the simulation
function startSimulation() {
    if (!isRunning) {
        isRunning = true;
        gridData = createEmptyGrid(rows, cols); // Reset the grid to the initial state
        updateGrid(); // Update the UI with the initial state
        intervalId = setInterval(sendDataToBackend, speed); // Use the 'speed' variable
    }
}

// Function to stop the simulation or resume it
function toggleSimulation() {
    const stopButton = document.getElementById('stopButton');
    if (isRunning) {
        stopSimulation();
        stopButton.textContent = 'Resume';
    } else {
        startSimulation();
        stopButton.textContent = 'Stop';
    }
}

// Function to stop the simulation
function stopSimulation() {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
    }
}

// Function to send data to the backend using Fetch API
function sendDataToBackend() {
    fetch('/api/update_grid', { // Updated URL here
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gridData),
    })
    .then(response => response.json())
    .then(updatedData => {
        gridData = updatedData; // Update grid data with data from the backend
        updateGrid(); // Update the UI to reflect the new grid data
        generationCount++; // Increment generation count
        updateGenerationLabel();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to increase or decrease the speed
function changeSpeed() {
    if (speed === 1000) { // If it's normal speed, make it faster
        speed = 100;
        document.getElementById('speedButton').textContent = 'Speed: Fast';
    } else { // If it's fast, make it normal speed
        speed = 1000;
        document.getElementById('speedButton').textContent = 'Speed: Normal';
    }
    if (isRunning) { // If the game is running, adjust the interval
        stopSimulation();
        startSimulation();
    }
}

// Function to update the generation label
function updateGenerationLabel() {
    document.getElementById('generationLabel').textContent = `Generation: ${generationCount}`;
}

// Add event listeners for buttons
document.getElementById('startButton').addEventListener('click', startSimulation);
document.getElementById('stopButton').addEventListener('click', toggleSimulation); // Toggle between stop and resume
document.getElementById('clearButton').addEventListener('click', clearGrid);
document.getElementById('speedButton').addEventListener('click', changeSpeed); // Add click event for speed button
document.getElementById('generationStatus').addEventListener('click', () => alert(`Generation: ${generationCount}`)); // Show generation count

// Initial grid rendering
updateGrid();



























// // JavaScript for UI interactions
// const rows = 20; // Replace with your desired number of rows
// const cols = 40; // Replace with your desired number of columns
// let initialGridData = createEmptyGrid(rows, cols); // Store the initial state of the grid
// let gridData = createEmptyGrid(rows, cols); // Initialize with an empty grid
// let isRunning = false;
// let intervalId = null;
// let speed = 1000; // Initial speed in milliseconds
// let generationCount = 0; // Track the generation count

// // Function to create an empty grid
// function createEmptyGrid(rows, cols) {
//     return new Array(rows).fill(null).map(() => new Array(cols).fill(0));
// }

// // Function to update the grid display
// function updateGrid() {
//     const gridContainer = document.getElementById('gridContainer');
//     gridContainer.innerHTML = '';

//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//             const cell = document.createElement('div');
//             cell.className = 'cell' + (gridData[i][j] ? ' live' : '');
//             cell.addEventListener('click', () => toggleCell(i, j)); // Add click event to toggle cell state
//             gridContainer.appendChild(cell);
//         }
//     }
// }

// // Function to clear the grid
// function clearGrid() {
//     gridData = createEmptyGrid(rows, cols);
//     updateGrid();
//     stopSimulation();
//     generationCount = 0; // Reset generation count
//     updateGenerationLabel();
// }

// // Function to toggle cell state (live/dead)
// function toggleCell(x, y) {
//     gridData[x][y] = gridData[x][y] ? 0 : 1;
//     updateGrid();
// }

// // Function to start the simulation
// function startSimulation() {
//     if (!isRunning) {
//         isRunning = true;
//         gridData = createEmptyGrid(rows, cols); // Reset the grid to the initial state
//         updateGrid(); // Update the UI with the initial state
//         intervalId = setInterval(sendDataToBackend, speed); // Use the 'speed' variable
//     }
// }

// // Function to stop the simulation or resume it
// function toggleSimulation() {
//     const stopButton = document.getElementById('stopButton');
//     if (isRunning) {
//         stopSimulation();
//         stopButton.textContent = 'Resume';
//     } else {
//         startSimulation();
//         stopButton.textContent = 'Stop';
//     }
// }

// // Function to stop the simulation
// function stopSimulation() {
//     if (isRunning) {
//         isRunning = false;
//         clearInterval(intervalId);
//     }
// }

// // Function to send data to the backend using Fetch API
// function sendDataToBackend() {
//     fetch('/api/update_grid', { // Updated URL here
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(gridData),
//     })
//     .then(response => response.json())
//     .then(updatedData => {
//         gridData = updatedData; // Update grid data with data from the backend
//         updateGrid(); // Update the UI to reflect the new grid data
//         generationCount++; // Increment generation count
//         updateGenerationLabel();
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

// // Function to increase or decrease the speed
// function changeSpeed() {
//     if (speed === 1000) { // If it's normal speed, make it faster
//         speed = 100;
//         document.getElementById('speedButton').textContent = 'Speed: Fast';
//     } else { // If it's fast, make it normal speed
//         speed = 1000;
//         document.getElementById('speedButton').textContent = 'Speed: Normal';
//     }
//     if (isRunning) { // If the game is running, adjust the interval
//         stopSimulation();
//         startSimulation();
//     }
// }

// // Function to update the generation label
// function updateGenerationLabel() {
//     document.getElementById('generationLabel').textContent = `Generation: ${generationCount}`;
// }

// // Add event listeners for buttons
// document.getElementById('startButton').addEventListener('click', startSimulation);
// document.getElementById('stopButton').addEventListener('click', toggleSimulation); // Toggle between stop and resume
// document.getElementById('clearButton').addEventListener('click', clearGrid);
// document.getElementById('speedButton').addEventListener('click', changeSpeed); // Add click event for speed button
// document.getElementById('generationStatus').addEventListener('click', () => alert(`Generation: ${generationCount}`)); // Show generation count

// // Initial grid rendering
// updateGrid();
