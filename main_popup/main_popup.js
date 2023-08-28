import * as util from "../scripts/util.js"

const courseLink = document.getElementById("course-btn");
const welcome = document.querySelector('.welcome');
const classesLabel = document.querySelector('.classes-label');
const gpaValue = document.querySelector('.GPA-value');
const gradeAverageLabel = document.querySelector('.grade-avg-label');

function onWindowLoad() {
    
    let url = "";
    chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        var activeTab = tabs[0];
        var activeTabId = activeTab.id;
        url = activeTab.url;
        return chrome.scripting.executeScript({
            target: { tabId: activeTabId },
            func: DOMtoString,
            args: ['body']  // you can use this to target what element to get the html for
        });
        

    }).then(function (results) {
        var parser = new DOMParser();
	    var body = parser.parseFromString(results[0].result, 'text/html');
        const courseButton = document.getElementById("course-btn").getElementsByTagName("a")[0];
        if (url.includes("score")) {
            courseLink.classList.remove("link-disabled");
            courseButton.click();            
            return;
        } else {
            courseLink.classList.add("link-disabled");
        }

        welcome.innerText = util.getStudentName(body)
        const gpa = util.getGPA(body);
        gpaValue.innerText = gpa[0]
        gradeAverageLabel.innerText = `Grade Average: ${gpa[1]}%`
        setGPACircularView(gpa[0])

        classesLabel.innerText = "Number of Courses: " + util.getClassCount(body)
    }).catch(function (error) {
        welcome.innerText = 'There was an error injecting script : \n' + error.message;
    });
}

window.onload = onWindowLoad;

function DOMtoString(selector) {
    if (selector) {
        selector = document.querySelector(selector);
        if (!selector) return "ERROR: querySelector failed to find node"
    } else {
        selector = document.documentElement;
    }
    return selector.outerHTML;
}



// Circular GPA View

function setGPACircularView(gpa) {
    const circularGPA = document.querySelector(".circular-GPA"),
        gpaValue = document.querySelector(".GPA-value");
    let gpaStartValue = 0,
        gpaEndValue = gpa * 25,
        speed = 8;


    let progress = setInterval(async () => {
        gpaStartValue += 1;

        gpaValue.textContent = `${gpaStartValue/25}`
        const color = await util.getThemeColor()
        console.log(color)
        circularGPA.style.background = `conic-gradient(${color} ${gpaStartValue * 3.6}deg, rgb(17, 17, 17) 0deg)`

        if(gpaStartValue >= gpaEndValue) {
            clearInterval(progress);
            gpaValue.innerText = gpa;
        }
    }, speed);
}

if (await util.getThemeColor()) {
    const r = document.querySelector(':root');
    r.style.setProperty('--themeColor', `${await util.getThemeColor()}`);
}

