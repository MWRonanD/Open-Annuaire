import { app, BrowserWindow, screen, Menu } from 'electron';
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
    icon: path.join(__dirname, 'icon.ico')
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

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

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
