let z = 1;

// Update clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true
    });
    const dateString = now.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
    document.getElementById('clock').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

// Initialize clock
updateClock();
setInterval(updateClock, 1000);

// Search overlay functionality
function toggleSearch() {
    const overlay = document.getElementById('searchOverlay');
    const searchBox = document.getElementById('searchBox');
    
    if (overlay.style.display === 'flex') {
        overlay.style.display = 'none';
    } else {
        overlay.style.display = 'flex';
        setTimeout(() => searchBox.focus(), 100);
    }
}

// Close search on escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('searchOverlay').style.display = 'none';
    }
});

// Close search when clicking outside
document.getElementById('searchOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        e.currentTarget.style.display = 'none';
    }
});

// Original window functionality - simple and effective
function openApp(title, url, width = 400, height = 300) {
    const win = document.createElement('div');
    win.className = 'window';
    win.style.top = '50px';
    win.style.left = '50px';
    win.style.zIndex = z++;
    win.style.width = `${width}px`;
    win.style.height = `${height}px`;

    win.innerHTML = `
        <div class="window-header">
            <span>${title}</span>
            <div class="window-controls">
                <div class="window-control minimize"></div>
                <div class="window-control maximize"></div>
                <div class="window-control close" onclick="closeWindow(this)"></div>
            </div>
        </div>
        <iframe src="${url}"></iframe>
    `;

    makeDraggable(win);
    document.body.appendChild(win);
    
    // Close search overlay when opening app
    document.getElementById('searchOverlay').style.display = 'none';
}

function closeWindow(control) {
    const window = control.closest('.window');
    window.remove();
}

// Original drag functionality - simple and smooth
function makeDraggable(el) {
    const header = el.querySelector('.window-header');
    let offsetX = 0, offsetY = 0, isDragging = false;

    header.addEventListener('mousedown', e => {
        if (e.target.classList.contains('window-control')) return;
        isDragging = true;
        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;
        el.style.zIndex = z++;
    });

    document.addEventListener('mousemove', e => {
        if (isDragging) {
            el.style.left = `${e.clientX - offsetX}px`;
            el.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Context menu functionality
const contextMenu = document.getElementById('contextMenu');
const desktop = document.getElementById('desktop');

desktop.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    contextMenu.style.display = 'block';
    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.style.top = `${e.clientY}px`;
});

document.addEventListener('click', () => {
    contextMenu.style.display = 'none';
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50px;
        right: 20px;
        background: rgba(40, 40, 40, 0.95);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        backdrop-filter: blur(10px);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// App icon active states
document.querySelectorAll('.app-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        this.classList.add('active');
        setTimeout(() => this.classList.remove('active'), 2000);
    });
});