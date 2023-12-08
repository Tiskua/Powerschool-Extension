<<<<<<< HEAD
import * as util from "../scripts/util.js"

=======
>>>>>>> 1e89a9d090b166f8850fcc1bb73b7b2c5d5dbc07
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


<<<<<<< HEAD
=======

>>>>>>> 1e89a9d090b166f8850fcc1bb73b7b2c5d5dbc07
const themeOptions = {};
const colorPicker = document.querySelector("#theme");
colorPicker.addEventListener("change", watchColorPicker, false);

function watchColorPicker(event) {
  themeOptions.color = event.target.value;
  chrome.storage.sync.set({ themeOptions });
}
<<<<<<< HEAD
colorPicker.value = await util.getThemeColor();

=======

const themeData = await chrome.storage.sync.get("themeOptions");
Object.assign(themeOptions, themeData);
colorPicker.value = themeOptions.themeOptions.color;
>>>>>>> 1e89a9d090b166f8850fcc1bb73b7b2c5d5dbc07
