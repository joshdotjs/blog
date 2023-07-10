// create a synth and connect it to the master output (your speakers)
let synth = new Tone.Synth().toDestination();

function playSound() {
  // trigger a C4 note immediately
  synth.triggerAttackRelease("C4", "8n");

  console.log('clicked');
}

document.getElementById('play-button').addEventListener('click', playSound);