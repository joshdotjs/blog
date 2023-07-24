const qs = x => document.querySelector(x);
const qsa = x => document.querySelectorAll(x);

// ==============================================

class Track {
  pattern = [];
  name = '';
  player = new Tone.Player().toDestination();
  steps = []; // DOM elements

  constructor({ pattern, name, path, steps }) {
    this.pattern = pattern;
    this.name = name;
    this.player.load(path);
    this.steps = steps;
    // <div class="steps">
    //   <div class="step step-A"></div>
    //   ...
    //   <div class="step step-B"></div>
    //   </div>
    // </div>
  }

  toggleUI(index) {
    this.steps[index].classList.toggle('step-on');
  }

  togglePattern(index) {
    // Tracks[i].pattern[j] = Tracks[i].pattern[j] ? 0 : 1;
    this.pattern[index] = this.pattern[index] ? 0 : 1;
  }

  toggle(index) {
    this.togglePattern(index);
    this.toggleUI(index);
  }

  start(time) {
    this.player.start(time);
  }
}

// ==============================================

const patterns = [
  [1, 1, 1, 1,    1, 1, 1, 1,    1, 1, 1, 1,   1, 1, 1, 1,], // hi-hat
  [1, 0, 1, 0,    0, 0, 0, 1,    0, 1, 1, 0,   0, 1, 0, 1,], // kick
  [0, 0, 0, 0,    1, 0, 0, 0,    0, 0, 0, 0,   1, 0, 0, 0,], // snare
];

// ==============================================

const Tracks = [
  new Track({ 
    pattern: [1, 1, 1, 1,    1, 1, 1, 1,    1, 1, 1, 1,   1, 1, 1, 1,], 
    name: 'hi-hat',
    path: '/assets/samples/drums/hi-hat.mp3',
    steps: qsa('.track-0 > .steps > .step'),
  }),
  new Track({ 
    pattern: [1, 0, 1, 0,    0, 0, 0, 1,    0, 1, 1, 0,   0, 1, 0, 1,], 
    name: 'kick',
    path: '/assets/samples/drums/kick.mp3',
    steps: qsa('.track-1 > .steps > .step'),
  }),
  new Track({ 
    pattern: [0, 0, 0, 0,    1, 0, 0, 0,    0, 0, 0, 0,   1, 0, 0, 0,], 
    name: 'snare',
    path: '/assets/samples/drums/snare.mp3',
    steps: qsa('.track-2 > .steps > .step'),
  }),
];

console.log(Tracks[0].steps);

// ==============================================

// const tracks = qsa('.track > .steps'); // tracks stores one row of .steps
let Steps = []; // Steps stores all .step elements in one .steps
// tracks.forEach((track, i) => {
Tracks.forEach((Track, i) => {
  // const steps = track.querySelectorAll('.step');
  const steps = Track.steps;
  Steps.push(steps);
  steps.forEach((step, j) => {

    // initialize the UI to match initial patterns
    // if (patterns[i][j])
    // if (Tracks[i].pattern[j])
    if (Track.pattern[j]) {
      // steps[j].classList.toggle('step-on'); // TODO
      Track.toggleUI(j);
    }

    // toggle the pattern and UI when a step is clicked
    step.addEventListener('click', () => {
      // patterns[i][j] = patterns[i][j] ? 0 : 1;
      // Tracks[i].pattern[j] = Tracks[i].pattern[j] ? 0 : 1;
      // Tracks[i].toggle(j);
      Track.toggle(j);

      // steps[j].classList.toggle('step-on');
      // absorbed into Track.toggle()
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
  
  // Steps.forEach((steps, i) => {
  Tracks.forEach((Track, i) => {
    // steps[is_prev_idx_pos ? prev_idx : 15].classList.remove('current');
    Track.steps[is_prev_idx_pos ? prev_idx : 15].classList.remove('current');

    // steps[count].classList.add('current');
    Track.steps[count].classList.add('current');
  });
};

const resetHighlightedSteps = () => {
  console.log('resetting highlighted steps');
  // Steps.forEach(steps => {
  //   steps.forEach(step => step.classList.remove('current'));
  // });

  Tracks.forEach(Track => {
    Track.steps.forEach(step => step.classList.remove('current'));
  });
}

// ==============================================

const loopCallback = (time) => {  
  // if (patterns[0][count]) hihat.start(time);
  // if (Tracks[0].pattern[count]) Tracks[0].start(time);
  
  // // if (patterns[1][count]) kick.start(time);
  // if (Tracks[1].pattern[count]) Tracks[1].start(time);

  // // if (patterns[2][count]) snare.start(time);
  // if (Tracks[2].pattern[count]) Tracks[2].start(time);

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

const increaseBPM = ()  => setBPM(Math.min(T.bpm.value + 10, 300));
const decreaseBPM = ()  => setBPM(Math.max(10, T.bpm.value - 10));
function setBPM(x) {
  T.bpm.value = x;
  bpm_display_value.innerText = x;
}; // setBPM()
setBPM(140); // initialize to 140 bpm

bpm_button_up.addEventListener('click', increaseBPM);
bpm_button_down.addEventListener('click', decreaseBPM);
