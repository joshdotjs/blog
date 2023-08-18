import { draw_frame } from './draw.js';
import {screen, drag_state_object, state} from './globals.js';
// ----------------------------------------------
function get_mouse_coordinates(event) {
    const [x, y] = [event.clientX, event.clientY];
    return [x, y];
}
// ----------------------------------------------
function get_current_block(x, y) {
    const block_x = Math.floor(x / screen.grid_spacing);
    const block_y = Math.floor(y / screen.grid_spacing);
    //console.log(`clicked in (block_x, block_y):   (${block_x}, ${block_y})`);
    return [block_x, block_y];
}
// ----------------------------------------------
function which_region_clicked_in(x, y) {
    const [block_x, block_y] = get_current_block(x, y);
    // console.log(`(x, y): (${x}, ${y})  AND  (block_x, block_y): (${block_x}, ${block_y})`);
    console.log(`(${x}, ${y})  =>  (${block_x}, ${block_y})`);

    if( 0 <= block_x  &&  block_x < 1   	// x_block_x in [0, 1)
     && 1 <= block_y  &&  block_y < screen.num_devices_in_picker   // x_block_y in [1, T)
    ) {
        return 'device-picker-region';
    } else if( 1 <= block_x  &&  block_x < screen.num_grid_blocks_x 
            && 1 <= block_y  &&  block_y < screen.num_grid_blocks_y
    ) {
        return 'circuit-board-region';
    } else {
        //alert('clicked in invalid region!');
        return 'invalid-region';
    }
}
// ----------------------------------------------
function which_device_was_clicked_on(x, y) { 
    const [block_x, block_y] = get_current_block(x, y);
    
    if(block_y === 1)
        return 'BOOL-switch';
    else if (block_y === 2)
        return 'AND-gate';
    else if (block_y === 3)
        return 'OR-gate';
    else
        return null;
}
// ----------------------------------------------
function on_mouse_move(event) { 

    // Step 1: Update mouse position on drag state object
    drag_state_object.set_drag_pos(event.x, event.y);

    // Step 2: Update frame
    draw_frame();
}
// ----------------------------------------------
function on_mouse_up()   {

    // Step 1: Remove listners for DRAG and DROP events
    document.body.removeEventListener('mousemove', on_mouse_move);
    document.body.removeEventListener('mouseup', on_mouse_up);

    // Step 2: Determine if dropped in valid region
    const [x, y] = [drag_state_object.x, drag_state_object.y];
    const region_dropped_in = which_region_clicked_in(x, y);
    if (region_dropped_in === 'circuit-board-region') {

        console.log('Device was dropped in circuit board region');
        console.log('Device was dropped in circuit board region');
        console.log('Device was dropped in circuit board region');
        console.log('Device was dropped in circuit board region');

        //      --Step 2.a) Add new element to state object
        const [block_x, block_y] = get_current_block(x, y);
        state.set_state(block_x, block_y);
        
        //      --Step 2.b) Update logic
    }

    // Step 3: Set to not-dragging state
    drag_state_object.end_dragging();

    // Step 4: Update the canvas
    draw_frame();
 }
// ----------------------------------------------
function begin_drag_and_drop(device, x, y) {

    // Step 0: Begin dragging state
    console.log('Setting current device on drag_state_object: ', device);
    drag_state_object.begin_dragging(device, x, y);
    console.log('Drag state object after setting device: ', drag_state_object);

    // Step 1: Set event listners for DRAG and DROP events
    document.body.addEventListener('mousemove', on_mouse_move);
    document.body.addEventListener('mouseup', on_mouse_up);

    // TODO:
    // Step 2: Stop DRAG and DROP (remove event listeners) in on_mouse_up()
    //  -2.a) set drag_state_object.is_dragging = false;
    //  -2.b) remove listeners for mousemove and mouseup
}
// ----------------------------------------------
function on_mouse_down(event) {

    console.log(event);
    
    // Step 0: Get mouse coordinates
    const [x, y] = get_mouse_coordinates(event);

    // Step 1: 
    const region = which_region_clicked_in(x, y);
    if (region === 'device-picker-region') {
        // Step 1.a) In device-picker region:
        //      --Determine which device was clicked on:
        const device = which_device_was_clicked_on(x, y); // ***** TODO *****

        //      --Start drag logic
        begin_drag_and_drop(device, x, y);
    }
    else if (region === 'circuit-board-region') {
        // Step 1.b) In circuit-board region:
        //      --Is an element placed here?
        //          ---Yes:
        //              ----Is element togglable?
        //                  -----Yes:
        //                      ------Toggle
        //                  -----No:
        //                      ------Do nothing
        //          ---No:
        //              ----Do nothing
    }
}
// ----------------------------------------------
export {on_mouse_down};