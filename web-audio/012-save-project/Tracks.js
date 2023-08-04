// Keep UI functional (non OOP)

import Track from './Track.js';
import { qs, listeForEvent, setLS, getLS } from './util.js';
import { notification } from './notification.js';
import { default_tracks } from './data/track-templates.js';

// ==============================================

function loadTracks (tracks) {
  return tracks.map((track, idx) => new Track({ 
    pattern: track.pattern, 
    name: track.name,
    path: track.path,
    enabled: track.enabled,
    locked: track.locked,
    // elem: qs(`.track-${idx}`),
    num: idx,
  }));
};

// ==============================================

let Tracks = [];

const ls_tracks = getLS('tracks');

if (ls_tracks) {
  Tracks = loadTracks(ls_tracks);
} else {
  Tracks = loadTracks(default_tracks);
  setLS('tracks', default_tracks);
}

// ==============================================

listeForEvent('track-change', (event) => {
  console.log('track-change EVENT fired and caught!');
  console.log(event.detail.data.data_key);

  const tracks = Tracks.map(track => track.getData());
  console.log('tracks: ', tracks);

  setLS('tracks', tracks);
});

// ==============================================

listeForEvent('project-save', (event) => {
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

listeForEvent('project-open', (event) => {

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
      Tracks = loadTracks(loaded_tracks);
      setLS('tracks', loaded_tracks);


      // THERE IS A BUG HERE LOADING THE FILE
      // THERE IS A BUG HERE LOADING THE FILE
      // THERE IS A BUG HERE LOADING THE FILE
      // THERE IS A BUG HERE LOADING THE FILE
      // THERE IS A BUG HERE LOADING THE FILE
      // THERE IS A BUG HERE LOADING THE FILE
      // THERE IS A BUG HERE LOADING THE FILE
    };

    // Read the file as text
    reader.readAsText(file);

    // show notification to user:
    const message = `Opened project: ${file.name}`;
    notification({ message });

    document.body.removeChild(element);
  }; // callback()

  element.addEventListener('change', callback)
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

export { 
  Tracks, playTracks,
  highlightStep, resetHighlightedSteps,
};

// ==============================================
