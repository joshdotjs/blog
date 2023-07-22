const player = new Tone.Player().toDestination();

// ==============================================

function loadHandler (event) {
  const file = event.target.files[0];
  console.log('file: ', file);

  const audio = document.querySelector("#html-audio");
  if (!audio) throw new Error("<audio> element not found");

  // load .mp3 into <audio>
  const url = URL.createObjectURL(file);
  audio.setAttribute('src', url);

  // load .mp3 into Tone.js (and play it)
  player.load(url).then(() => {
    Tone.Transport.start();
    player.start()
  });

  const button = document.querySelector("#html-button-play-tone");
  if (!button) throw new Error("<button> element not found");

  button.addEventListener("click", () => {
    player.start();
  });
}

// ==============================================

const setupFileUpload = () => {
  const input = document.querySelector("#html-input");
  if (!input) throw new Error("<input> element not found");

  input.addEventListener("change", loadHandler, false);
};

// ==============================================

try {
  setupFileUpload();
} catch(e) {
  console.error(e);
}