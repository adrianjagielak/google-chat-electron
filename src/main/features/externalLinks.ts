import {BrowserWindow, dialog, HandlerDetails, shell} from 'electron';
import log from "electron-log";

let guardAgainstExternalLinks = true;
const RE_GUARD_IN_MINUTES = 5;
let interval: NodeJS.Timeout;

const ACTION_DENIED = {
  action: 'deny'
}

const ACTION_ALLOWED = {
  action: 'allow'
}

export default (window: BrowserWindow) => {
  const handleRedirect = (details: HandlerDetails): any => {
    const url = details.url

    if (!isValidHttpURL(url)) {
      return ACTION_DENIED;
    }

    if (!guardAgainstExternalLinks) {
      return ACTION_ALLOWED;
    }

    const whiteListedHosts = [
      extractHostname(window.webContents.getURL()),
      'atlassian.com',
      'atlassian.net'
    ];

    const isDownloadUrl = url.includes('https://api.media.atlassian.com/file');

    const isNotWhitelistedHost = !whiteListedHosts.some(host => extractHostname(url).includes(host));

    if (isDownloadUrl || isNotWhitelistedHost) {

      setImmediate(() => {
        shell.openExternal(url);
      });

      return ACTION_DENIED;
    }

    return ACTION_ALLOWED;
  };

  window.webContents.setWindowOpenHandler(handleRedirect);
}

function extractHostname(url: string) {
  return (new URL(url)).hostname;
}

// https://stackoverflow.com/questions/5717093
function isValidHttpURL(input: string) {
  let url;

  try {
    url = new URL(input);
  } catch (error: any) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

const toggleExternalLinksGuard = (window: BrowserWindow) => {
  const actionLabel = guardAgainstExternalLinks ? 'Disable' : 'Enable';

  dialog.showMessageBox(window, {
    type: 'warning',
    title: 'Confirm',
    message: 'Facing issues during authentication?',
    detail: `You can disable the external links security feature temporarily.\nDont forget to enable it back.\nIf you don't, it will be enabled automatically in ${RE_GUARD_IN_MINUTES} minutes.`,
    buttons: [`${actionLabel} Guard`, 'Close'],
    cancelId: 1,
    defaultId: 1,
  })
    .then(({response}) => {
      if (response === 0) {
        guardAgainstExternalLinks = !guardAgainstExternalLinks;

        stopReGuardTimer();

        if (!guardAgainstExternalLinks) {
          startReGuardTimer()
        }

        logGuardStatus();
      }
    })
}

const logGuardStatus = () => {
  log.debug(`External links guard is set to: ${guardAgainstExternalLinks}`)
}

const stopReGuardTimer = () => {
  clearInterval(interval);
}

const startReGuardTimer = () => {
  interval = setInterval(() => {
    guardAgainstExternalLinks = true;
    logGuardStatus();
  }, 1000 * 60 * RE_GUARD_IN_MINUTES)
}

export {toggleExternalLinksGuard}
