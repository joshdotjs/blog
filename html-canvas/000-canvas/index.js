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

function animate() {
  requestAnimationFrame(animate);
  console.log('go');
  const { width: w, height: h} = canvas;
  c.clearRect(0, 0, w, h);
  entity.update();
}
animate();