import { canvas, ctx } from "./util.js";


// constructor({
//   size: { width, height }, 
//   position,
//   color='darkorange',
// }) {
const newEntity = ({
  size: { width, height }, 
  position,
  color='darkorange', // this.color = color;
}) => {

  // this.w = width;
  // this.h = height;
  const [w, h] = [width, height];

  // this.pos = {
  //   x: position?.x || canvas.width / 2 - this.w / 2,
  //   y: position?.y || canvas.height / 2 - this.h / 2,
  // };
  let pos = { 
    x: position?.x || canvas.width / 2 - w / 2,
    y: position?.y || canvas.height / 2 - h / 2,
  };
  
  // update(x, y) {
  //   this.pos.x += x * 3;
  //   this.pos.y += y * 3;
  // }
  const update = (x, y) => {
    pos.x += x * 3;
    pos.y += y * 3;
  };
  

  // render() {
  //   ctx.fillStyle = this.color;
  //   ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
  // }
  const render = () => {
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, w, h);
  };


  return ({ // class Entity {}
    update,
    render,
  });
}

export { newEntity };