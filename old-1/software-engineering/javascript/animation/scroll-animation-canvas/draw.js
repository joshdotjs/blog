// ----------------------------------------------
export function draw_circle(ctx, x, y, radius, color='grey') {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fill();
}
// ----------------------------------------------
export function draw_line(ctx, x0, y0, x1, y1, fillColor='yellow', strokeColor='black') {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
}
// ----------------------------------------------
export function draw_rect(
    ctx, x, y, dx, dy, fillColor='yellow', strokeColor='black') {
   
    // step 1: Begin path
    ctx.beginPath();			// step 1: Begin path		
    ctx.rect(x, y, dx, dy);
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.fill();
    ctx.stroke();
}
// ----------------------------------------------
export function clear_canvas() {
    context.clearRect(0, 0, width, height);
}
// ----------------------------------------------