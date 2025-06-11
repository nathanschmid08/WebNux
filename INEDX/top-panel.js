// CLOCK
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock').textContent = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

// BATTERY
navigator.getBattery().then(battery => {
    function updateBattery() {
        document.getElementById("battery").textContent = `${Math.round(battery.level * 100)}%`;
    }
    updateBattery();
    battery.addEventListener("levelchange", updateBattery);
});

// NETWORK
function updateNetworkStatus(online) {
    document.getElementById('network').textContent = online ? "📶" : "🚫";
}

window.addEventListener('online', () => updateNetworkStatus(true));
window.addEventListener('offline', () => updateNetworkStatus(false));
updateNetworkStatus(navigator.onLine);

// VOLUME (per IPC über preload -> main)
if (window.api && window.api.getVolume) {
    window.api.getVolume().then(vol => {
        document.getElementById('volume').textContent = `${vol}%`;
    });
}