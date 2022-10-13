function consoleDebug(text, object) {
  if(options.debug == true) {
    if(object != undefined) {
      console.debug(text, object);
    }
    else {
      console.debug(text);
    }
  }
}