import { canvas, ctx, loadImg } from "./util/util.js";
import newHero from './entities/Hero.js';
import { newEnemy } from './entities/Enemy.js';
import newPlatform from './entities/Platform.js';

// ==========================================

let hero;
let enemies = [];
let platforms = [];
let particles = [];

// ==========================================

const reset = async () => {

  const platform_img = await loadImg('platform.png');

  const { HERO, ENEMY, PLATFORM } = (() => {
    const HERO  = { h: 50, w: 50};
    const ENEMY = { h: 50, w: 50};
    const PLATFORM = { h: platform_img.height, w: platform_img.width };

    return { HERO, ENEMY, PLATFORM };
  })();

  const floorOffset = y => canvas.height - y - PLATFORM.h; // y is from bottom of screen

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
    color: 'black',
    position: { x: 0, y: floorOffset(0)},
    image: platform_img,
  }));
  platforms.push(newPlatform({ 
    color: 'black',
    position: { x: 175, y: floorOffset(75)},
    image: platform_img,
  }));


  // --------------------------------------------

  particles = [];
};
await reset(); // top level await! 🤯

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