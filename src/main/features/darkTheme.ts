import { nativeTheme, BrowserWindow } from 'electron';

const insertDarkThemeCss = (window: BrowserWindow) => {
  const isDarkTheme = nativeTheme.shouldUseDarkColors;

  if (isDarkTheme) {
    window.webContents.executeJavaScript(`
    // ==UserScript==
    // @name          JIRA Dark 2020
    // @namespace     http://userstyles.org
    // @description	  Quick dark theme for JIRA in 2020.
    // @author        Cody Swartz
    // @homepage      https://userstyles.org/styles/179379
    // @include       http://atlassian.net/*
    // @include       https://atlassian.net/*
    // @include       http://*.atlassian.net/*
    // @include       https://*.atlassian.net/*
    // @run-at        document-start
    // @version       0.20200609190524
    // ==/UserScript==
    (function() {var css = [
    "html {",
    "    filter: invert(86%) hue-rotate(180deg) brightness(105%) contrast(105%);",
    "    background: white;",
    "}",
    "body {",
    "    background: white;",
    "}",
    "span[role=\\"img\\"] {",
    "    filter: invert(100%) hue-rotate(180deg) brightness(105%) contrast(105%);",
    "}",
    "span[style*=\\"background-image\\"] {",
    "    filter: invert(100%) hue-rotate(180deg) brightness(105%) contrast(105%);",
    "}",
    "img, svg, iframe, .emoji-common-emoji-sprite {",
    "	filter: invert(100%) hue-rotate(180deg) brightness(105%) contrast(105%);",
    "}",
    "/* Fix bug with white edges on sprint board */",
    "#gh {",
    "    padding: 0 40px;",
    "}",
    "#content {",
    "    margin: 0;",
    "}",
    "/* Fix scroll background problems */",
    "[data-testid=\\"Content\\"] > div:first-child {",
    "    background: white;",
    "}"
    ].join("\\n");
    
    var node = document.createElement("style");
    node.type = "text/css";
    node.className = "jira-electron-dark-theme-css";
    node.appendChild(document.createTextNode(css));
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      heads[0].appendChild(node);
    } else {
      // no head yet, stick it whereever
      document.documentElement.appendChild(node);
    }
    
    })();
    `);
  } else {
    window.webContents.executeJavaScript(`
    var elements = document.getElementsByClassName("jira-electron-dark-theme-css");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    `);
  }
};

export default (window: BrowserWindow) => {
  window.webContents.addListener('did-start-navigation', () => {
    insertDarkThemeCss(window);
  });

  nativeTheme.addListener('updated', () => {
    insertDarkThemeCss(window);
  });
}
