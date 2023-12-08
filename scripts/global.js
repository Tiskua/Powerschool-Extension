async function setRowsToThemeColor() {
    let themeOptions = {}
    const themeData = await chrome.storage.sync.get("themeOptions");
    Object.assign(themeOptions, themeData);

    const r = document.querySelector(':root');

    if (themeOptions.themeOptions == null) {
      r.style.setProperty('--themeColor', `rgb(72, 158, 205)`);
    } else {
      
      r.style.setProperty('--themeColor', `${themeOptions.themeOptions.color}`);
    }
  }
  
  setRowsToThemeColor()