const kick = new Tone.Player("/assets/samples/drums/kick.mp3").toDestination();
const snare = new Tone.Player("/assets/samples/drums/snare.mp3").toDestination();
const hihat = new Tone.Player("/assets/samples/drums/hi-hat.mp3").toDestination();

// ==============================================

const { Transport: T } = Tone;
const round = (x, places) =>  Number.parseFloat(x).toFixed(places);

let count = 0;

// ==============================================

const playBeat = () => {

  T.scheduleRepeat((time) => {
    
    hihat.start(time);

    if (count % 4 === 0) {
      kick.start(time);
    }
    if ((count + 2) % 4 === 0) {
      snare.start(time);
    }

    const [bars, beats, sixteenths] = T.position.split(':');
    console.log(
      'count: ', count, 
      '\ntime: ', round(time, 2), 
      '\nbars: ', bars, 
      '\nbeats: ', beats, 
      '\nsixteenths: ', round(sixteenths, 2)
    );

    count = (count + 1) % 16;
  }, "8n");
  
  T.start();
};

// ==============================================

const startBeat = () => Tone.start().then(() => {
  playBeat();
});

// ==============================================

const stopBeat = () => {
  T.stop();
  T.cancel();
  count = 0;
};

// ==============================================

const qs = x => document.querySelector(x);

const start_btn = qs('#start');
const stop_btn = qs('#stop');

start_btn.addEventListener('click', () => startBeat());
stop_btn.addEventListener('click', () => stopBeat());
