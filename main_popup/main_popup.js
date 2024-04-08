import * as util from "../scripts/util.js"

const courseLink = document.getElementById("course-btn");
const welcome = document.querySelector('.welcome');
const classesLabel = document.querySelector('.classes-label');
const gpaValue = document.querySelector('.GPA-value');
const gradeAverageLabel = document.querySelector('.grade-avg-label');

const settingsBTN = document.querySelector('.settings-btn')

var globalTerm = 0
var globalBody = null
var storedURL = ""


function onWindowLoad() {
    let url = "";
    chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        var activeTab = tabs[0];
        var activeTabId = activeTab.id;
        url = activeTab.url;
        
        if (!url.includes("powerschool")) { 
            welcome.innerText = "Please Go To Your Powerschool website!"
            if (storedURL == "") { return null }
            window.open(`${storedURL}`, "_blank");
            return null
        }
        return chrome.scripting.executeScript({
            target: { tabId: activeTabId },
            func: DOMtoString,
            args: ['body']
        });
        

    }).then(function (results) {
        if (results == null) { return }
        var parser = new DOMParser();
	    var body = parser.parseFromString(results[0].result, 'text/html');
        globalBody = body

        const courseButton = document.getElementById("course-btn").getElementsByTagName("a")[0];
        if (url.includes("score")) {
            courseLink.classList.remove("link-disabled");
            courseButton.click();            
            return;
        } else courseLink.classList.add("link-disabled");
        
        if (!url.includes("home")) { 
            return
        }

        welcome.innerText = util.getStudentName(body)
        const gpa = util.getGPA(body, globalTerm);
        gradeAverageLabel.innerText = `Grade Average: ${gpa[1].toFixed(2)}%`
        setGPACircularView(gpa[0].toFixed(2))

        classesLabel.innerText = "Number of Courses: " + util.getClassCount(body, globalTerm)

    }).catch(function (error) {
        welcome.innerText = 'Error: \n' + error.message;
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
        speed = 1;


    let progress = setInterval(async () => {
        gpaStartValue += 0.3;

        gpaValue.textContent = `${(gpaStartValue/25).toFixed(2)}`
        const color = await util.getThemeColor()
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

// DropDown 

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        select.classList.toggle('selected-click');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(function callback(option, index) {
        option.addEventListener('click', () => {
            selected.innerText = "Term: " + option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
            globalTerm = index
            saveTerm(globalTerm)
            
            const gpa = util.getGPA(globalBody, globalTerm)
            gradeAverageLabel.innerText = `Grade Average: ${gpa[1].toFixed(2)}%`
            setGPACircularView(gpa[0].toFixed(2))

        });
    });
});


function saveTerm(term) {
    const termOption = {};
    termOption.term = term;
    chrome.storage.sync.set({ termOption });
}

async function loadTerm() {
    let termOption = {}
    const termData = await chrome.storage.sync.get("termOption");
    Object.assign(termOption, termData);

    if (termOption.termOption == null) {
        saveTerm(1)
        return
    }
    let term = termOption.termOption.term
    globalTerm = term    

    dropdowns.forEach(dropdown => {
        const options = dropdown.querySelectorAll('.menu li');
        const selected = dropdown.querySelector('.selected');
        options[term].classList.add('active')
        selected.innerText = "Term: " + options[term].innerText

    })
    onWindowLoad()
}

loadTerm()


async function getPowerschoolURL() {
    const data = await chrome.storage.sync.get("options");
    const options = {};
    Object.assign(options, data.options);
    console.log(options, options.url)
    if (options == null || options.url == null) {
        return
    }
    storedURL = util.safeURL(String(options.url))
}

getPowerschoolURL()
