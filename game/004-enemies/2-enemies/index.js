import { canvas, ctx } from "./util.js";
import newHero from './entities/Hero.js';
import { newEnemy } from './entities/Enemy.js';
import { newPlatform } from './entities/Platform.js';

// ==========================================

let hero;
let enemies = [];
let platforms = [];

const reset = () => {
  hero = newHero({ 
    size: { width: 50, height: 50 },
    position: { x: 0, y: 1}
  });

  enemies = [];
  enemies.push(newEnemy({ 
    size: { width: 50, height: 50 },
    position: { x: canvas.width / 2 - 25, y: canvas.height - 50},
  }));

  platforms = [];
  platforms.push(newPlatform({ 
    color: 'black',
    size: { width: 50, height: 50 },
    position: { x: canvas.width - 60, y: canvas.height / 2 + 35},
  }));
  platforms.push(newPlatform({ 
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
  hero.update(platforms, enemies);
  
  enemies.forEach((enemy) => {
    enemy.update(0, 0);
  });

  platforms.forEach((platform) => {
    platform.update(0, 0);
  });
}
animate();