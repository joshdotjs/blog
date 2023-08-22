import { canvas, ctx, GRAVITY } from '../util/util.js';

// ==============================================

class Particle {

  // --------------------------------------------

  constructor({ position, velocity, radius, color }) {
    this.position = { x: position.x, y: position.y };
    this.velocity = { x: velocity.x, y: velocity.y };
    this.radius = radius;
    this.ttl = 600; // time to live [frames]
    this.color = color;
  }

  // --------------------------------------------

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    // console.log('this.position.x: ', this.position.x);
    // ctx.arc(0, 0, 50, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  // --------------------------------------------

  update() {
    // this.ttl--;
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // gravity
    if (this.position.y + this.radius + this.velocity.y <= canvas.height) {
      //console.log('add gravity');
      this.velocity.y += GRAVITY * 0.1;
    }
  }

  // --------------------------------------------
}

// ==============================================

export default Particle;