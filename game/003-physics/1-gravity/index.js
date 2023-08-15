import { canvas, ctx } from "./util.js";
import controls from "./Controls.js";
import { newEntity } from './Entity.js';
import { newHero } from './Hero.js';

// ==========================================

let hero;
let enemy;

const reset = () => {
  hero = newHero({ 
    size: { width: 50, height: 50 },
    position: { x: 5, y: 1}
  })

  enemy = newEntity({ 
    color: 'black',
    size: { width: 50, height: 50 },
    position: { x: canvas.width / 2 + 35, y: canvas.height / 2 + 35},
  })
};
reset();

// ==========================================

const reset_button = document.querySelector('#reset-button');
reset_button.addEventListener('click', () => reset());
reset_button.addEventListener('touchstart', () => reset());

// ==========================================

function animate(t1) {
  requestAnimationFrame(animate);

  // Refresh:
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update:
  // entity_1.update(controls.x(), controls.y());
  // entity_1.update(controls.x, controls.y);
  hero.update(controls, enemy);

  enemy.update(0, 0);
}
animate();