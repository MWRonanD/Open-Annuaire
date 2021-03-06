import { app, BrowserWindow, screen, Menu, dialog, autoUpdater } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as ChildProcess from 'child_process';
let win, serve;

//#region Paths
const appFolder = path.resolve(process.execPath, '..');
const rootAtomFolder = path.resolve(appFolder, '..');
const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
const exeName = path.basename(process.execPath);
//#endregion Paths

const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');
const squirrelUrl = 'http://localhost/Installer/';
try {
  require('dotenv').config();
} catch {
  console.log('asar');
}
function spawn(command: string, args: string[]) {
  let spawnedProcess, error;

  try {
    spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
  } catch (error) { }

  return spawnedProcess;
}
function spawnUpdate(args: string[]) {
  return spawn(updateDotExe, args);
}
function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  let tmpX = size.width - 1600;
  if (tmpX <= 0) {
    tmpX = 0;
  }
  else {
    tmpX /= 2;
  }
  let tmpY = size.height - 900;
  if (tmpY <= 0) {
    tmpY = 0;
  }
  else {
    tmpY /= 2;
  }
  // Create the browser window.
  win = new BrowserWindow({
    x: tmpX,
    y: tmpY,
    width: 1600,
    height: 900,
    icon: path.join(__dirname, 'favicon.ico')
  });
  // Menu.setApplicationMenu(null);
  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  // win.webContents.openDevTools();
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}
function startAutoUpdater() {
  // The Squirrel application will watch the provided URL
  autoUpdater.setFeedURL(`${squirrelUrl}/win64/`);

  // Display a success message on successful update
  autoUpdater.addListener('update-downloaded', (event, releaseNotes, releaseName) => {
    dialog.showMessageBox({ 'message': `The release ${releaseName} has been downloaded` });
  });

  // Display an error message on update error
  autoUpdater.addListener('error', (error) => {
    dialog.showMessageBox({ 'message': 'Auto updater error: ' + error });
  });

  // tell squirrel to check for updates
  autoUpdater.checkForUpdates();
}
function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;
    case '--squirrel-uninstall':
      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      app.quit();
      return true;
  }
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', x => {
    createWindow();
    if (process.env.NODE_ENV !== 'dev') {
      startAutoUpdater();
    }
    if (handleSquirrelEvent()) {
      // squirrel event handled and app will exit in 1000ms, so don't do anything else
      return;
    }
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
