async function setSettingValues() {
  let options = {}
  const data = await chrome.storage.sync.get("options");
  Object.assign(options, data.options);
  let useCustomCSS = Boolean(options.useCSS)
  if (useCustomCSS) {
    const target = document.head || document.documentElement;
    const link  = document.createElement('link');
    link.id = 'my_style_css';
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = chrome.runtime.getURL('CSS/login.css');
    target.appendChild(link);
  }
}
document.addEventListener("DOMContentLoaded", setSettingValues());