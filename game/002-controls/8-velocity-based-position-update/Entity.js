import { canvas, ctx } from "./util.js";

const newEntity = ({
  size: { width, height }, 
  position,
  color='darkorange', // this.color = color;
}) => {

  const [w, h] = [width, height];

  // position
  let pos = { 
    x: position?.x || canvas.width / 2 - w / 2,
    y: position?.y || canvas.height / 2 - h / 2,
  };

  // velocity
  let vel = { x: 0, y: 0 };

  const update = (x, y) => {

    // move X (with wall collision detection)
    vel.x = x;
    const new_x = pos.x + vel.x; // left of entity
    const new_xr = new_x + w;    // right of entity
    if (
      0 <= new_x                 // left-wall
        && new_xr < canvas.width // right-wall
    ) { 
      pos.x = new_x;
    }

    // move Y (with wall collision detection)
    vel.y = y;
    const new_y = pos.y + vel.y; // top of entity
    const new_yb = new_y + h;    // bottom of entity
    if (
      0 <= new_y                  // top-wall
        && new_yb < canvas.height // bottom-wall
    ) { 
      pos.y = new_y;
    }

    render();
  };
  
  function render () {
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, w, h);
  };

  return ({
    update,
    render,
    pos,
  });
}

export { newEntity };