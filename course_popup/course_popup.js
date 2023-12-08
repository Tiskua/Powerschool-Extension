import * as util from "../scripts/util.js"

const courseLabel = document.getElementsByTagName("h1")[0];
const pointsLabel = document.getElementById("points");
const gradeLabel = document.getElementById("grade");
const assignmentCountLabel = document.getElementById("assignment-count");
const needPointLabel = document.getElementById("need-percent");
const needLetterLabel = document.getElementById("need-letter");

<<<<<<< HEAD
=======
console.log("CHECK 1")
>>>>>>> 1e89a9d090b166f8850fcc1bb73b7b2c5d5dbc07

function onWindowLoad() {
    console.log("CHECK 2")

    const h1 = document.getElementsByTagName("h1");
    let url = "";  
    chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        var activeTab = tabs[0];
        var activeTabId = activeTab.id;
        url = activeTab.url;

<<<<<<< HEAD
=======
        console.log("CHECK 1")

>>>>>>> 1e89a9d090b166f8850fcc1bb73b7b2c5d5dbc07
        return chrome.scripting.executeScript({
            target: { tabId: activeTabId },
            func: DOMtoString,
            args: ['body']  // you can use this to target what element to get the html for
        });

    }).then(function (results) {
        if (!url.includes("score")) {
            return;
        }
        var parser = new DOMParser();
	    var body = parser.parseFromString(results[0].result, 'text/html');
        getData(body);
        // courseLabel.innerText = util.getCourseName(body);

    }).catch(function (error) {
        courseLabel.innerText = 'There was an error injecting script : \n' + error.message;
    });
}

window.onload = onWindowLoad


function getData(body) {
<<<<<<< HEAD
=======
    console.log("GETTING DATA");
>>>>>>> 1e89a9d090b166f8850fcc1bb73b7b2c5d5dbc07
    const tbody = body.getElementsByTagName("tbody")[1];
    const trs = tbody.getElementsByTagName("tr");

    let totalPoints = 0.0;
    let earnedPoints = 0.0;
    for (let i = 0; i < trs.length; i++) {
        const tds = trs[i].getElementsByTagName("td");
        if(tds.length < 10) { continue; }

        const scoreText = tds[10].innerText;

        const scores = util.getScore(scoreText);
<<<<<<< HEAD
        earnedPoints += scores[0];
        totalPoints += scores[1];
    }
    const grade = earnedPoints/totalPoints*100
    const gradeLetter = util.findGradeLetter(grade);

=======
        console.log(scores);
        earnedPoints += scores[0];
        totalPoints += scores[1];
    }
    console.log(earnedPoints + " : " + totalPoints)
    const grade = earnedPoints/totalPoints*100
    const gradeLetter = util.findGradeLetter(grade);
    console.log("Check 4")
>>>>>>> 1e89a9d090b166f8850fcc1bb73b7b2c5d5dbc07
    gradeLabel.innerText = `Grade: ${grade.toFixed(2)} (${gradeLetter})`;
    assignmentCountLabel.innerText = `Assignments: ${trs.length-1}`;
    pointsLabel.innerText = `Points: ${earnedPoints}/${totalPoints}`;

    const needPoints = util.getNeededPoints(earnedPoints, totalPoints);
    needPointLabel.innerText = `Need (%): ${needPoints[0]} Points`;
    needLetterLabel.innerText = `Need (L): ${needPoints[1]} Points`;

    return null

}

function DOMtoString(selector) {
    if (selector) {
        selector = document.querySelector(selector);
        if (!selector) return "ERROR: querySelector failed to find node"
    } else {
        selector = document.documentElement;
    }
    return selector.outerHTML;
}


if (await util.getThemeColor()) {
    const r = document.querySelector(':root');
    r.style.setProperty('--themeColor', `${await util.getThemeColor()}`);
}
  
