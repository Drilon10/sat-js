function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = formatTime(hours);
    minutes = formatTime(minutes);
    seconds = formatTime(seconds);

    
    document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();

function formatTime(value) {
    return value < 10 ? '0' + value : value;
}

let timer = null;
let timeLeft = 0;

const timeInput =  document.getElementById('timeInput');
const timerDisplay =  document.getElementById('timerDisplay');
const startBtn =  document.getElementById('startBtn');
const stopBtn =  document.getElementById('stopBtn');
const resetBtn =  document.getElementById('resetBtn');

startBtn.addEventListener('click', () => {
    if(timeLeft === 0) {
        timeLeft = Number(timeInput.value); // 30 sekonda
    }

    if (timeLeft <= 0) return;

    startBtn.disabled = true;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = formatTime(timeLeft);

        if(timeLeft === 0) {
            clearInterval(timer);
            startBtn.disabled = false;
        }

    }, 1000)
});


stopBtn.addEventListener('click', () => {
    clearInterval(timer);

    startBtn.disabled = false;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = 0;
    timerDisplay.innerText = '00';
    timeInput.value = '';
    startBtn.disabled = false;
})