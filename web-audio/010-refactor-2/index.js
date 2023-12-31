import { 
  qs, qsa,
  round, pad,
} from './util.js';

import {
  Tracks,
  highlightStep, resetHighlightedSteps
} from './Tracks.js';

// ==============================================

const { Transport: T } = Tone;

let count = 0;
const updateCount = () => count = (count + 1) % 16;

// ==============================================

const loopCallback = (time) => {  
  Tracks.forEach(track => {
    if (track.pattern[count]) 
      track.start(time);
  });

  highlightStep(count);
  updateDisplay(time);
  updateCount();
}; // loopCallback()

// ==============================================

const playBeat = () => {
  T.scheduleRepeat((t) => loopCallback(t), "8n");
  T.start();
}; // playBeat()

// ==============================================

const startBeat = async () => {
  // Tone.start().then(() => playBeat());
  await Tone.start();
  playBeat();
}; // startBeat()

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

const changeBeatState = (next) => () => {
  if (next === 'play') {
    startBeat();
    start_btn.disabled = true;
    stop_btn.disabled = false;
    pause_btn.disabled = false;
  } // if (next === 'play')

  if (next === 'stop') {
    stopBeat();
    start_btn.disabled = false;
    stop_btn.disabled = true;
    pause_btn.disabled = true;
  } // if (next === 'pause')

  if (next === 'pause') {
    pauseBeat();
    if (paused) {
      start_btn.disabled = true;
      stop_btn.disabled = true;
      pause_btn.disabled = false;
    } else {
      start_btn.disabled = true;
      stop_btn.disabled = false;
      pause_btn.disabled = false;
    }
  } // if (next === 'stop')
}

start_btn.addEventListener('click', changeBeatState('play'));
stop_btn.addEventListener('click',  changeBeatState('stop'));
pause_btn.addEventListener('click', changeBeatState('pause'));

// ==============================================

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
} // resetCount()

// ==============================================

// const volume_control = qs('#volume');
// volume_control.addEventListener('input', ({ target: { value } }) => {
//   Tone.Destination.volume.value = value - 50; // Tone.js uses a decibel scale for volume where 0 is maximum and -Infinity is minimum.
// });

// ==============================================

const bpm_display = qs('.bpm-display');
const bpm_display_value = bpm_display.querySelector('.bpm-display-value');
const bpm_button_up = bpm_display.querySelector('.bpm-display-button-up');
const bpm_button_down = bpm_display.querySelector('.bpm-display-button-down');

const increaseBPM = ()  =>  setBPM(Math.min(T.bpm.value + 10, 300));
const decreaseBPM = ()  =>  setBPM(Math.max(10, T.bpm.value - 10));
function setBPM(x) {
  T.bpm.value = x;
  bpm_display_value.innerText = x;
}; // setBPM()
setBPM(140); // initialize to 140 bpm

bpm_button_up.addEventListener('click', increaseBPM);
bpm_button_down.addEventListener('click', decreaseBPM);
