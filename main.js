const { app, BrowserWindow } = require('electron')

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 650,
    frame: true,
    minWidth: 1200,
    minHeight: 650,
    title: app.getName()
  })

  win.loadURL(`file://${__dirname}/dist/index.html`)

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron initialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {

  // On macOS specific close process
  if (process.platform !== 'darwin'){
    app.quit()
  }
})

app.on('active', function() {
  // macOS specific close process
  if (win === null){
    createWindow()
  }
})

// Examples for more customization below

// let serve;
// const args = process.argv.slice(1);
// serve = args.some(val => val == "--serve" || val === "-serve");

// if (serve){
//   require('electron-reload')(__dirname, {
//     electron: require('${__dirname}/../../node_modules/electron')
//   });
// }

// require('electron-context-menu')({
//   showInspectElement: serve
// })

// // Keep a global reference of the window object, if you don't, the window will
// // be closed automatically when the JavaScript object is garbage collected.
// let mainWindow = null;

// function createWindow() {
//   // Create the browser window
//   mainWindow = new BrowserWindow({
//     width: 1200,
//     height: 650,
//     frame: true,
//     minWidth: 1200,
//     minHeight: 650,
//     title: app.getName()
//   });

//      // and load the index.html of the app.
//      mainWindow.loadURL(path.join('file://', __dirname, '/dist/index.html'));

//      if (serve) {
//       mainWindow.webContents.openDevTools();
//     }
  
//     // Emitted when the window is closed.
//     mainWindow.on('closed', function () {
//       // Dereference the window object, usually you would store windows
//       // in an array if your app supports multi windows, this is the time
//       // when you should delete the corresponding element.
//       mainWindow = null;
//     });
  
//     // Emitted when the window is going to close.
//     mainWindow.on('close', function () {
//     });
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', function () {
//   createTray();
//   createWindow();
// });

// function writeLog(msg) {
//   console.log(msg);
// };

// function createTray() {
//   //Put the app in system tray
//   const Menu = electron.Menu;
//   const Tray = electron.Tray;

//   let trayIcon;
//   if (serve) {
//     trayIcon = nativeImage.createFromPath('./src/assets/images/breeze-logo-tray.png');
//   } else {
//     trayIcon = nativeImage.createFromPath(path.resolve(__dirname, '../../resources/src/assets/images/breeze-logo-tray.png'));
//   }

//   let systemTray = new Tray(trayIcon);
//   const contextMenu = Menu.buildFromTemplate([
//     {
//       label: 'Hide/Show',
//       click: function() {
//         mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
//       }
//     },
//     {
//       label: 'Exit',
//       click: function() {
//         app.quit();
//       }
//     }
//   ]);
//   systemTray.setToolTip('Breeze Wallet');
//   systemTray.setContextMenu(contextMenu);
//   systemTray.on('click', function() {
//     if (!mainWindow.isVisible()) {
//       mainWindow.show();
//     }

//     if (!mainWindow.isFocused()) {
//       mainWindow.focus();
//     }
//   });

//   app.on('window-all-closed', function () {
//     if (systemTray) systemTray.destroy();
//   });
// };

// function createMenu() {
//   const Menu = electron.Menu;

//   // Create the Application's main menu
//   var menuTemplate = [{
//     label: "Application",
//     submenu: [
//         { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
//         { type: "separator" },
//         { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
//     ]}, {
//     label: "Edit",
//     submenu: [
//         { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
//         { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
//         { type: "separator" },
//         { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
//         { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
//         { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
//         { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
//     ]}
//   ];

//   Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
// };