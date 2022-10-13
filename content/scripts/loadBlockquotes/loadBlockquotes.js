var composeCss = "";

var msgDisplayScriptsPromise;
var composeScriptsPromise;
var composeCssPromise;

function registerCss() {
  if (!composeCss)
    composeCss = "";
  consoleDebug("[QuoteColors] [background.js] [registerCss]: composeCss: \n");
  consoleDebug(composeCss);
  composeCssPromise = messenger.composeScripts.register({
    css: [{
      code: composeCss,
    }],
  });
}

function registerScripts() {
  let msgDisplayContentScripts = {
    js: [{
        code: "var options = " + JSON.stringify(options) + ";",
      },
      {
        code: "var QCGlobals = " + JSON.stringify(QCGlobals) + ";",
      },
      // Absolutely important to have the "debug.js" file before the next ones,
      // to prevent "uncaught Object" errors
      {
        file: "/content/scripts/loadBlockquotes/debug.js",
      },
      {
        file: "/content/scripts/loadBlockquotes/msgDisplay.js",
      },
    ]
  };
  consoleDebug("[QuoteColors] [background.js] [registerScripts]: msgDisplayContentScripts: \n");
  consoleDebug(msgDisplayContentScripts);
  msgDisplayScriptsPromise = messenger.messageDisplayScripts.register(
    msgDisplayContentScripts);
}

async function unregisterCss() {
  await composeCssPromise;
  await composeCssPromise.then(css => css.unregister());
}

async function unregisterScripts() {
  await msgDisplayScriptsPromise.then(script => script.unregister());
}

async function resetOnStorageChanges(changes) {
  consoleDebug("[QuoteColors] resetOnStorageChanges: changed data: ", changes);
  // if the commandkey is invalid, we get here twice, which would lead to an error in console.
  // Therefore we check the following to circumvent the error.
  // If only a change of the commandKey fires the event, it isn't necessary to unregister and re-init()
  if ((changes.commandKey || changes.commandKeyCollapseOneLevel || changes.commandKeyExpandOneLevel) && (Object.keys(changes).length == 1))
    return;
  consoleDebug("[QuoteColors] resetOnStorageChanges: go forward and unregister CSS and Scripts before new init()");
  await unregisterCss();
  await unregisterScripts();
  await init();
}

async function init() {
  // await reloadAllOptions is necessary before composeCss = ...
  await reloadAllOptions();
  composeCss = ComposeCssObj.initMain();
  await reloadAllOptions().then(registerCss).then(registerScripts);
}

messenger.storage.onChanged.addListener(resetOnStorageChanges);
init();

browser.commands.onCommand.addListener(async function(command) {
  if (options.enableQuoteCollapse === true) {
    consoleDebug("[QuoteColors] onCommand:", command);

    let currentWindow = (await browser.windows.getAll()).find(w => w.focused);
    let [tab] = await browser.tabs.query({windowId: currentWindow.id, active: true})
    consoleDebug("[QuoteColors] onCommand: tab = ", tab);
    consoleDebug("[QuoteColors] onCommand: tab.id = " + tab.id);
    consoleDebug("[QuoteColors] onCommand: tab.windowId = " + tab.windowId);
    consoleDebug("[QuoteColors] onCommand: tab.mailTab = " + tab.mailTab);

    if (command === "toggle-all-quotes" || command === "collapse-one-more-level" || command === "expand-one-more-level") {
      // no longer necessary:
      // Sending messages to contentScripts is only possible for the main window at the moment (Bug 1768468).
      // Due to this, the if case is necessary and in consequence we can't use the command API for the standalone windows.
      // Therefore in quotecollapse_msgDisplay.js the additional eventListener is added to the document.body for now.

      try {
        await browser.tabs.sendMessage(tab.id, command);
      } catch {
        consoleDebug("[QuoteColors] onCommand: receiving end does not exist, maybe because of not being a message tab");
      }
    }
  }
});
