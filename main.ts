import { app, BrowserWindow, screen, Menu, dialog, autoUpdater} from 'electron';
import * as path from 'path';
import * as url from 'url';

let win, serve;

const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

try {
  require('dotenv').config();
} catch {
  console.log('asar');
}

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  let tmpX = size.width - 1600;
  if (tmpX <= 0)
  {
    tmpX = 0;
  }
  else
  {
    tmpX /= 2;
  }
  let tmpY = size.height - 900;
  if (tmpY <= 0)
  {
    tmpY = 0;
  }
  else
  {
    tmpY /= 2;
  }
  // Create the browser window.
  win = new BrowserWindow({
    x: tmpX ,
    y: tmpY ,
    width: 1600,
    height: 900,
    icon: path.join(__dirname, 'favicon.ico')
  });
  // Menu.setApplicationMenu(null);
  if (serve) {
    require('electron-reload')(__dirname, {
     electron: require(`${__dirname}/node_modules/electron`)});
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

 // win.webContents.openDevTools();
 dialog.showMessageBox({'message': 'OMG such new killer feature!!'});
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// #region Auto update
const squirrelUrl = 'http://localhost/Installer/';

const startAutoUpdater = (squirrelUrl) => {
  // The Squirrel application will watch the provided URL
  autoUpdater.setFeedURL(`${squirrelUrl}/win64/`);

  // Display a success message on successful update
  autoUpdater.addListener('update-downloaded', (event, releaseNotes, releaseName) => {
    dialog.showMessageBox({'message': `The release ${releaseName} has been downloaded`});
  });

  // Display an error message on update error
  autoUpdater.addListener('error', (error) => {
    dialog.showMessageBox({'message': 'Auto updater error: ' + error});
  });

  // tell squirrel to check for updates
  autoUpdater.checkForUpdates();
};

app.on('ready', function (){
  // Add this condition to avoid error when running your application locally
  if (process.env.NODE_ENV !== 'dev') { startAutoUpdater(squirrelUrl); }
});
// #endregion Auto update
// #region Squirrel (Auto-update)
const handleSquirrelEvent = () => {
  if (process.argv.length === 1) {
    return false;
  }

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
    case '--squirrel-uninstall':
      setTimeout(app.quit, 1000);
      dialog.showMessageBox({'message': 'Hello world'});
      return true;

    case '--squirrel-obsolete':
      app.quit();
      return true;
  }
};

if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
}
// #endregion Squirrel (Auto-update)
try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

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
