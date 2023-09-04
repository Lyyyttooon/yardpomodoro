import { app, BrowserWindow } from 'electron'
import { join } from 'node:path'

let win: BrowserWindow | null = null

const preload = join(__dirname, './preload.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join('dist/index.html')

function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    webPreferences: {
      preload
    }
  })

  if (url) {
    win.loadURL(url)
  } else {
    win.loadFile(indexHtml)
  }
}

app.whenReady().then(() => {
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
