const canvas = document.querySelector('canvas');
// console.log('canvas: ', canvas);

// ==============================================

const c = canvas.getContext('2d');
// console.log('c: ', c);

// ==============================================

canvas.width = window.innerWidth - 10; // 5px each side
canvas.height = window.innerHeight - 10; // 5px each side

// ==============================================

class Entity {

  // --------------------------------------------

  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };

    this.velocity = {
      x: 0,
      y: 1,
    };

    this.width = 30;
    this.height = 30;
  }

  // --------------------------------------------

  draw() {
    const { position: { x, y }, width, height } = this;
    c.fillStyle = 'black';
    c.fillRect(x, y, width, height);
  }

  // --------------------------------------------

  update() {
    this.draw();
    this.position.y += this.velocity.y;
  }

  // --------------------------------------------
}

// ==============================================

const entity = new Entity();

// ==============================================

let t0 = 0;

function animate() {
  const t1 = performance.now();

  requestAnimationFrame(animate);
  
  c.clearRect(0, 0, canvas.width, canvas.height);
  entity.update();

  const dt = Math.round(t1 - t0);
  console.log(`animate() \ndt: ${dt}`);
  t0 = t1;
}
animate();