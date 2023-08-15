import { canvas, ctx } from "./util.js";

const newEntity = ({
  size: { width, height }, 
  position,
  color='darkorange', // this.color = color;
}) => {

  const [w, h] = [width, height];

  let pos = { 
    x: position?.x || canvas.width / 2 - w / 2,
    y: position?.y || canvas.height / 2 - h / 2,
  };

  const speed = 3;
  
  const update = (x, y) => {


    // collision detection [walls]
    console.log('pos.x', pos.x);

    // move X (with wall collision detection)
    const new_x = pos.x + x * speed;
    if (new_x < 0)  pos.x = 0; // clamp at left-wall
    else if (new_x + w >= canvas.width) pos.x = canvas.width - w - 1; // clamp at right-wall
    else  pos.x = new_x; // move (inside left/right walls)

    // move Y (with wall collision detection)
    const new_y = pos.y + y * speed;
    if (new_y < 0) pos.y = 0; // clamp at top-wall
    else if (new_y + h >= canvas.height) pos.y = canvas.height - h - 1; // clamp at bottom-wall
    else pos.y = new_y; // move (inside top/bottom walls)
  };
  
  const render = () => {
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, w, h);
  };


  return ({
    update,
    render,
  });
}

export { newEntity };