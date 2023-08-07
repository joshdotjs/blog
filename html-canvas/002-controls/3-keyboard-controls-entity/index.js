// import Controls from "./Controls.js";
import controls from "./Controls.js";

// ==========================================

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// ==========================================

const entity = new Entity();

// let t0 = 0;

// ==========================================

// Game setup code
let x = canvas.width  / 2 - 25;
let y = canvas.height / 2 - 25;

const update = () => {
  console.log('x: ', x);

  // x += controls.x * 3;
  // y += controls.y * 3;
  x += controls.x() * 3;
  y += controls.y() * 3;
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