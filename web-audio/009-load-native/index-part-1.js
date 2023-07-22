let audio_ctx;
let samples;

// ==============================================

const sample_paths = [
  '/assets/samples/drums/hi-hat.mp3',
  '/assets/samples/drums/kick.mp3',
  '/assets/samples/drums/snare.mp3',
];

// ==============================================

const start_ctx_button = document.querySelector('.start');
start_ctx_button?.addEventListener('click', async () => {
  audio_ctx = new AudioContext();
  console.log('audio context started');
});

// ==============================================

async function getFile(file_path) {
  const response = await fetch(file_path);
  const array_buffer = await response.arrayBuffer();
  const audio_buffer = await audio_ctx.decodeAudioData(array_buffer);
  return audio_buffer;
}

// ==============================================

async function setupSamples(paths) {
  const audio_buffers = [];
  for (let path of paths) {
    const audio_sample = await getFile(path);
    audio_buffers.push(audio_sample);
  }
  return audio_buffers;
}

// ==============================================

function playSample(audio_buffer, time) {
  const sample_source = audio_ctx.createBufferSource();
  sample_source.buffer = audio_buffer;
  sample_source.connect(audio_ctx.destination);
  sample_source.start(time);
}

// ==============================================

const setup_sapmles_button = document.querySelector('.setup-samples');
setup_sapmles_button?.addEventListener('click', () => {
  setupSamples(sample_paths).then((buffers) => {

    samples = buffers;
  });
});

// ==============================================

const play_button = document.querySelector('.play-samples');
play_button?.addEventListener('click', () => {
  const now = audio_ctx.currentTime;
  playSample(samples[0], now);
  playSample(samples[1], now + 0.5);
  playSample(samples[2], now + 1);
});