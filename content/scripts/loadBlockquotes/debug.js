function consoleDebug(text, object) {
  if(variableList.debug == true) {
    if(object != undefined) {
      console.debug(text, object);
    }
    else {
      console.debug(text);
    }
  }
}