// Retrieve Elements
const executeCodeBtn = document.querySelector('.editor__run');
const resetCodeBtn = document.querySelector('.editor__reset');

// Setup Ace
let codeEditor = ace.edit("editorCode");
let defaultCode = 
`// Grab the data from the opened image file
let mat = cv.imread(imgElement);

console.log('image width: '   + mat.cols);
console.log('image height: '  + mat.rows);
console.log('image size: '    + mat.size().width + '*' + mat.size().height);
console.log('image depth: '   + mat.depth());
console.log('image channels ' + mat.channels());
console.log('image type: '    + mat.type());


// Split and merge channels:
let rgbaPlanes = new cv.MatVector();

// Split the Mat
cv.split(mat, rgbaPlanes);

// Get R channel
let R = rgbaPlanes.get(0);

// Display to canvas element with id="canvasOutput"
cv.imshow('canvasOutput', R);

// Merge all channels
//cv.merge(rgbaPlanes, src);


// Clean up 
mat.delete(); 
rgbaPlanes.delete(); 
R.delete();
`;

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