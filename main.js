const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Zuerst bootloader.html laden
  mainWindow.loadFile(path.join(__dirname, 'BOOTLOADER', 'bootloader.html'));

  // Nach 6 Sekunden bootscreen.html laden
  setTimeout(() => {
    mainWindow.loadFile(path.join(__dirname, 'BOOTSCREEN', 'bootscreen.html'));
  }, 6000);

  // Nach weiteren 5 Sekunden index.html laden
  setTimeout(() => {
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
  }, 6000 + 5000);
}

app.whenReady().then(createMainWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
