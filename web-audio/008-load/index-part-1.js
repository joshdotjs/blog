// ==============================================

const setupFileUpload = () => {
  const input = document.querySelector("#input");
  if (!input) throw new Error("No input element found");

  function handler (event) {
    console.log('event: ', event);
    console.log('event.target: ', event?.target);
    console.log('event.target.files: ', event?.target.files);

    const file_list = this.files;
    console.log('file_list: ', file_list);
  }
  input.addEventListener("change", handler, false);
};

// ==============================================

try {
  setupFileUpload();
} catch(e) {
  console.error(e);
}