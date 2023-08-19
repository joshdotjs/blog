// ==============================================

const default_tracks = [
  {
    pattern: [1, 1, 1, 1,    1, 1, 1, 1,    1, 1, 1, 1,   1, 1, 1, 1,], 
    name: 'hi-hat',
    path: '/_assets/samples/drums/hi-hat.mp3',
    enabled: true,
    locked: false,
  },
  { 
    pattern: [1, 0, 1, 0,    0, 0, 0, 1,    0, 1, 1, 0,   0, 1, 0, 1,], 
    name: 'kick',
    path: '/_assets/samples/drums/kick.mp3',
    enabled: true,
    locked: true,
  },
  { 
    pattern: [0, 0, 0, 0,    1, 0, 0, 0,    0, 0, 0, 0,   1, 0, 0, 0,], 
    name: 'snare',
    path: '/_assets/samples/drums/snare.mp3',
    enabled: true,
    locked: false,
  }
];

// ==============================================

export { default_tracks };