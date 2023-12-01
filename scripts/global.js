async function setRowsToThemeColor() {
    console.log("PRINT ROWS");
    let themeOptions = {}
    const themeData = await chrome.storage.sync.get("themeOptions");
    Object.assign(themeOptions, themeData);
    const r = document.querySelector(':root');
    r.style.setProperty('--themeColor', `${themeOptions.themeOptions.color}`);
    document.styleSheets[0].insertRule(`:root{--themeColor: ${themeOptions.themeOptions.color}`)
  }
  
  setRowsToThemeColor()