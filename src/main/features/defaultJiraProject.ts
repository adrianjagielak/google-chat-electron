import { nativeTheme, BrowserWindow } from 'electron';
import store from './../config';

const saveDefaultProject = (event: Event, url: string) => {
  try {
    let project = url.match(RegExp("https:\\/\\/.*\\.atlassian\\.net\\/jira\\/software.*\\/projects\\/.*\\/boards\\/[a-zA-Z0-9]*"))![0];
    store.set('app.defaultProjectUrl', project);
  } catch (_) { }
}

/// Set the last visited Jira project board as the default one opened after application restart
export default (window: BrowserWindow) => {
  window.webContents.addListener('did-navigate', saveDefaultProject);
  window.webContents.addListener('did-navigate-in-page', saveDefaultProject);
}
