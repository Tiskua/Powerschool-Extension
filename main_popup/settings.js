const options = {};
const optionsForm = document.getElementById("optionsForm");

// Immediately persist options changes
optionsForm.attendance.addEventListener("change", (event) => {
  options.showAttendance = event.target.checked;
  chrome.storage.sync.set({ options });
});

// Initialize the form with the user's option settings
const data = await chrome.storage.sync.get("options");
Object.assign(options, data.options);
optionsForm.attendance.checked = Boolean(options.showAttendance);
