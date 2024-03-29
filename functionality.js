/* Initializing required variables */
var display = document.getElementById("inner-display");
var playButton = document.getElementById("play-button");
var pauseButton = document.getElementById("pause-button");
var refreshButton = document.getElementById("refresh-button");
var lapButton = document.getElementById("lap-button");

var min = 00;
var sec = 00;
var miliSec = 00;
var intervalId;
var startTime = "0:0:0";
var endTime = "0:0:0";

display.innerText = min + ":" + sec + "." + miliSec;
refreshButton.classList.add("hide");
lapButton.classList.add("hide");

/* This event listner is responsible for play functionality */
playButton.addEventListener("click", function (event) {
  event.preventDefault();

  playButton.classList.add("hide");
  pauseButton.classList.remove("hide");

  refreshButton.classList.remove("hide");
  lapButton.classList.remove("hide");

  intervalId = setInterval(function () {
    miliSec += 1;
    if (miliSec >= 100) {
      miliSec = 0;
      sec += 1;
    }

    if (sec >= 60) {
      sec = 0;
      min++;
    }
    display.innerText = min + ":" + sec + "." + miliSec;
  }, 10);
});
/* This event listner is responsible for pause functionality */
pauseButton.addEventListener("click", function (event) {
  event.preventDefault();

  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");

  clearTimeout(intervalId);
});

/* This event listner is responsible for clearing time when refresh button is pressed*/
refreshButton.addEventListener("click", function (event) {
  event.preventDefault();
  clearTimeout(intervalId);
  var lapList = document.getElementsByClassName("lap-elem");
  //lapList.remove();
  // for (var elem in lapList) {
  //   lapList[elem].remove();
  // }
  var len = lapList.length;
  var index = 0;

  for (index; index < len; index++) {
    lapList[0].remove();
  }
  startTime = "0:0:0";
  endTime = "0:0:0";
  min = 0;
  sec = 0;
  miliSec = 0;
  display.innerText = min + ":" + sec + "." + miliSec;
  refreshButton.classList.add("hide");
  lapButton.classList.add("hide");
  playButton.classList.remove("hide");
  pauseButton.classList.add("hide");
});

/* Creating laps and appending them in lap-area*/
var serialNo = 0;
lapButton.addEventListener("click", function () {
  let postLap = function () {
    endTime = display.innerText;
    var tempStartTime = startTime;
    startTime = endTime;
    serialNo++;
    var elemDiv = document.createElement("div");
    elemDiv.classList.add("lap-elem");

    var span1 = document.createElement("span");
    span1.innerHTML = serialNo;

    var span2 = document.createElement("span");
    span2.innerHTML = tempStartTime;

    var span3 = document.createElement("span");
    span3.innerHTML = endTime;

    elemDiv.appendChild(span1);
    elemDiv.appendChild(span2);
    elemDiv.appendChild(span3);

    return elemDiv;
  };

  let lap = postLap();
  document.getElementById("lap-area").prepend(lap);
});
