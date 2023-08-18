// ----------------------------------------------
class Timer {
	tic(name) { console.time(name); }
	toc(name) { console.timeEnd(name); }
}
// ----------------------------------------------
function create_vector(start, end, spacing, decimals=2) {
    // const x = create_vector(-1, 2, 0.3);
    // console.log(x);
    const x = [];
    for (let i = start; i <= end; i += spacing) {
        x.push(Number(i.toFixed(decimals)));
    }
    return x;
}
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
function populate_array(n) {
    const arr = [];
    for (let i = 0; i < n; i++)
        arr.push(i);
    return arr;
}
// ----------------------------------------------
function plot(Y, X=populate_array(Y.length)) {
    const N = X.length;
    const M = Y.length;
    if (M !== N && N !== 0)
        alert('Both arrays must be same length!');

    const radius = 10;

    console.log(cartY(Y[1]));
    console.log(Y);
    draw_line(0, 0, 100, 100, 'deeppink', 8);    

    for (let i = 0; i < M; ++i) {
        const x = cartX(X[i]);
        const y = cartY(Y[i]);
        draw_line(x, cartY(0), x, y, 'darkorchid', 6);
        if (i > 0) {
            draw_line(cartX(X[i-1]), cartY(Y[i-1]), cartX(X[i]), cartY(Y[i]), 'deeppink', 8);
            draw_circle(cartX(X[i-1]), cartY(Y[i-1]), radius);
        }
        draw_circle(x, y, radius);
    }
}
// ----------------------------------------------
function stem(Y, X=[]) {

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
function draw_grid(grid_spacings, quadrant='all') {

    const X = canvas.width;
    const Y = canvas.height;

    const [grid_spacing_x, grid_spacing_y] = [...grid_spacings];

    const [num_grid_lines_x, num_grid_lines_y] = [X / grid_spacing_x, Y / grid_spacing_y];

    if (quadrant === 'all') {

        [X_origin, Y_origin] = [X/2, Y/2];

        const cart = cartesian2canvas_coordinates;
        // const [josh_x, josh_y] = cartesian2canvas_coordinates(1, 1);
        const [josh_x, josh_y] = cart(1, 1);
        console.log(josh_x, josh_y);

        // Draw grid
        for (let i = 0; i < num_grid_lines_y; ++i) {
            draw_line(0, i * grid_spacing_y, X, i * grid_spacing_y);
        }
            
        for(let j = 0; j < num_grid_lines_x; ++j)
            draw_line(j * grid_spacing_x, 0, j * grid_spacing_x, Y);

        // x-axis
        const x_axis = 5 * grid_spacing_x;
        draw_line(x_axis, 0, x_axis, canvas.height, 'blue', 5);

        // y-axis
        const y_axis = 2 * grid_spacing_y;
        draw_line(0, y_axis, canvas.width, y_axis, 'green', 5);

        // Origin
        const radius = 10;
        // draw_circle(cartX(1), cartY(1), radius);
        // draw_circle(cartX(2), cartY(2), radius);

        // Test drawing a stem-plot
        const y_arr = [1, 1/2, 0, 0, 0, 0];
        plot(y_arr);
    } else if (quadrant === 1) {

        console.log('inside quadrant 1');

        const X = canvas.width;
        const Y = canvas.height;

        [X_origin, Y_origin] = [X/2, Y/2];

        // Draw grid
        for (let i = 0; i < Y; i++) {
            draw_line(0, i * grid_spacing_y, X, i * grid_spacing_y);
        }
            
        for(let j = 0; j < X; j++)
            draw_line(j * grid_spacing_x, 0, j * grid_spacing_x, Y);

        // x-axis
        const x_axis = 5 * grid_spacing_x;
        draw_line(x_axis, 0, x_axis, canvas.height, 'blue', 5);

        // y-axis
        const y_axis = 2 * grid_spacing_y;
        draw_line(0, y_axis, canvas.width, y_axis, 'green', 5);

        // Test drawing a stem-plot
        const y_arr = [1, 1/2, 0, 0, 0, 0];
        plot(y_arr);
    }
}
// ----------------------------------------------
function animate_grid(grid_spacings, quadrant='all') {

    const timer = new Timer();

    const X = canvas.width;
    const Y = canvas.height;
    const [grid_spacing_x, grid_spacing_y] = [...grid_spacings];
    const [num_grid_lines_x, num_grid_lines_y] = [X / grid_spacing_x, Y / grid_spacing_y];

    const objs_x = [];
    for (let i = 0; i < 4; ++i)
        objs_x.push({prop: 0});

    const objs_y = [];
    for (let i = 0; i < 11; ++i)
        objs_y.push({prop: 0});

    gsap.to(objs_x, {
        duration: 0.8,
        prop: X, 
        //onUpdate fires each time the tween updates; we'll explain callbacks later.
        onUpdate: function() {

            console.log(objs_x[0].prop);

            for (let row = 0; row < objs_x.length; row++) {
                const [x0, y0] = [0,                    row * grid_spacing_y];
                const [x1, y1] = [objs_x[row].prop,     row * grid_spacing_y];
                draw_line(x0, y0, x1, y1);
            }
        },
        ease: "power4",
        stagger: 0.2
    });

    gsap.to(objs_y, {
        duration: 0.8,
        prop: Y, 
        //onUpdate fires each time the tween updates; we'll explain callbacks later.
        onUpdate: function() {
            for (let col = 0; col < objs_y.length; col++) {
                const [x0, y0] = [col * grid_spacing_y,     0,          ];
                const [x1, y1] = [col * grid_spacing_y,     objs_y[col].prop];
                draw_line(x0, y0, x1, y1);
            }           
        },
        ease: "power4",
        stagger: 0.1
    });
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
//draw_grid([grid_spacing_x, grid_spacing_y],  quadrant='all');
animate_grid([grid_spacing_x, grid_spacing_y],  quadrant='all');

// Test drawing a stem-plot
const y_arr = [1, 1/2, 0, 0, 0, 0];
plot(y_arr);
// ----------------------------------------------