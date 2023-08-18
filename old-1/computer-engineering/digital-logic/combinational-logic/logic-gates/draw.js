import {screen, drag_state_object, state} from './globals.js';
// ----------------------------------------------
function draw_line(x0, y0, x1, y1) {
    screen.canvas_ctx.beginPath();
    screen.canvas_ctx.moveTo(x0, y0);
    screen.canvas_ctx.lineTo(x1, y1);
    screen.canvas_ctx.stroke();
}
// ----------------------------------------------
function clear_canvas() {
    screen.canvas_ctx.clearRect(0, 0, screen.width, screen.height);
}
// ----------------------------------------------
function draw_grid() {
    console.log('draw_grid()');
    console.log('screen.num_grid_blocks_y: ', screen.num_grid_blocks_y);

    // Draw horizontal lines
    const start_x = 0,  end_x = screen.width;
    for (let y = 0; y < screen.height; y += screen.grid_spacing) {   
        draw_line(
            start_x, y, 
            end_x,   y);
    }

    // Draw horizontal lines
    const start_y = 0,  end_y = screen.height;
    for (let x = 0; x < screen.width; x += screen.grid_spacing) {
        draw_line(
            x,  start_y, 
            x,  end_y);
    }
}
// ----------------------------------------------
function draw_picker() {

    console.log('number of images: ', screen.imgs.length);

    for (let i = 1; i < screen.imgs.length; ++i) {
        const x = 0;
        const y = i * screen.grid_spacing;
        screen.canvas_ctx.drawImage(
            screen.imgs[i], x, y
        );
    }
    
}
// ----------------------------------------------
function draw_placed_elements() {
    const rows = screen.num_grid_blocks_y;
    const cols = screen.num_grid_blocks_y;
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            if (state.data[i][j] !== 0) {
                const x = j * screen.grid_spacing;
                const y = i * screen.grid_spacing;
                const image = state.data[i][j].img;
                screen.canvas_ctx.drawImage(image, x, y);
            }
        }
    }
}
// ----------------------------------------------

function draw_unplaced_element() {
    console.log('drawing unplaced element NOW!!!!');

    const image = drag_state_object.get_image();
    const x = drag_state_object.x;
    const y = drag_state_object.y;
    screen.canvas_ctx.drawImage(image, x, y);
}
// ----------------------------------------------
function update_canvas() {
    clear_canvas();
    draw_grid();
    draw_picker();
    draw_placed_elements();
    if(drag_state_object.is_dragging === true)
        draw_unplaced_element();
}
// ----------------------------------------------
function draw_frame() {
    update_canvas();
}
// ----------------------------------------------
export {draw_frame};