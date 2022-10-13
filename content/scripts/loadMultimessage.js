var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

const fileName = "multimessage.css";

function onLoad(activatedWhileWindowOpen) {
  WL.injectCSS("chrome://Primary/content/skin/" + fileName);
}

function onUnload(deactivatedWhileWindowOpen) {
}