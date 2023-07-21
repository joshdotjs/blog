const qs = x => document.querySelector(x);
const qsa = x => document.querySelectorAll(x);

// ==============================================

const patterns = [
  [1, 1, 1, 1,    1, 1, 1, 1,    1, 1, 1, 1,   1, 1, 1, 1,], // hi-hat
  [1, 0, 1, 0,    0, 0, 0, 1,    0, 1, 1, 0,   0, 1, 0, 1,], // kick
  [0, 0, 0, 0,    1, 0, 0, 0,    0, 0, 0, 0,   1, 0, 0, 0,], // snare
];

const tracks = qsa('.track > .steps');
let Steps = [];

tracks.forEach((track, i) => {
  const steps = track.querySelectorAll('.step');
  Steps.push(steps);
  steps.forEach((step, j) => {

    // initialize the UI to match initial patterns
    if (patterns[i][j])
      steps[j].classList.toggle('step-on');

    // toggle the pattern and UI when a step is clicked
    step.addEventListener('click', () => {
      patterns[i][j] = patterns[i][j] ? 0 : 1;
      steps[j].classList.toggle('step-on');
    });
  });
});

// ==============================================

const kick = new Tone.Player("/assets/samples/drums/kick.mp3").toDestination();
const snare = new Tone.Player("/assets/samples/drums/snare.mp3").toDestination();
const hihat = new Tone.Player("/assets/samples/drums/hi-hat.mp3").toDestination();

// ==============================================

const { Transport: T } = Tone;
const round = (x, places) =>  Number.parseFloat(x).toFixed(places);
const pad = (x, places) => String(x).padStart(places, '0');

let count = 0;
const updateCount = () => count = (count + 1) % 16;

// ==============================================

const highlightStep = (count) => {
  const prev_idx = count - 1;
  const is_prev_idx_pos = prev_idx >= 0;
  
  Steps.forEach((steps, i) => {
    steps[is_prev_idx_pos ? prev_idx : 15].classList.remove('current');
    steps[count].classList.add('current');
  });
};

const resetHighlightedSteps = () => {
  console.log('resetting highlighted steps');
  Steps.forEach(steps => {
    steps.forEach(step => step.classList.remove('current'));
  });
}

// ==============================================

const loopCallback = (time) => {
  
  if (patterns[0][count])
    hihat.start(time);

  if (patterns[1][count])
    kick.start(time);

  if (patterns[2][count])
    snare.start(time);

  highlightStep(count);
  updateDisplay(time);
  updateCount();
}; // loop()

// ==============================================

const playBeat = () => {
  T.scheduleRepeat(t => loopCallback(t), "8n");
  T.start();
}; // playBeat()

// ==============================================

const startBeat = () => Tone.start().then(() => {
  playBeat();
}); // startBeat()

// ==============================================

const stopBeat = () => {
  T.stop();
  T.cancel();
  resetHighlightedSteps();
  resetCount();
}; // stopBeat()

// ==============================================

let paused = false;
const pauseBeat = () => {
  if (paused) T.start();
  else  T.pause();

  paused = !paused;
}; // stopBeat()

// ==============================================

const master_controls = qs('.master-controls');
const start_btn = master_controls.querySelector('.master-control-play');
const stop_btn = master_controls.querySelector('.master-control-stop');
const pause_btn = master_controls.querySelector('.master-control-pause');

start_btn.addEventListener('click', () => {

  // TODO: 
  console.log('Tone.context.state: ', Tone.context.state);

  startBeat();

  // TODO: Move into playing state function
  start_btn.disabled = true;
  stop_btn.disabled = false;
  pause_btn.disabled = false;
});


stop_btn.addEventListener('click', () => {
  stopBeat();

  // TODO: Move into stopped state function
  start_btn.disabled = false;
  stop_btn.disabled = true;
  pause_btn.disabled = true;
});
pause_btn.addEventListener('click', () => {
  pauseBeat();

  // TODO: Move into paused state function
  if (paused) {
    start_btn.disabled = true;
    stop_btn.disabled = true;
    pause_btn.disabled = false;
  } else {
    start_btn.disabled = true;
    stop_btn.disabled = false;
    pause_btn.disabled = false;
  }
});

// const time_display = qs('#time > span');
const timing_display = qs('.timing-display');
const count_display  = timing_display.querySelector('.timing-display-count');
const bars_display   = timing_display.querySelector('.timing-display-bars');
const beats_display  = timing_display.querySelector('.timing-display-beats');

function updateDisplay(time) {
  const [bars, beats, sixteenths] = T.position.split(':');
  // time_display.textContent = round(time, 2);
  bars_display.textContent = pad(bars, 3);
  beats_display.textContent = beats;
  count_display.textContent = pad(count, 2);
} // updateDisplay()

function resetCount() {
  bars_display.textContent = '000';
  beats_display.textContent = '0';
  count_display.textContent = '00';
  count = 0;
}

// ==============================================

const volume_control = qs('#volume');
volume_control.addEventListener('input', ({ target: { value } }) => {
  Tone.Destination.volume.value = value - 50; // Tone.js uses a decibel scale for volume where 0 is maximum and -Infinity is minimum.
});

// ==============================================

const bpm_control = qs('#bpm');
bpm_control.addEventListener('input', ({ target: { value } }) => {
  T.bpm.value = value;
});