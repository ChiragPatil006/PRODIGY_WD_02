let startTime, interval;
    let elapsed = 0;
    let running = false;

    function updateDisplay() {
      const display = document.getElementById("time-display");
      const hand = document.getElementById("watch-hand");
      const now = Date.now();
      const total = elapsed + (running ? now - startTime : 0);
      const ms = total % 1000;
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / (1000 * 60)) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

      display.textContent =
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + '.' +
        String(ms).padStart(3, '0');

      const rotation = (seconds + ms / 1000) / 60 * 180;
      hand.style.transform = `rotate(${rotation}deg)`;
    }

    function startStopwatch() {
      if (!running) {
        startTime = Date.now();
        interval = setInterval(updateDisplay, 50);
        running = true;
      }
    }

    function pauseStopwatch() {
      if (running) {
        elapsed += Date.now() - startTime;
        clearInterval(interval);
        running = false;
      }
    }

    function resetStopwatch() {
      clearInterval(interval);
      running = false;
      elapsed = 0;
      updateDisplay();
      document.getElementById("lap-list").innerHTML = '';
    }

    function recordLap() {
      const lapList = document.getElementById("lap-list");
      const lapTime = document.getElementById("time-display").textContent;
      const lapItem = document.createElement("li");
      lapItem.className = "lap-entry";
      const id = "note" + Date.now();

      lapItem.innerHTML = `
        <div>${lapTime}</div>
        <div class='note-icon' onclick="toggleNote('${id}')">📝</div>
        <div class='lap-note' id='${id}'><input type='text' placeholder='Add a note...'></div>
      `;

      lapList.prepend(lapItem);
    }

    function toggleNote(id) {
      const noteDiv = document.getElementById(id);
      noteDiv.style.display = noteDiv.style.display === 'none' || noteDiv.style.display === '' ? 'block' : 'none';
    }

    updateDisplay();