# Open Annuaire Electron

Project with Electron-Angular calling an API 

A [Web demo](https://mwalexisl.github.io/Open-Annuaire) is available.

## Installation

- Clone the project `git https://github.com/MWRonanD/Open-Annuaire.git`
- Go to the new directory `cd Open-Annuaire/`
- Install the packages `npm install`

## Development server

Run `npm start` for a dev server. The app will automatically reload if you change any of the source files.

## Included Commands

|Command|Description|
|--|--|
|`npm run ng:serve`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |

**Your application is optimised. Only /dist folder and node dependencies are included in the executable.**

## Auto update 
- Build solutions :  `npm run electron:windows`
- install build
- Start app(`C:/Users/[USER_NAME]/AppData/Local/OpenAnnuaire/Open-electron.exe`)
- make a new version (increment app version in `app.component.ts` & run `npm version patch`)
- Build solutions :  `npm run electron:windows`
- Get compiled files in `Open-Annuaire/app-builds/squirrel-windows`
- Put it in web server (in this case i create a wamp server in local `localhost/Installer/win64/`)
- Start app, wait a few seconds
- Restart app

## Sources
[Angular](https://github.com/MWAlexisL/Open-Annuaire)

[Electron](https://github.com/maximegris/angular-electron) 

[Squirrel](https://blog.theodo.fr/2017/05/set-up-continuous-deployment-on-electron-using-squirrel/)
