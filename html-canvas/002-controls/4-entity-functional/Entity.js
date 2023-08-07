import { canvas, ctx } from "./util.js";

class Entity {

  // --------------------------------------------

  constructor({
    size: { width, height }, 
    position,
    color='darkorange',
  }) {
    this.w = width;
    this.h = height;

    console.log('position', position);

    this.pos = {
      x: position?.x || canvas.width / 2 - this.w / 2,
      y: position?.y || canvas.height / 2 - this.h / 2,
    };

    // velocity
    this.vel = {
      x: 0,
      y: 0,
    };

    this.color = color;
  }

  // --------------------------------------------

  update(x, y) {
    // this.position.x += this.velocity.x;
    // this.position.y += this.velocity.y;

    // // Gravity
    // this.velocity.y += 0.5;
    
    // // Check for collision with canvas bottom
    // if (this.position.y + this.height > canvas.height) {
    //   this.position.y = canvas.height - this.height;
    //   this.velocity.y = 0;
    // }

    this.pos.x += x * 3;
    this.pos.y += y * 3;
  }

  // --------------------------------------------

  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
  }

  // --------------------------------------------
}

export default Entity;