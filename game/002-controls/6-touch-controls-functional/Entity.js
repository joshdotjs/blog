import { canvas, ctx } from "./util.js";

const newEntity = ({
  size: { width, height }, 
  position,
  color='darkorange',
}) => {

  const [w, h] = [width, height];

  let pos = { 
    x: position?.x || canvas.width / 2 - w / 2,
    y: position?.y || canvas.height / 2 - h / 2,
  };
  
  const update = (x, y) => {
    pos.x += x * 3;
    pos.y += y * 3;
  };
  
  const render = () => {
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, w, h);
  };

  return ({ update, render });
}

export { newEntity };