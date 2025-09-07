// Simple Timer App - Modern, well-aligned, with push notification support (no alarm)

const h = document.getElementById("hours");
const min = document.getElementById("minutes");
const sec = document.getElementById("seconds");
const display = document.getElementById("display");

let timerInterval = null;
let remainingSeconds = 0;

// Request notification permission on page load
if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
}

// Show a notification
function showNotification(title, body) {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, { body });
    }
}

// Format seconds to HH:MM:SS
function formatTime(totalSeconds) {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}

// Start Timer
function startTimer() {
    const hours = parseInt(h.value, 10) || 0;
    const minutes = parseInt(min.value, 10) || 0;
    const seconds = parseInt(sec.value, 10) || 0;
    remainingSeconds = hours * 3600 + minutes * 60 + seconds;

    if (remainingSeconds <= 0) {
        display.innerText = "Set a time to start!";
        return;
    }

    stopTimer(); // Clear any running timer

    display.innerText = formatTime(remainingSeconds);

    timerInterval = setInterval(() => {
        remainingSeconds--;
        display.innerText = formatTime(remainingSeconds);

        if (remainingSeconds <= 0) {
            stopTimer();
            display.innerText = "Time's up!";
            showNotification("Minuteur", "C'est fini!");
        }
    }, 1000);
}

// Stop Timer
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    display.innerText = formatTime(remainingSeconds);
}

// Reset everything
function clearAll() {
    stopTimer();
    h.value = "0";
    min.value = "0";
    sec.value = "0";
    display.innerText = "00:00:00";
    remainingSeconds = 0;
}

// Event listeners
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("clear").addEventListener("click", clearAll);

// Initialize display
display.innerText = "00:00:00";