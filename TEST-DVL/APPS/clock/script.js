// App State
let currentSection = 'clock';
let alarms = [];
let stopwatchInterval = null;
let stopwatchTime = 0;
let isStopwatchRunning = false;
let laps = [];

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const section = item.getAttribute('data-section');
        switchSection(section);
    });
});

function switchSection(section) {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(section).classList.add('active');
    
    currentSection = section;
}

// Clock Functions
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Digital time
    const digitalTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('digitalTime').textContent = digitalTime;
    
    // Date
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('dateDisplay').textContent = now.toLocaleDateString('de-DE', options);
    
    // Analog clock
    const secDeg = seconds * 6;
    const minDeg = minutes * 6 + seconds * 0.1;
    const hourDeg = (hours % 12) * 30 + minutes * 0.5;
    
    document.getElementById('secondHand').style.transform = `rotate(${secDeg}deg)`;
    document.getElementById('minuteHand').style.transform = `rotate(${minDeg}deg)`;
    document.getElementById('hourHand').style.transform = `rotate(${hourDeg}deg)`;
    
    // Check alarms
    checkAlarms(hours, minutes);
}

// Alarm Functions
function checkAlarms(currentHour, currentMinute) {
    alarms.forEach(alarm => {
        if (alarm.active && alarm.hour === currentHour && alarm.minute === currentMinute) {
            triggerAlarm(alarm);
        }
    });
}

function triggerAlarm(alarm) {
    alert(`🔔 Wecker: ${alarm.label || 'Weckzeit erreicht!'}\nZeit: ${alarm.hour.toString().padStart(2, '0')}:${alarm.minute.toString().padStart(2, '0')}`);
    
    // Optional: Play sound (requires user interaction first)
    try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmE4Cj2b2+/MeSMFJmzO89udVwoLa77t4qhSFgxIqODyt2QbBjuZ2e/MeSMFJWjJ9N2dUQkKZbfo4K5SEgxQqOPwvWY7BDiS2/LNeSQGJG3O8tiXQQkTYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQGJGrL9Nq1QQkKYbTp66xOEgtG1/LMeSQG');
        audio.play();
    } catch (e) {
        console.log('Audio playback not available');
    }
}

function addAlarm() {
    const timeInput = document.getElementById('alarmTime');
    const labelInput = document.getElementById('alarmLabel');
    
    if (!timeInput.value) {
        alert('Bitte geben Sie eine Weckzeit an!');
        return;
    }
    
    const [hours, minutes] = timeInput.value.split(':').map(Number);
    const newAlarm = {
        id: Date.now(),
        hour: hours,
        minute: minutes,
        label: labelInput.value || `Wecker ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
        active: true
    };
    
    alarms.push(newAlarm);
    renderAlarms();
    
    timeInput.value = '';
    labelInput.value = '';
}

function removeAlarm(id) {
    alarms = alarms.filter(alarm => alarm.id !== id);
    renderAlarms();
}

function toggleAlarm(id) {
    const alarm = alarms.find(alarm => alarm.id === id);
    if (alarm) {
        alarm.active = !alarm.active;
        renderAlarms();
    }
}

function clearAllAlarms() {
    if (confirm('Alle Wecker löschen?')) {
        alarms = [];
        renderAlarms();
    }
}

function renderAlarms() {
    const alarmList = document.getElementById('alarmList');
    alarmList.innerHTML = '';
    
    alarms.forEach(alarm => {
        const alarmItem = document.createElement('div');
        alarmItem.className = 'alarm-item';
        alarmItem.innerHTML = `
            <div>
                <div class="alarm-time">${alarm.hour.toString().padStart(2, '0')}:${alarm.minute.toString().padStart(2, '0')}</div>
                <div class="alarm-label">${alarm.label}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <div class="alarm-toggle ${alarm.active ? 'active' : ''}" onclick="toggleAlarm(${alarm.id})"></div>
                <button onclick="removeAlarm(${alarm.id})" style="background: none; border: none; color: #ff3b30; cursor: pointer; font-size: 18px;">🗑️</button>
            </div>
        `;
        alarmList.appendChild(alarmItem);
    });
}

// Stopwatch Functions
function formatStopwatchTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
}

function updateStopwatchDisplay() {
    document.getElementById('stopwatchDisplay').textContent = formatStopwatchTime(stopwatchTime);
}

function startStopwatch() {
    if (!isStopwatchRunning) {
        const startTime = Date.now() - stopwatchTime;
        stopwatchInterval = setInterval(() => {
            stopwatchTime = Date.now() - startTime;
            updateStopwatchDisplay();
        }, 10);
        
        isStopwatchRunning = true;
        document.getElementById('startStopBtn').textContent = 'Stop';
        document.getElementById('startStopBtn').className = 'stopwatch-btn stop';
        document.getElementById('lapResetBtn').textContent = 'Runde';
    } else {
        clearInterval(stopwatchInterval);
        isStopwatchRunning = false;
        document.getElementById('startStopBtn').textContent = 'Start';
        document.getElementById('startStopBtn').className = 'stopwatch-btn start';
        document.getElementById('lapResetBtn').textContent = 'Reset';
    }
}

function lapReset() {
    if (isStopwatchRunning) {
        // Add lap
        laps.push({
            lap: laps.length + 1,
            time: stopwatchTime
        });
        renderLaps();
    } else {
        // Reset
        stopwatchTime = 0;
        laps = [];
        updateStopwatchDisplay();
        renderLaps();
        document.getElementById('lapResetBtn').textContent = 'Runde';
    }
}

function renderLaps() {
    const lapsContainer = document.getElementById('lapsContainer');
    lapsContainer.innerHTML = '';
    
    laps.slice().reverse().forEach((lap, index) => {
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        
        const lapTime = formatStopwatchTime(lap.time);
        const splitTime = index === laps.length - 1 ? lapTime : formatStopwatchTime(lap.time - laps[laps.length - index - 2].time);
        
        lapItem.innerHTML = `
            <span>Runde ${lap.lap}</span>
            <span>${splitTime}</span>
        `;
        lapsContainer.appendChild(lapItem);
    });
}

// Event Listeners
document.getElementById('addAlarm').addEventListener('click', addAlarm);
document.getElementById('clearAlarms').addEventListener('click', clearAllAlarms);
document.getElementById('startStopBtn').addEventListener('click', startStopwatch);
document.getElementById('lapResetBtn').addEventListener('click', lapReset);

// Initialize
setInterval(updateClock, 1000);
updateClock();
updateStopwatchDisplay();