import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  setFullScreen: (fullscreen: boolean) => ipcRenderer.send('set-fullscreen', fullscreen)
})
