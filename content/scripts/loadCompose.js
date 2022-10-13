var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

const fileName = "messengerCompose.css";

function onLoad(activatedWhileWindowOpen) {
  WL.injectCSS("chrome://Primary/content/skin/" + fileName);
}

function onUnload(deactivatedWhileWindowOpen) {
}