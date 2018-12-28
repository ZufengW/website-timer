'use strict';

(function() {
  let startTime = new Date();
  /** Total number of times the update function ran.
   * Represents how long the webpage was running for.
   */
  let totalTicks = 0;
  /** Number of ticks during which the page content was partially visible */
  let totalVisibleTicks = 0;

  let containerDiv  = document.getElementById('container-div');
  let clickMoveDiv  = document.getElementById('click-move-div');
  let totalTimeSpan = document.getElementById('total-time-span');
  let lapsList      = document.getElementById('laps-list');
  let p3;
  let currLapTimeSpan;
  let lapButton     = document.getElementById('lap-button');
  let pomoCheckbox  = document.getElementById('pomo-checkbox');
  let sideContainerDiv  = document.getElementById('side-container-div');
  let totalTicksSpan    = document.getElementById('total-ticks-span');
  let visibleTicksSpan  = document.getElementById('visible-ticks-span');

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
      totalTicks++;

      // Is the page at least partially visible?
      if (document.visibilityState === 'visible') {
        totalVisibleTicks++;
      }

      // Update the total ticks display if the side container visible
      if (elementVisible(sideContainerDiv)) {
        totalTicksSpan.textContent = sToTimeString(totalTicks);
        visibleTicksSpan.textContent = sToTimeString(totalVisibleTicks);
      }
  }, 1000);

  /* Converts an integer (ms time diff) to a time string of form "Xm Ys" */
  function msToTimeString(ms) {
    return sToTimeString(Math.floor(ms / 1000));
  }

  /* Converts an integer (time diff in seconds) to a string of form "Xm Ys" */
  function sToTimeString(numSeconds) {
    let numMins = Math.floor(numSeconds / 60);
    let remSeconds = numSeconds % 60;
    return numMins + 'm ' + remSeconds + 's';
  }

  /** returns whether or not the DOM element is visible */
  function elementVisible(element) {
    return (element.offsetWidth > 0 && element.offsetHeight > 0);
  }
})();
