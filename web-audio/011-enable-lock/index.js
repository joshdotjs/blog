import { 
  qs, qsa,
  round, pad,
} from './util.js';

import {
  // Tracks, 
  playTracks,
  highlightStep, resetHighlightedSteps,
} from './Tracks.js';

// ==============================================

const { Transport: T } = Tone;

// let count = 0;
// const updateCount = () => count = (count + 1) % 16;

const getIndex = () => {
  const [bar, beat, sixteenth] = Tone.Transport.position.split(':').map(x => Number(x));
  const index = ((bar % 2) * 8) + (beat * 2) + (Math.floor(sixteenth) / 2);
  return { bar, beat, sixteenth, index };
};

// ==============================================

const loopCallback = (time) => {  

  const { bar, beat, sixteenth, index } = getIndex();

  console.log(
    'Tone.now(): ', Tone.now(),
    '\nT.ticks: ', Tone.Transport.ticks,
    '\nindex: ', index,
  );

  // Tracks.forEach(track => {
  //   if (track.pattern[count]) 
  //     track.start(time);
  // });
  playTracks(time, index);

  // https://github.com/Tonejs/Tone.js/wiki/Performance#syncing-visuals
  Tone.Draw.schedule(function(){
		//this callback is invoked from a requestAnimationFrame
		//and will be invoked close to AudioContext time
    // highlightStep(count);
    highlightStep(index);
    updateDisplay({ bar, beat, sixteenth, index });
	}, time) //use AudioContext time of the event

  // updateCount();
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

function updateDisplay({ bar, beat, sixteenth, index }) {
  // const [bars, beats, sixteenths] = T.position.split(':');
  
  // time_display.textContent = round(time, 2);
  bars_display.textContent = pad(bar + 1, 3);
  beats_display.textContent = beat + 1;
  count_display.textContent = pad(index + 1, 2);
} // updateDisplay()

function resetCount() {
  bars_display.textContent = '000';
  beats_display.textContent = '0';
  count_display.textContent = '00';
  // count = 0;
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

const increaseBPM = ()  =>  setBPM(Math.min(T.bpm.value + 10, 230));
const decreaseBPM = ()  =>  setBPM(Math.max(10, T.bpm.value - 10));
function setBPM(x) {
  T.bpm.value = x;
  bpm_display_value.innerText = Math.round(x);
}; // setBPM()
setBPM(140); // initialize to 140 bpm

bpm_button_up.addEventListener('click', increaseBPM);
bpm_button_down.addEventListener('click', decreaseBPM);
