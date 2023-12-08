import * as util from "../scripts/util.js"

const options = {};
const attendanceForm = document.getElementById("attendanceForm");

// Immediately persist options changes
attendanceForm.attendance.addEventListener("change", (event) => {
  options.showAttendance = event.target.checked;
  chrome.storage.sync.set({ options });
});

// Initialize the form with the user's option settings
const data = await chrome.storage.sync.get("options");
Object.assign(options, data.options);
attendanceForm.attendance.checked = Boolean(options.showAttendance);


const themeOptions = {};
const colorPicker = document.querySelector("#theme");
colorPicker.addEventListener("change", watchColorPicker, false);

function watchColorPicker(event) {
  themeOptions.color = event.target.value;
  chrome.storage.sync.set({ themeOptions });
}
colorPicker.value = await util.getThemeColor();

