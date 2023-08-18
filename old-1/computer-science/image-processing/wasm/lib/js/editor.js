// Retrieve Elements
const executeCodeBtn = document.querySelector('.editor__run');
const resetCodeBtn = document.querySelector('.editor__reset');

// Setup Ace
let codeEditor = ace.edit("editorCode");
let defaultCode = 
`const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

function grayscale(imgData) {
    const data = imgData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    ctx.putImageData(imgData, 0, 0);
}

grayscale(imgData);`;

let editorLib = {
    init() {
        // Configure Ace

        // Theme
        //codeEditor.setTheme("ace/theme/dreamweaver");

        // Set language
        codeEditor.session.setMode("ace/mode/javascript");

        // Set Options
        // codeEditor.setOptions({
        //     fontFamily: 'Inconsolata',
        //     fontSize: '12pt',
        //     enableBasicAutocompletion: true,
        //     enableLiveAutocompletion: true,
        // });

        // Set Default Code
        codeEditor.setValue(defaultCode);
    }
}

// Events
executeCodeBtn.addEventListener('click', () => {
    // Get input from the code editor
    const userCode = codeEditor.getValue();

    console.log('userCode', userCode);
    


    // Run the user code
    try {
        new Function(userCode)();
    } catch (err) {
        console.error(err);
    }
});

resetCodeBtn.addEventListener('click', () => {
    // Clear ace editor
    codeEditor.setValue(defaultCode);
})

editorLib.init();