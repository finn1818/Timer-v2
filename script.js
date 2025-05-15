
let timer = 900;
let interval;
const timerDisplay = document.getElementById("timer-display");
const progressFill = document.getElementById("progress-fill");

function startTimer() {
    interval = setInterval(() => {
        timer--;
        updateDisplay();
        if (timer === 0) {
            clearInterval(interval);
            alert("Time's up!");
        } else if (timer === 600) {
            let stay = confirm("15 minutes left. Stay for full points?");
            if (!stay) {
                alert("You chose half points.");
                clearInterval(interval);
            }
        }
    }, 1000);
}

function updateDisplay() {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    timerDisplay.textContent = \`\${minutes}:\${seconds.toString().padStart(2, '0')}\`;
    progressFill.style.width = \`\${(900 - timer) / 900 * 100}%\`;
}

document.querySelectorAll('.class-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        timer = 900;
        updateDisplay();
        clearInterval(interval);
        startTimer();
    });
});
