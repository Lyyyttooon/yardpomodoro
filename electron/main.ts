import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'node:path'

let win: BrowserWindow | null = null

const preload = join(__dirname, './preload.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join('dist/index.html')

function createWindow() {
  win = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: 'rgba(255,255,255,0)',
      symbolColor: '#000'
    },
    webPreferences: {
      preload
    }
  })

  if (url) {
    win.loadURL(url)

    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }
}

app.whenReady().then(() => {
  ipcMain.on('set-fullscreen', handleSetFullscreen)

  createWindow()
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    createWindow()
  } else {
    allWindows[0].focus()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

function handleSetFullscreen(_: any, fullscreen: boolean) {
  if (win) {
    win.setFullScreen(fullscreen)
  }
}
