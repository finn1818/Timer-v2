const startBtn = document.getElementById('start-btn');
const breakBtn = document.getElementById('break-btn');
const progressBar = document.getElementById('progress-bar');
const timeLabel = document.getElementById('time-label');
const pointsSpan = document.getElementById('points');
const levelSpan = document.getElementById('level');
const coinsSpan = document.getElementById('coins');
const classButtons = document.querySelectorAll('.class-btn');

let timerDuration = 40 * 60; // seconds (40 min)
let timerInterval = null;
let timerRemaining = timerDuration;
let timerRunning = false;

let points = 0;
let level = 1;
let coins = 0;

let selectedClass = null;

classButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    classButtons.forEach(b => b.disabled = false);
    btn.disabled = true;
    selectedClass = btn.dataset.class;
  });
});

startBtn.addEventListener('click', () => {
  if (!selectedClass) {
    alert('Please select a class first!');
    return;
  }
  if (timerRunning) return;
  timerRunning = true;
  startBtn.disabled = true;
  classButtons.forEach(b => b.disabled = true);
  breakBtn.disabled = false;
  timerInterval = setInterval(() => {
    timerRemaining--;
    updateTimerDisplay();
    if (timerRemaining <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      completeSession();
    }
  }, 1000);
});

breakBtn.addEventListener('click', () => {
  if (!timerRunning) return;
  clearInterval(timerInterval);
  timerRunning = false;
  startBtn.disabled = false;
  classButtons.forEach(b => b.disabled = false);
  breakBtn.disabled = true;
  alert('Break taken! Session paused.');
});

function updateTimerDisplay() {
  let minutes = Math.floor(timerRemaining / 60);
  let seconds = timerRemaining % 60;
  timeLabel.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  let percent = (timerRemaining / timerDuration) * 100;
  progressBar.style.width = `${percent}%`;
}

function completeSession() {
  points += 10;
  coins += 5;
  if (points >= level * 50) {
    level++;
    alert('Level Up! You reached level ' + level);
  } else {
    alert('Session Complete! You earned 10 points and 5 coins.');
  }
  pointsSpan.textContent = points;
  levelSpan.textContent = level;
  coinsSpan.textContent = coins;
  timerRemaining = timerDuration;
  updateTimerDisplay();
  startBtn.disabled = false;
  classButtons.forEach(b => b.disabled = false);
  breakBtn.disabled = true;
}
updateTimerDisplay();
breakBtn.disabled = true;