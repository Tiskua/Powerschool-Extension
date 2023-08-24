

function onWindowLoad() {
    const welcome = document.querySelector('.welcome');
    const classesLabel = document.querySelector('.classes-label');
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
        const courseButton = document.querySelector("#course-btn");
        if (url.includes("score")) {
            courseButton.click();
            return;
        }

        welcome.innerText = getStudentName(body)
        setGPACircularView()

        classesLabel.innerText = "Number of Courses: " + getClassCount(body)
    }).catch(function (error) {
        welcome.innerText = 'There was an error injecting script : \n' + error.message;
    });
}

window.onload = onWindowLoad;

function getStudentName(body) {
    const txt = body.getElementsByTagName("h1")[0].innerText;
    const name = txt.split(": ")[1].split(" ")
    const first = name[1]
    const last = name[0].replace(",", "")
    return "Hi, " + first + " " + last;

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

function getClassCount(body) {
    const tbody = body.querySelector("tbody");
    let trs = tbody.getElementsByTagName("tr");
    const size = trs.length-3

    return size;
}

function getClassNames(body) {
    const tbody = body.querySelector("tbody");
    let trs = tbody.getElementsByTagName("tr");
    const size = trs.length-1
    let classNames = []
    for (let i = 2; i < size; i++) {
        const tds = trs[i].getElementsByTagName("td");
        const test = tds[11].innerText;
        let textArray = test.split("Email");
        let className = textArray[0];
        classNames.push(className);
    }    
    return classNames;
}

function getGPA(body) {
    const tbody = body.querySelector("tbody");
    let trs = tbody.getElementsByTagName("tr");
    const size = trs.length-1
    for (let i = 2; i < size; i++) {
        const tds = trs[i].getElementsByTagName("td");
        const test = tds[11].innerText;
        let textArray = test.split("Email");
        let className = textArray[0];
        classNames.push(className);
    }    
    return classNames;
}


// Circular GPA View

function setGPACircularView() {
    const circularGPA = document.querySelector(".circular-GPA"),
        gpaValue = document.querySelector(".GPA-value");

    let gpaStartValue = 0,
        gpaEndValue = 100,
        speed = 8;


    let progress = setInterval(() => {
        gpaStartValue += 1;

        gpaValue.textContent = `${gpaStartValue/25}`
        circularGPA.style.background = `conic-gradient(rgb(44, 190, 0) ${gpaStartValue * 3.6}deg, rgb(17, 17, 17) 0deg)`

        if(gpaStartValue == gpaEndValue) {
            clearInterval(progress);
        }
    }, speed);

}
