// <!-- <script src="./listeners.js"></script> -->
// <!-- <script src="./logic.js"></script> -->

import {screen, state} from './globals.js';
import {draw_frame} from './draw.js';
import {on_mouse_down} from './listeners.js';

window.onload = function() {
    screen.setup_canvas();
    state.create_state();
    console.log('Initial state:');
    console.log(state.data);
    console.log('Ending initial state!');
    console.log('Ending initial state!');
    console.log('Ending initial state!');
    console.log('Ending initial state!');
    console.log('Ending initial state!');
    
    document.body.addEventListener("mousedown", on_mouse_down);
};