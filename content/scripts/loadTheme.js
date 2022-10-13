messenger.WindowListener.registerChromeUrl([
    ["content", "Primary", "content/"]
]);

messenger.WindowListener.registerWindow(
    "chrome://messenger/content/aboutAddressBook.xhtml",
    "chrome://Primary/content/scripts/loadAddressbook.js");

// messenger.WindowListener.registerWindow(
//     "chrome://messenger/content/addressbook/abContactsPanel.xhtml",
//     "chrome://Primary/content/scripts/loadAddressbook.js");

messenger.WindowListener.registerWindow(
    "chrome://messenger/content/messengercompose/messengercompose.xhtml",
    "chrome://Primary/content/scripts/loadCompose.js");

messenger.WindowListener.registerWindow(
    "chrome://messenger/content/messenger.xhtml",
    "chrome://Primary/content/scripts/loadMessenger.js");

// BUG 
messenger.WindowListener.registerWindow(
    "chrome://messenger/content/multimessageview.xhtml",
    "chrome://Primary/content/scripts/loadMessenger.js");

messenger.WindowListener.registerWindow(
    "chrome://messenger/content/messageWindow.xhtml",
    "chrome://Primary/content/scripts/loadMessenger.js");

// messenger.WindowListener.registerWindow(
//     "chrome://messenger/content/customizeToolbar.xhtml",
//     "chrome://Primary/content/scripts/loadMessenger.js");

// BUG 
messenger.WindowListener.registerWindow(
    "chrome://messenger/content/glodaFacetView.xhtml",
    "chrome://Primary/content/scripts/loadSearch.js");

messenger.WindowListener.startListening();
