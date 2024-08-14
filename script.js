let increaseButton = document.getElementById('increase');
let decreaseButton = document.getElementById('decrease');
let redoButton = document.getElementById('redo');
let undoButton = document.getElementById('undo');
let stateVariable = parseInt(document.getElementById('box').textContent);

let history = [stateVariable];  // Array to keep track of history
let historyIndex = 0;  // Current position in the history
let canChange = true;

let progressBar = document.getElementById("myBar");

function updateProgressBar() {
    let percentage = (stateVariable / 150) * 100;
    progressBar.style.width = percentage + "%";
}

function updateState(newValue) {
    stateVariable = newValue;
    document.getElementById('box').textContent = stateVariable;
    updateProgressBar();
}

function allowChange() {
    canChange = true;
}

function pushToHistory() {
    // Trim the history if necessary
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    history.push(stateVariable);
    historyIndex++;
}

increaseButton.addEventListener('click', function() {
    if (stateVariable < 150 && canChange) {
        stateVariable += 1;
        updateState(stateVariable);
        pushToHistory();
        canChange = false; 
        setTimeout(allowChange, 200);  // Reset after 200ms
    }
});

decreaseButton.addEventListener('click', function() {
    if (stateVariable > 0 && canChange) {
        stateVariable -= 1;
        updateState(stateVariable);
        pushToHistory();
        canChange = false; 
        setTimeout(allowChange, 200);  // Reset after 200ms
    }
});

undoButton.addEventListener('click', function() {
    if (historyIndex > 0) {
        historyIndex--
        updateState(history[historyIndex]);
    }
});

redoButton.addEventListener('click', function() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        updateState(history[historyIndex]);
    }
});
