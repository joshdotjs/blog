const kick = new Tone.Player("./kick.mp3").toDestination();
const snare = new Tone.Player("./snare.mp3").toDestination();
const hihat = new Tone.Player("./hi-hat.mp3").toDestination();

const playBeat = () => {
  Tone.Transport.scheduleRepeat((time) => {
      kick.start(time);
      hihat.start(time + 0.5);
      snare.start(time + 1);
      hihat.start(time + 1.5);
  }, "2n");
  
  Tone.Transport.start();
};

const startBeat = () => Tone.start().then(() => {
  playBeat();
});

const btn = document.querySelector('button');
btn?.addEventListener('click', () => startBeat());