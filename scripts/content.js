
const tbody = document.getElementsByTagName("tbody")[0];
const trs = tbody.getElementsByTagName("tr");


function replacePeriod(index) {
  const periodTD = trs[index].getElementsByTagName("td")[0];
  if(periodTD) {
    const txt = periodTD.innerText 
    const formattedTxt = txt.replaceAll("P", " Period ")
      .replace("(1-2)", " (Every Day)")
      .replace("(1)", " (Day 1)")
      .replace("(2)", " (Day 2)")
      .replace("- ", " - ")
    
    const re = /\d{1,2}-\d{1,2}/g
    const matches = formattedTxt.match(re)
    if(matches) {
      let samePeriodTxt = formattedTxt;
      for (let i = 0; i< matches.length; i++) {
        const split = matches[i].split("-")
        if (split[0] == split[1]) {
          samePeriodTxt = samePeriodTxt.replace(matches[i], split[0]);
        }
      }
      periodTD.innerText = samePeriodTxt;
      
    } else {
      periodTD.innerText = formattedTxt.trim();
    } 
  } 
}

function replaceNoGrade(index) {
  for(let i = 0; i < 7; i++) {
    const gradeTD = trs[index].getElementsByTagName("td")[12 + i];
    if(gradeTD && !gradeTD.classList.contains("notInSession")) {
      const a = gradeTD.querySelector("a");
      a.innerText = a.innerText.replace("[ i ]", "---")
    }
  }
}

function hideAbsent(index) {  
  for(let i = 1; i<11;i++) {
    const absentTD = trs[index].getElementsByTagName("td")[i];
    if(absentTD) {
      absentTD.style.display = "none"
    }
  }

  for(let i = 0; i<10;i++) {
    const test = trs[1].getElementsByTagName("th")[i];
    if(test) {
      test.style.display = "none"
    }
  }

  trs[0].getElementsByTagName("th")[1].style.display = "none";
  trs[0].getElementsByTagName("th")[2].style.display = "none";

}

function showAbsent(index) {  
  for(let i = 1; i<11;i++) {
    const absentTD = trs[index].getElementsByTagName("td")[i];
    if(absentTD) {
      absentTD.style.display = "table-cell"
    }
  }

  for(let i = 0; i<10;i++) {
    const test = trs[1].getElementsByTagName("th")[i];
    if(test) {
      test.style.display = "table-cell"
    }
  }

  trs[0].getElementsByTagName("th")[1].style.display = "table-cell";
  trs[0].getElementsByTagName("th")[2].style.display = "table-cell";

}

for (let i = 0; i < trs.length; i++){
  replacePeriod(i)
  replaceNoGrade(i)
}

// Show Absent Settings

async function setSettingValues() {
  let options = {}
  const data = await chrome.storage.sync.get("options");
  Object.assign(options, data.options);
  toggleShowAbsent(Boolean(options.showAbsent))
}
setSettingValues()

function toggleShowAbsent(show) {
  for (let i = 0; i < trs.length; i++){
    if(!show) {hideAbsent(i)}
    else {showAbsent(i)}
  }
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync') {
    const showAbsent = Boolean(changes.options.newValue.showAbsent);
    toggleShowAbsent(showAbsent)
  } 
});





