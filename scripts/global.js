async function setRowsToThemeColor() {
    let themeOptions = {}
    const themeData = await chrome.storage.sync.get("themeOptions");
    Object.assign(themeOptions, themeData);

    const r = document.querySelector(':root');

    if (themeOptions.themeOptions == null) {
      r.style.setProperty('--themeColor', `#489ECD`);
    } else {
      
      r.style.setProperty('--themeColor', `${themeOptions.themeOptions.color}`);
      r.style.setProperty('--bgColor', `${themeOptions.themeOptions.bg}`);
      r.style.setProperty('--secondaryBgColor', `${themeOptions.themeOptions.secondBG}`);
      r.style.setProperty('--textColor', `${themeOptions.themeOptions.text}`);

  }
}
  
setRowsToThemeColor()

var div = document.createElement("div");
div.classList.add("over");
document.body.appendChild(div);

var div2 = document.createElement("div");
div2.classList.add("over2");
document.body.appendChild(div2);

const combo = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]
let index = 0


// const handleKeyboard = event => {
//   if (event.key === combo[index]) {
//     if(index+1 == combo.length) {
//       const over1 = document.body.querySelector('.over');
//       const over2 = document.body.querySelector('.over2');
//       over1.style.display = "block"
//       over2.style.display = "block"
//       index = 0


//       const r = document.querySelector(':root');

//       let speed = 50
//       let red = 0
//       let green = 0
//       let blue = 0
//       setInterval(async () => {
//           red += 1 
//           blue
//           r.style.setProperty('--overColor', `rgb(${red}, ${green}, ${blue})`);  
//       }, speed);

//     } else {
//       index += 1
//     }
//   } else {
//     index = 0
//   }
// }



// document.addEventListener('keyup', handleKeyboard)

let test = false
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
    link.href = chrome.runtime.getURL('CSS/main.css');
    target.appendChild(link);
  }
}
document.addEventListener("DOMContentLoaded", setSettingValues());


