import { canvas, ctx } from "./util.js";
import { newEntity } from './Entity.js';
import newHero from './Hero.js';

// ==========================================

let hero;
let entities = [];

const reset = () => {
  hero = newHero({ 
    size: { width: 50, height: 50 },
    position: { x: 0, y: 1}
  });

  entities = [];
  entities.push(newEntity({ 
    color: 'black',
    size: { width: 50, height: 50 },
    position: { x: canvas.width - 60, y: canvas.height / 2 + 35},
  }));
  entities.push(newEntity({ 
    color: 'black',
    size: { width: 50, height: 50 },
    position: { x: 10, y: canvas.height / 2 + 35},
  }));
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
  hero.update(entities);
  
  // enemy.update(0, 0);
  entities.forEach((entity) => {
    entity.update(0, 0);
  });
}
animate();