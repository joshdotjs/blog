import { qs, listenForEvent, setLS, getLS, pad } from './util.js';
import Track from './Track.js';
// import { qs, listenForEvent, setLS, getLS } from './util.js';
import { notification } from './notification.js';
import { default_tracks } from './data/track-templates.js';

// ==============================================

// Components:
import './comps/comps.js';

// ==============================================

function setTracks (tracks) {
  console.log('setTracks()');
  
  setLS('tracks', tracks);

  const Tracks = tracks.map((track, idx) => new Track({ 
    pattern: track.pattern, 
    name: track.name,
    path: track.path,
    enabled: track.enabled,
    locked: track.locked,
    num: idx,
  }));
  return Tracks;
};

// ==============================================

let Tracks = [];

// Possible ways to set Tracks::
//
// 1. program loads for first time (no LS) and intializes with default tracks
//    - ls_tracks === null
//    - Tracks = loadTracks(default_tracks);
//    - setLS('tracks', default_tracks);
//
// 2. program loads and LS has tracks, so load those tracks
//    - ls_tracks !== null
//    - Tracks = loadTracks(ls_tracks);
//
// 3. user opens a project file, so load those tracks and reset LS
//    - ls_tracks !== null
//    - Tracks = loadTracks(loaded_tracks);
//    - setLS('tracks', loaded_tracks);
//
// 4. user resets program, so remove LS and reset with default tracks
//    - ls_tracks !== null
//    - Tracks = loadTracks(default_tracks);
//    - setLS('tracks', default_tracks);

// ==============================================

// Set Tracks case [1] or [2] - Paage load cases
const ls_tracks = getLS('tracks');
if (ls_tracks) {
  Tracks = setTracks(ls_tracks); // this sets LS even though LS is already set [K.I.S.S.]
} else {
  Tracks = setTracks(default_tracks);
}


// ==============================================

listenForEvent('track-change', (event) => {
  // console.log('track-change EVENT fired and caught!');
  // console.log(event.detail.data.data_key);

  const tracks = Tracks.map(track => track.getData());
  console.log('tracks: ', tracks);

  setLS('tracks', tracks);
});

// ==============================================

listenForEvent('project-save', (event) => {
  console.clear();
  console.log('project-save EVENT fired and caught!');

  const tracks = Tracks.map(track => track.getData());
  console.log('tracks: ', tracks);

  function download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  // download("hello.txt", "This is the content of my file :)");
  download("project.txt", JSON.stringify(tracks));
  // download("project.wa", JSON.stringify(tracks));
});

// ==============================================

listenForEvent('project-open', (event) => {
  console.clear();
  console.log('project-open EVENT fired and caught!');

  const element = document.createElement('input');
  element.setAttribute('type', 'file');
  element.setAttribute('accept', '.txt');
  element.setAttribute('style', 'display: none;');
  document.body.appendChild(element);

  element.click();

  const callback = (e) => {

    // upload file
    const file = e.target.files[0];
    console.log('file: ', file);

    const reader = new FileReader();
    reader.onload = function(e) {
      // The file's text will be printed here
      console.log(e.target.result);
      const loaded_tracks = JSON.parse(e.target.result);
      console.log('loaded_tracks: ', loaded_tracks);

      // load tracks from opened project into current project
      Tracks = setTracks(loaded_tracks);
    };

    // Read the file as text
    reader.readAsText(file);

    // show notification to user:
    const message = `Opened project: ${file.name}`;
    notification({ message });

    document.body.removeChild(element);
  }; // callback()

  element.addEventListener('change', callback);
});

// ==============================================

listenForEvent('project-reset', (event) => {
  console.clear();
  console.log('project-reset EVENT fired and caught!');
  // Set Tracks case [4] - User clicks 'reset project' button
  Tracks = setTracks(default_tracks);
});

// ==============================================

const playTracks = (time, index) => {

  Tracks.forEach((track) => {

    if (!track.enabled) return;

    if (track.pattern[index]) 
      track.start(time);
  });
};

// ==============================================

const highlightStep = (index) => {

  const prev_idx = index - 1;
  const is_prev_idx_pos = prev_idx >= 0;

  Tracks.forEach(track => {

    if (!track.enabled) return;

    track.steps[is_prev_idx_pos ? prev_idx : 15].classList.remove('current');
    track.steps[index].classList.add('current');
  });
};

// ==============================================

const resetHighlightedSteps = () => {
  Tracks.forEach(track => {
    track.steps.forEach(step => step.classList.remove('current'));
  });
}

// ==============================================

const { Transport: T } = Tone;

const getIndex = () => {
  const [bar, beat, sixteenth] = Tone.Transport.position.split(':').map(x => Number(x));
  const index = ((bar % 2) * 8) + (beat * 2) + (Math.floor(sixteenth) / 2);
  return { bar, beat, sixteenth, index };
};

// ==============================================

const loopCallback = (time) => {  

  const { bar, beat, sixteenth, index } = getIndex();

  // console.log(
  //   'Tone.now(): ', Tone.now(),
  //   '\nT.ticks: ', Tone.Transport.ticks,
  //   '\nindex: ', index,
  // );

  playTracks(time, index);

  // https://github.com/Tonejs/Tone.js/wiki/Performance#syncing-visuals
  Tone.Draw.schedule(function(){
		//this callback is invoked from a requestAnimationFrame
		//and will be invoked close to AudioContext time
    highlightStep(index);
    updateDisplay({ bar, beat, sixteenth, index });
	}, time) //use AudioContext time of the event

}; // loopCallback()

// ==============================================

const playBeat = () => {
  T.scheduleRepeat((t) => loopCallback(t), "8n");
  T.start();
}; // playBeat()

// ==============================================

const startBeat = async () => {
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
  // bars_display.textContent = pad(bar + 1, 3);
  // beats_display.textContent = beat + 1;
  // count_display.textContent = pad(index + 1, 2);
  bars_display.textContent = pad(bar + 1, 3);
  beats_display.textContent = Math.floor(index / 4) + 1;
  count_display.textContent = (index) % 4 + 1;
} // updateDisplay()

function resetCount() {
  bars_display.textContent = '000';
  beats_display.textContent = '0';
  count_display.textContent = '0';
  // count = 0;
} // resetCount()

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
