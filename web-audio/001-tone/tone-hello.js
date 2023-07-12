// create a synth and connect it to the master output (your speakers)
const synth = new Tone.Synth().toDestination();

function playSound() {
  // trigger a C4 note immediately
  synth.triggerAttackRelease("C4", "8n");
}

const play_btn = document.getElementById('play-button');
play_btn?.addEventListener('click', playSound);