import path from 'path';
import { app, BrowserWindow, nativeImage, nativeTheme } from 'electron';
import store from './config';
import { userAgentString } from './features/userAgent';

export default (url: string): BrowserWindow => {
  const isDarkTheme = nativeTheme.shouldUseDarkColors;

  const window = new BrowserWindow({
    webPreferences: {
      autoplayPolicy: 'user-gesture-required',
      contextIsolation: false,
      nodeIntegration: false,
      sandbox: false,
      disableBlinkFeatures: 'Auxclick', // Security
      preload: path.join(app.getAppPath(), 'lib/preload/index.js'),
    },
    icon: nativeImage.createFromPath(path.join(app.getAppPath(), 'resources/icons/normal/256.png')),
    show: false,
    minHeight: 570,
    minWidth: 480,
    center: true,
    title: 'Jira',
    backgroundColor: isDarkTheme ? '#212121' : '#FFFFFF',
  });

  window.once('ready-to-show', () => {
    if (!store.get('app.startHidden')) {
      window.show();
    }
  });

  window.loadURL(url, {
    userAgent: userAgentString,
  });

  return window;
};
