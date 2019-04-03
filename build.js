var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './app-builds/win-unpacked',
    outputDirectory: './app-builds/installer',
    authors: 'Ronan',
    exe: 'Open-electron 3.4.1.exe',
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`))