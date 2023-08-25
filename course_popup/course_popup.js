function onWindowLoad() {
    const h1 = document.getElementsByTagName("h1");
    chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        var activeTab = tabs[0];
        var activeTabId = activeTab.id;
        return chrome.scripting.executeScript({
            target: { tabId: activeTabId },
            func: DOMtoString,
            args: ['body']  // you can use this to target what element to get the html for
        });
        

    }).then(function (results) {
        var parser = new DOMParser();
	    var body = parser.parseFromString(results[0].result, 'text/html');
        getData(body)

    }).catch(function (error) {
        h1.innerText = 'There was an error injecting script : \n' + error.message;
    });
}

window.onload = onWindowLoad;

function getData(body) {
    const main = body.getElementsByTagName("tbody")[0]
    const trs = main.getElementsByTagName("tr")
    for (let i = 0; i < trs.length; i++) {
        const tds = trs[i].querySelectorAll("td")
        // if (tds.size() < 10) {continue}
        // let date = tds[0].text()
        // let category = tds[1].text()
        // let score = tds[10].text()
        let name = tds[2].getElementsByTagName("span").innerText
        console.log(name)
    }
    return trs
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

