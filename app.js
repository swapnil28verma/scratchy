const electron = require('electron');
const url = require("url");
const path = require("path");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

require('electron-reload')(path.join(__dirname, 'dist'));

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/scratchy/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.on('closed', function () {
    mainWindow = null
  });
}
app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
