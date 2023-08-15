// import Controls from "./Controls.js";
import controls from "./Controls.js";

// ==========================================

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// ==========================================

// Game setup code
let x = canvas.width  / 2 - 25;
let y = canvas.height / 2 - 25;

// ==========================================

const update = () => {
  // x += controls.x * 3;
  // y += controls.y * 3;
  x += controls.x() * 3;
  y += controls.y() * 3;
};

// ==========================================

const render = () => {
  ctx.fillStyle = 'rgba(0, 0, 0)';
  ctx.fillRect(x, y, 50, 50);
};

// ==========================================

function animate(t1) {
  requestAnimationFrame(animate);
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  update();
  render();
}
animate();