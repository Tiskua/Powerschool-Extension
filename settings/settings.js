import * as util from "../scripts/util.js"

const options = {};
const showAbsentForm = document.getElementById("showAbsentForm");
const cssForm = document.getElementById("cssForm");
const urlForm = document.getElementById("urlForm");


// Immediately persist options changes
showAbsentForm.attendance.addEventListener("change", (event) => {
  options.showAbsent = event.target.checked;
  chrome.storage.sync.set({ options });
  reloadTab()
});

cssForm.css.addEventListener("change", (event) => {
  options.useCSS = event.target.checked;
  chrome.storage.sync.set({ options });
  reloadTab()
});

urlForm.url.addEventListener("change", (event) => {
  options.url = event.target.value;
  chrome.storage.sync.set({ options });
});

// Initialize the form with the user's option settings
const data = await chrome.storage.sync.get("options");
Object.assign(options, data.options);


showAbsentForm.absent.checked = Boolean(options.showAbsent);
cssForm.css.checked = Boolean(options.useCSS);

if (options.url == null) { urlForm.url.value = "";}
else { urlForm.url.value = String(options.url);}


const themeOptions = {
  color: "#489ECD",
  bg : "#0A0A0A",
  secondBG: "#1B1B1B",
  text: "#DBDBDB"
};

const themeData = await chrome.storage.sync.get("themeOptions");
if (themeData.themeOptions != null) {
  Object.assign(themeOptions, themeData.themeOptions);
}


const themePicker = document.querySelector("#themePicker");
themePicker.addEventListener("change", watchThemePicker, false);

const bgPicker = document.querySelector("#bgPicker");
bgPicker.addEventListener("change", watchBGPicker, false);

const secondBGPicker = document.querySelector("#secondBGPicker");
secondBGPicker.addEventListener("change", watchSecondBGPicker, false);


const textPicker = document.querySelector("#textPicker");
textPicker.addEventListener("change", watchTextPicker, false);

function watchThemePicker(event) {
  themeOptions.color = event.target.value;
  chrome.storage.sync.set({ themeOptions });
  reloadTab()
}

function watchBGPicker(event) {
  themeOptions.bg = event.target.value;
  chrome.storage.sync.set({ themeOptions });
  reloadTab()
}

function watchSecondBGPicker(event) {
  themeOptions.secondBG = event.target.value;
  chrome.storage.sync.set({ themeOptions });
  reloadTab()
}

function watchTextPicker(event) {
  themeOptions.text = event.target.value;
  chrome.storage.sync.set({ themeOptions });
  reloadTab()
}


themePicker.value = await util.getThemeColor();
bgPicker.value = await util.getBackgroundColor();
secondBGPicker.value = await util.getSecondBackgroundColor();
textPicker.value = await util.getTextColor();


function reloadTab() {
    let url = "";
    
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        var activeTabId = activeTab.id;
        url = activeTab.url;
      
        chrome.tabs.reload(activeTabId) 
    });
}
