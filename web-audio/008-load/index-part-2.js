// ==============================================

function loadHandler (event) {
  const file = event.target.files[0];
  console.log('file: ', file);

  const audio = document.querySelector("#html-audio");
  if (!audio) throw new Error("<audio> element not found");

  const url = URL.createObjectURL(file);
  audio.setAttribute('src', url);
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