const kick = new Tone.Player("./kick.mp3").toDestination();
const snare = new Tone.Player("./snare.mp3").toDestination();
const hihat = new Tone.Player("./hi-hat.mp3").toDestination();

const playBeat = () => {
  Tone.Transport.scheduleRepeat((time) => {
    hihat.start(time);
    hihat.start(time + 0.25);
    hihat.start(time + 0.5);
    hihat.start(time + 0.75);

    kick.start(time);
    snare.start(time + 0.5);
  }, "2n");
  
  Tone.Transport.start();
};

const startBeat = () => Tone.start().then(() => {
  playBeat();
});


const stopBeat = () => {
  Tone.Transport.stop();
  Tone.Transport.cancel();
};

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');

startButton?.addEventListener('click', () => startBeat());
stopButton?.addEventListener('click', () => stopBeat());
