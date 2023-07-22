let audio_ctx;
let sample;

// ==============================================

audio_ctx = new AudioContext();
console.log('step 1: audio context started');

setupSample().then((buffer) => {
  sample = buffer;
  console.log('step 2: sample loaded');
});

// ==============================================

async function getFile(file_path) {
  const response = await fetch(file_path);
  const array_buffer = await response.arrayBuffer();
  const audio_buffer = await audio_ctx.decodeAudioData(array_buffer);
  return audio_buffer;
}

// ==============================================

async function setupSample() {
  const audio_buffer = await getFile('/assets/samples/drums/hi-hat.mp3');
  return audio_buffer;
}

// ==============================================

function playSample(audio_buffer, time) {
  const sample_source = audio_ctx.createBufferSource();
  sample_source.buffer = audio_buffer;
  sample_source.connect(audio_ctx.destination);
  sample_source.start(time);
}


// ==============================================

const play_button = document.querySelector('.play-sample');
play_button?.addEventListener('click', () => {
  const now = audio_ctx.currentTime;
  playSample(sample, now);
});