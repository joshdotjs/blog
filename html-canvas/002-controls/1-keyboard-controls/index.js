import Controls from "./Controls.js";

// ==========================================

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// This breaks iframe
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// ==========================================

class Entity {

  // --------------------------------------------

  constructor() {
    this.width = canvas.height / 8;
    this.height = this.width;

    this.position = {
      x: canvas.width / 2 - this.width / 2,
      y: 0, // canvas.height / 2 - this.height / 2 ,
    };

    // Added velocity property
    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  // --------------------------------------------

  // Added update method to adjust position and apply gravity
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Gravity
    this.velocity.y += 0.5;
    
    // Check for collision with canvas bottom
    if (this.position.y + this.height > canvas.height) {
      this.position.y = canvas.height - this.height;
      this.velocity.y = 0;
    }
  }

  // --------------------------------------------

  render() {
    ctx.fillStyle = 'darkorange';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  // --------------------------------------------
}

// ==========================================

// const entity = new Entity();
const controls = new Controls();

// let t0 = 0;

// ==========================================

// Game setup code
let x = canvas.width  / 2 - 25;
let y = canvas.height / 2 - 25;

const update = () => {
  x += controls.x * 3;
  y += controls.y * 3;
};

const render = () => {
  ctx.fillStyle = 'rgba(0, 0, 0)';
  ctx.fillRect(x, y, 50, 50);
};

// ==========================================

function animate(t1) {
  requestAnimationFrame(animate);
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // entity.update();
  // entity.draw();

  // const dt = Math.round(t1 - t0);
  // console.log(`animate() \ndt: ${dt}ms.`);
  // t0 = t1;

  update();
  render();

}
animate();
