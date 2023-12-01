export function getNeededPoints(earned, total) {
    const initialGrade = earned/total*100;
    const initialGradeLetter = findGradeLetter(initialGrade);


    let newGrade = initialGrade;
    let newGradeLetter = initialGradeLetter;

    let pointsAddedPercent = 0;
    let pointsAddedLetter = 0;

    while (parseInt(initialGrade) == parseInt(newGrade)) {
        if(initialGrade.toFixed() >= 100) { break; }
        pointsAddedPercent++;
        console.log(newGrade)
        newGrade = ((earned + pointsAddedPercent)/(total + pointsAddedPercent)*100).toFixed();
        console.log(newGrade)
    }

    while (initialGradeLetter == newGradeLetter) {
        if(initialGradeLetter == "A") { break; }
        pointsAddedLetter ++;
        const tempGrade = (pointsAddedLetter + earned)/(pointsAddedLetter + total)*100
        newGradeLetter = findGradeLetter(tempGrade)
    }
    return [pointsAddedPercent, pointsAddedLetter]
}

export function findGradeLetter(grade) {
    let grade_letter = "Unknown"
    if(grade >= 93) { grade_letter = "A"}
    else if(grade >= 83) {grade_letter = "B"}
    else if(grade >= 73) {grade_letter = "C"}
    else if(grade >= 65) {grade_letter = "D"}
    else if(grade < 65) {grade_letter = "F"}
    
    return grade_letter
}


export function getCourseName(body) {
    const tbody = body.getElementsByTagName("tbody")[0];
    const tr = tbody.getElementsByTagName("tr")[1];
    const name = tr.getElementsByTagName("td")[0];
    return name.innerText;
}


export function getScore(score) {
    score = score.trim()
    const scoreSplit = score.split("/")
    if(scoreSplit[0].includes("--")) { return [0.0, 0.0]}
    const earned = parseFloat(scoreSplit[0])
    const total = parseFloat(scoreSplit[1])

    return [earned, total]
}

export function getGPA(body) {
    const tbody = body.querySelector("tbody");
    let trs = tbody.getElementsByTagName("tr");
    const size = trs.length-1
    let totalGPAS = 0;
    let gradeAverage = 0;
    let gradedClasses = 0;
    for (let i = 2; i < size; i++) {
        const tds = trs[i].getElementsByTagName("td");
        const a = tds[12].getElementsByTagName("a")[0];
        const className = formatClassName(tds).toLowerCase();

        if(!a) { continue }
        const split = a.innerHTML.split("<br>");
        if(split.length != 2) { continue }

        const grade = parseInt(split[0]);
        let value = findGPA(grade) + getWeightOfClass(className);
        totalGPAS += value;
        gradeAverage += grade;
        gradedClasses++;
    }    
    console.log(totalGPAS/gradedClasses)
    return [totalGPAS/gradedClasses, gradeAverage/gradedClasses];
}

export function formatClassName(tds) {
    const test = tds[11].innerText;
    let textArray = test.split("Email");
    let className = textArray[0];
    return className
}

export function getWeightOfClass(name) {
    if (name.includes("advance")) { return 0.5 }
    else if (name.includes("ap")) { return 1 }
    else { return 0 }
}


export function findGPA(grade) {
    let GPA = 0.0
    if(grade >= 97){ GPA = 4.0}
    else if(grade >= 93) {GPA = 4.0}
    else if(grade >= 90) {GPA = 3.7}
    else if(grade >= 87) {GPA = 3.3}
    else if(grade >= 83) {GPA = 3.0}
    else if(grade >= 80) {GPA = 2.7}
    else if(grade >= 77) {GPA = 2.3}
    else if(grade >= 73) {GPA = 2.0}
    else if(grade >= 70) {GPA = 1.7}
    else if(grade >= 67) {GPA = 1.3}
    else if(grade >= 65) {GPA = 1.0}
    else if(grade < 65) {GPA = 0.0}
    return GPA
}

export function getClassCount(body) {
    const tbody = body.querySelector("tbody");
    let trs = tbody.getElementsByTagName("tr");
    const size = trs.length-3

    return size;
}


export function getClassNames(body) {
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

export function getStudentName(body) {
    const txt = body.getElementsByTagName("h1")[0].innerText;
    const name = txt.split(": ")[1].split(" ")
    const first = name[1]
    const last = name[0].replace(",", "")
    return `Hello, ${first} ${last}`;
}

export async function getThemeColor() {
    let themeOptions = {}
    const themeData = await chrome.storage.sync.get("themeOptions");
    Object.assign(themeOptions, themeData);
    return themeOptions.themeOptions.color
}