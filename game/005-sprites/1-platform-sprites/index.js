import { canvas, ctx, loadImg } from "./util/util.js";
import newHero from './entities/Hero.js';
import { newEnemy } from './entities/Enemy.js';
import newPlatform from './entities/Platform.js';

// ==========================================

let hero;
let enemies = [];
let platforms = [];
let particles = [];

const HERO  = { h: 50, w: 50};
const ENEMY = { h: 50, w: 50};
const FLOOR = { h: 75, w: canvas.width };

const floorOffset = y => canvas.height - y - FLOOR.h; // y is from bottom of screen

// ==========================================

const reset = () => {

  // --------------------------------------------

  hero = newHero({ 
    size: { width: HERO.w, height: HERO.h },
    position: { x: 0, y: 1}
  });

  // --------------------------------------------

  enemies = [];
  enemies.push(newEnemy({ 
    size: { width: ENEMY.w, height: ENEMY.h },
    position: { x: 100, y: floorOffset(50)},
  }));

  // --------------------------------------------

  platforms = [];
  platforms.push(newPlatform({ 
    // color: 'black',
    size: { width: FLOOR.w, height: 0 },
    position: { x: 0, y: floorOffset(0)},
  }));
  platforms.push(newPlatform({ 
    color: 'black',
    size: { width: 100, height: 10 },
    position: { x: 175, y: floorOffset(75)},
  }));


  // --------------------------------------------

  particles = [];
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
  particles.forEach( particle => particle.update() );
  hero.update(platforms, enemies, particles, reset);
  
  enemies.forEach((enemy) => {
    enemy.update(0, 0);
  });

  platforms.forEach((platform) => {
    platform.update(0, 0);
  });

}
animate();