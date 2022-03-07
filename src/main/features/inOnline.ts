import isOnline from 'is-online';
import {BrowserWindow, ipcMain, Notification, app, nativeImage, IpcMainEvent} from 'electron';
import path from 'path';

export default (window: BrowserWindow) => {
  ipcMain.on('checkIfOnline', async (event: IpcMainEvent) => {
    const online = await checkIfOnline(5000)

    event.reply('onlineStatus', online);
  });
}

const checkIfOnline = async (timeout = 3000) => {
  return await isOnline({
    timeout
  });
}

const checkForInternet = async (window: BrowserWindow) => {
  const isOnline = await checkIfOnline();

  if (!isOnline) {
    const offlinePagePath = path.join(app.getAppPath(), 'src/offline/index.html');
    await window.loadURL(`file://${offlinePagePath}`);
    showOfflineNotification(window);
  }
}

const showOfflineNotification = (window: BrowserWindow) => {
  const notification = new Notification({
    title: 'Jira',
    body: `You are offline.\nCheck your internet connection.`,
    silent: true,
    timeoutType: 'default',
    icon: nativeImage.createFromPath(path.join(app.getAppPath(), 'resources/icons/normal/256.png'))
  });

  notification.on('click', () => {
    window.show();
    notification.close();
  });

  notification.show();
}

export {checkForInternet}
