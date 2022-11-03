var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

const fileName = "messenger.css";

function onLoad(activatedWhileWindowOpen) {
  WL.injectCSS("chrome://Primary/content/skin/" + fileName);

  if (Services.appinfo.OS == "WINNT") {
    WL.injectCSS("chrome://Primary/content/skin/win/" + fileName);
  } else if (Services.appinfo.OS == "Darwin") {
    WL.injectCSS("chrome://Primary/content/skin/mac/" + fileName)
  }
}

function onUnload(deactivatedWhileWindowOpen) {
}