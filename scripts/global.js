async function setRowsToThemeColor() {
<<<<<<< HEAD
    let themeOptions = {}
    const themeData = await chrome.storage.sync.get("themeOptions");
    Object.assign(themeOptions, themeData);

    const r = document.querySelector(':root');

    if (themeOptions.themeOptions == null) {
      r.style.setProperty('--themeColor', `rgb(72, 158, 205)`);
    } else {
      
      r.style.setProperty('--themeColor', `${themeOptions.themeOptions.color}`);
    }
=======
    console.log("PRINT ROWS");
    let themeOptions = {}
    const themeData = await chrome.storage.sync.get("themeOptions");
    Object.assign(themeOptions, themeData);
    const r = document.querySelector(':root');
    r.style.setProperty('--themeColor', `${themeOptions.themeOptions.color}`);
    document.styleSheets[0].insertRule(`:root{--themeColor: ${themeOptions.themeOptions.color}`)
>>>>>>> 1e89a9d090b166f8850fcc1bb73b7b2c5d5dbc07
  }
  
  setRowsToThemeColor()