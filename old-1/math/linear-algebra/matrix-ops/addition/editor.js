// Retrieve Elements
const executeCodeBtn = document.querySelector('.editor__run');
const resetCodeBtn = document.querySelector('.editor__reset');

// Setup Ace
let codeEditor = ace.edit("editorCode");
let defaultCode = 
`const A = [[1,2],[3,4]];
const B = [[1,2],[3,4]];

function add(A, B) {
    // Assume A and B are same size

    const [M, N] = [ A.length, A[0].length ];
    console.log('M: ', M, ' N: ', N);

    let C = [[0,0],[0,0]];
    for (let r = 0; r < M; r++) {
        for (let c = 0; c < N; c++) {
            C[r][c] = A[r][c] + B[r][c];
        }
    }
    return C;
}
const C = add(A, B);
console.log('A + B = ', C);
`;

let editorLib = {
    init() {
        // Configure Ace

        // Theme
        //codeEditor.setTheme("ace/theme/dreamweaver");

        // Set language
        //codeEditor.session.setMode("ace/mode/javascript");
        codeEditor.session.setMode("ace/mode/matlab");

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