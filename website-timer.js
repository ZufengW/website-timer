'use strict';

(function() {
  let startTime = new Date();

  const CONTAINER_CLASSNAME = "container-div";
  const CONTAINER_CLASSNAME_OFFSET = "container-div container-div_offset";

  let containerDiv = document.getElementById('container-div');
  let clickMoveDiv = document.getElementById('click-move-div');
  let totalTimeSpan = document.getElementById('total-time-span');
  let lapsList = document.getElementById('laps-list');
  let p3;
  let currLapTimeSpan;
  let lapButton = document.getElementById('lap-button');
  let pomoCheckbox = document.getElementById('pomo-checkbox');

  // clicking the button ends the current lap
  let prevLapTime = startTime;
  let lapNumber = 1;
  lapButton.addEventListener('click', function() {
      // make a Paragraph containing the lap time
      let currTime = Date.now();
      let lapTime = currTime - prevLapTime;
      let lapListItem = document.createElement('li');
      lapListItem.appendChild(document.createTextNode(
          "Lap " + lapNumber + ": " + msToTimeString(lapTime)
      ));
      lapsList.appendChild(lapListItem);
      lapListItem.scrollIntoView();

      // create p3 if it doesn't exist
      if (!p3) {
          p3 = document.createElement('p');
          p3.appendChild(document.createTextNode('Current lap: '));
          clickMoveDiv.appendChild(p3);
          currLapTimeSpan = document.createElement("span");
          p3.appendChild(currLapTimeSpan);
      }
      currLapTimeSpan.textContent = "";

      prevLapTime = currTime;
      lapNumber++;
  });

  // Update the total time and current lap every second
  window.setInterval(function() {
      totalTimeSpan.textContent = msToTimeString(Date.now() - startTime);
      if (currLapTimeSpan) {
          currLapTimeSpan.textContent = msToTimeString(Date.now() - prevLapTime);
      }
  }, 1000);

  // Toggle the container's offset when clicked
  clickMoveDiv.addEventListener('click', function() {
      if (containerDiv.className === CONTAINER_CLASSNAME) {
          containerDiv.className = CONTAINER_CLASSNAME_OFFSET;
      } else {
          containerDiv.className = CONTAINER_CLASSNAME;
      }
  });

  /* Converts an integer (ms time difference) to a time string of form "XmYs" */
  function msToTimeString(ms) {
    var numSeconds = Math.floor(ms / 1000);
    var numMins = Math.floor(numSeconds / 60);
    var remSeconds = numSeconds % 60;
    return numMins + "m" + remSeconds + 's';
  }

})();
