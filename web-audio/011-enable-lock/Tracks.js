// Keep UI functional (non OOP)

import Track from './Track.js';
import {  qs } from './util.js';

// ==============================================

const Tracks = [
  new Track({ 
    pattern: [1, 1, 1, 1,    1, 1, 1, 1,    1, 1, 1, 1,   1, 1, 1, 1,], 
    name: 'hi-hat',
    path: '/assets/samples/drums/hi-hat.mp3',
    // steps: qsa('.track-0 > .steps > .step'),
    // load_btn: qs('.track-0 > .track-title-container'),
    elem: qs('.track-0'),
  }),
  new Track({ 
    pattern: [1, 0, 1, 0,    0, 0, 0, 1,    0, 1, 1, 0,   0, 1, 0, 1,], 
    name: 'kick',
    path: '/assets/samples/drums/kick.mp3',
    // steps: qsa('.track-1 > .steps > .step'),
    // load_btn: qs('.track-1 > .track-title-container'),
    elem: qs('.track-1'),
  }),
  new Track({ 
    pattern: [0, 0, 0, 0,    1, 0, 0, 0,    0, 0, 0, 0,   1, 0, 0, 0,], 
    name: 'snare',
    path: '/assets/samples/drums/snare.mp3',
    // steps: qsa('.track-2 > .steps > .step'),
    // load_btn: qs('.track-2 > .track-title-container'),
    elem: qs('.track-2'),
  }),
];

// ==============================================

const highlightStep = (count) => {
  const prev_idx = count - 1;
  const is_prev_idx_pos = prev_idx >= 0;

  Tracks.forEach(Track => {
    Track.steps[is_prev_idx_pos ? prev_idx : 15].classList.remove('current');
    Track.steps[count].classList.add('current');
  });
};

// ==============================================

const resetHighlightedSteps = () => {
  Tracks.forEach(Track => {
    Track.steps.forEach(step => step.classList.remove('current'));
  });
}

// ==============================================

export { 
  Tracks, 
  highlightStep, resetHighlightedSteps
};