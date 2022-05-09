function startStopwatch () {
    return new Date();
}

function millisecToTimeObj (timeInMs) {
    timeObj = {};
    timeObj.ms = timeInMs % 1000;
    timeInMs -= timeObj.ms;
    timeInMs /= 1000;
    timeObj.sec = timeInMs;// % 60;
    // timeInMs -= timeObj.sec;
    // timeInMs /= 60;
    // timeObj.min = timeInMs % 60;
    // timeInMs -= timeObj.min;
    // timeObj.hour = timeInMs / 60;
    return timeObj;
}

function stopStopwatch (startTime) {
    currentTime = new Date();
    timeOfReaction = currentTime - startTime;
    return millisecToTimeObj(timeOfReaction);
}

function updateTimeOfReaction (timeObj) {
    header = document.querySelector("h1");
    var timeString = /*timeObj.hour + ':' + timeObj.min + ':' 
                   + */timeObj.sec  + '.' + timeObj.ms;
    header.innerHTML = "Time<br>of<br>reaction is " + timeString;
}

function getRandomColor () {
    var simbols = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += simbols[Math.floor(simbols.length * Math.random())];
    }
    console.log(color);
    return color;
}

function getRandomPosition () {
    var xPosition = Math.random() * 0.9 
                  * document.documentElement.clientWidth;
    var yPosition = Math.random() * 0.8 
                  * document.documentElement.clientHeight;
    return {x: xPosition + "px", y: yPosition + "px"};
}

function getRandomFigure () {
    var figures = [
        "round", 
        "oval",
        "square",
        "rectangle",
        "upTriangle",
        "downTriangle",
        "leftTriangle",
        "rightTriangle",
        "urAngle",
        "ulAngle",
        "drAngle",
        "dlAngle",
        "trapezoid",
        "parallelogram"
    ];
    return figures[Math.floor(Math.random() * figures.length)];
}

function updateElement (div) {
    div.removeAttribute("style");
    div.className = getRandomFigure();

    switch(div.classList[0]) {
        case "trapezoid":
        case "drAngle":
        case "dlAngle":
        case "upTriangle":
            div.style.borderBottomColor = getRandomColor();
            break;
        case "downTriangle":
        case "urAngle":
        case "ulAngle":
            div.style.borderTopColor = getRandomColor();
            break;
        case "rightTriangle":
            div.style.borderLeftColor = getRandomColor();
            break;
        case "leftTriangle":
            div.style.borderRightColor = getRandomColor();
            break;
        default:
            div.style.background = getRandomColor();
    }

    div.style.position = "absolute";
    var position = getRandomPosition();
    div.style.left = position.x;
    div.style.top = position.y;
}



var body = document.querySelector("body");
var button = document.querySelector("button");
var div = document.createElement("div");
body.appendChild(div);

button.addEventListener("click", () => {
    var buttonDiv = document.querySelector("div");
    body.removeChild(buttonDiv);
    updateElement(div);
});

var startTime = startStopwatch();

div.addEventListener("click", () => {
    updateTimeOfReaction(stopStopwatch(startTime));
    startTime = startStopwatch();
    updateElement(div);
})

