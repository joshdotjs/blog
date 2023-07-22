// ==============================================

function loadHandler (event) {
  const file = event.target.files[0];
  console.log('file: ', file);

  const url = URL.createObjectURL(file);
  document.getElementById('track').setAttribute('src', url);
}

// ==============================================


const setupFileUpload = () => {
  const input = document.querySelector("#input");
  if (!input) throw new Error("No input element found");
  input.addEventListener("change", loadHandler, false);
};

// ==============================================

// ==============================================

try {
  setupFileUpload();
} catch(e) {
  console.error(e);
}