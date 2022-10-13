var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

const fileName = "addressbook.css";

function onLoad(activatedWhileWindowOpen) {
  WL.injectCSS("chrome://Primary/content/skin/" + fileName);
}

function onUnload(deactivatedWhileWindowOpen) {
}