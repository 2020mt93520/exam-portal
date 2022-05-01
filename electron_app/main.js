const { Menu, MenuItem, app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

require('electron-reload')(__dirname);

const isMac = process.platform === 'darwin'


function createTestWindow(){
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  // win.loadFile('./static/html/test.html')
  //win.webContents.openDevTools();
  win.loadURL(`https://medicaid-old-men-granny.trycloudflare.com/`)
}

app.whenReady().then(() => {
  createTestWindow()

// for mac systems dont stop the app and let it run on the background. create a new window when the app button is clicked
  app.on('activate', function(){
    if (BrowserWindow.getAllWindows().length === 0) createDiffWindow()
  })
})


ipcMain.on('test', function(e, data){
  console.log("tested successfully")
})


// for windows and linux platforms close the app if none of the windows are oprn
app.on('window.all.closed', function(){
  if (process.platform !== 'darwin') app.quit()
})
