function create_vector(start, end, spacing, decimals=2) {
    const x = [];
    for (let i = start; i <= end; i += spacing) {
        x.push(Number(i.toFixed(decimals)));
    }
    return x;
}

const x = create_vector(-1, 2, 0.3);
console.log(x);

// ----------------------------------------------

function draw_circle(x, y, radius, color='grey') {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fill();
}

// ----------------------------------------------

function draw_line(x0, y0, x1, y1, strokeColor='black', lineWidth=2) {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

// ----------------------------------------------
let X_origin, Y_origin;
const origin_offset_canvas_coordinates = (x, y) => [x + X_origin, y + Y_origin];
const cartesian2canvas_coordinates     = (x, y) => [x*grid_spacing_x + X_origin, -y*grid_spacing_y + Y_origin];
const cartX = (x) => x*grid_spacing_x + X_origin;
const cartY = (y) => -y*grid_spacing_y + Y_origin;

// ----------------------------------------------

function stem(Y, X=[], ) {

    const N = X.length;
    const M = Y.length;
    if (M !== N && N !== 0)
        alert('Both arrays must be same length!');

    const radius = 10;
    for (let i = 0; i < M; ++i) {
        let x;
        if (N === 0)    x = cartX(i);
        else            x = cartX(X[i]);
        const y = cartY(Y[i]);
        draw_circle(x, y, radius);
        draw_line(x, cartY(0), x, y, 'darkorchid', 6);
    }

}

// ----------------------------------------------

function draw_grid() {

    const X = canvas.width;
    const Y = canvas.height;

    [X_origin, Y_origin] = [X/2, Y/2];

    const cart = cartesian2canvas_coordinates;
    // const [josh_x, josh_y] = cartesian2canvas_coordinates(1, 1);
    const [josh_x, josh_y] = cart(1, 1);
    console.log(josh_x, josh_y);

    // Draw grid
    for (let i = 0; i < Y; i++)
        draw_line(0, i * grid_spacing_y, X, i * grid_spacing_y);
    for(let j = 0; j < X; j++)
        draw_line(j * grid_spacing_x, 0, j * grid_spacing_x, Y);

    // x-axis
    const x_axis = 5 * grid_spacing_x;
    draw_line(x_axis, 0, x_axis, canvas.height, 'red', 5);

    // y-axis
    const y_axis = 2 * grid_spacing_y;
    draw_line(0, y_axis, canvas.width, y_axis, 'red', 5);

    // Origin
    const radius = 10;
    // draw_circle(cartX(1), cartY(1), radius);
    // draw_circle(cartX(2), cartY(2), radius);

    // Test drawing a stem-plot
    const y_arr = [-1, 0, 1, 2, 1, 0, -1];
    const x_arr = [-3, -2, -1, 0, 1, 2, 3];
    stem(y_arr, x_arr);
}

// ----------------------------------------------

// Run code after page loads:
// window.onload = function() {
// window.addEventListener('DOMContentLoaded', run_after_content_loaded);

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width  = 1000;
canvas.height = 400;
ctx.lineWidth = 2;
ctx.strokeStyle = 'black';
const grid_spacing_x = 100;
const grid_spacing_y = 100;
draw_grid();

