import "../util/debug.js";
import Particle from "./Particle.js";
import { canvas, ctx, GRAVITY } from "../util/util.js";
import { getRandom, getRandomColor } from "../util/rand.js";

export default function newHero({
  size: { width, height }, 
  position,
  color='darkorange', // this.color = color;
}) {

  // ==============================================

  // ==============================================
  // ==============================================
  // =============== Controls =====================
  // ==============================================
  // ==============================================

  let keys = {};

  // ==============================================

  // disable touch zooming / scrolling:
  const main = document.querySelector('main');
  main.addEventListener('touchstart', e => e.preventDefault() );

  // controls UI:
  const touch_controller_up = document.querySelector('#touch-controller-up');
  const touch_controller_down = document.querySelector('#touch-controller-down');
  const touch_controller_left = document.querySelector('#touch-controller-left');
  const touch_controller_right = document.querySelector('#touch-controller-right');

  // ==============================================

  // controls interface:
  const SPEED = 3;
  const controls = { 
    get x() {
      if (keys['ArrowLeft']  || keys['a'])  return -SPEED;
      if (keys['ArrowRight'] || keys['d'])  return SPEED;
      return 0;
    }, 
    get y() {
      if (keys['ArrowUp']   || keys['w'])  return -SPEED;
      if (keys['ArrowDown'] || keys['s'])  return SPEED;
      return 0;
    }
  };

  // ==============================================
  // ==============================================
  // ==============================================
  // ================= Hero =======================
  // ==============================================
  // ==============================================

  const [w, h] = [width, height];
  
  // ============================================

  // position
  let pos = {
    x: position?.x ?? canvas.width / 2 - w / 2,
    y: position?.y ?? canvas.height / 2 - h / 2,
    // xr: position?.x + w || canvas.width / 2 - w / 2 + w,
    // yb: position?.x + h || canvas.height / 2 - h / 2 + h,
  };

  // ============================================

  // velocity
  let vel = { x: 0, y: 0 };

  // ============================================

  // jump count
  let jumps = 0;

  const JUMP = 10;
  const MAX_JUMPS = 2;

  // ============================================
  // ============================================
  // ============================================
  // ============================================

  // Collision detection

  const AXRinBXL = (A_xr, B_xl) => A_xr >= B_xl ? true : false;
  const AXLinBXR = (A_xl, B_xr) => A_xl <= B_xr ? true : false;
  const AYBinBYT = (A_yb, B_yt) => A_yb >= B_yt ? true : false;
  const AYTinBYB = (A_yt, B_yb) => A_yt <= B_yb ? true : false;

  // ============================================
  // ============================================
  // ============================================
  // ============================================

  // const update = (x, y) => {
  const update = (platforms, enemies, particles, reset) => {

    const new_xl = pos.x + vel.x; // left of entity
    const new_xr = new_xl + w;    // right of entity

    const new_yt = pos.y + vel.y; // top of entity
    const new_yb = new_yt + h;    // bottom of entity

    // - - - - - - - - - - - - -
    // - - - Update X: - - - - -
    // - - - - - - - - - - - - -

    pos.x = new_xl;
    vel.x = controls.x;

    // - - - - - - - - - - - - -
    // - - - Update Y: - - - - -
    // - - - - - - - - - - - - -

    // Collision Detection: canvas bottom
    if (new_yb >= canvas.height) {
      pos.y = canvas.height - h;
      vel.y = 0;
      jumps = 0;
    } else {
      pos.y = new_yt;
      vel.y += GRAVITY;
    }

    const landOnTop = (entity) => (
      new_yb <= entity.yt && // above entity
      new_yb + vel.y >= entity.yt && // hero is moving downwards while above entity (landed on top of entity)
      AXRinBXL(new_xr, entity.xl) && AXLinBXR(new_xl, entity.xr) // hero is within enemy's x bounds
    );

    // Collision Detection: land on top of platform
    platforms.forEach((platform) => {
      if (landOnTop(platform)) {
        vel.y = 0;
        jumps = 0;
      }
    });

    // remove from array
    const kill = (entities, idx) => setTimeout(() => entities.splice(idx, 1), 0);

    // Collision Detection: Enemy
    enemies.forEach((enemy, idx) => {

      
      if (landOnTop(enemy)) { // -land on top of enemy (kills enemy)
        vel.y = 0;
        jumps = 0;
        
        // bounce hero off of enemy
        vel.y = -JUMP / 2;   

        // spawn particles
        for (let i = 0; i < 100; i++) {
          particles.push( new Particle({ // create particles
            position: { x: enemy.x_half, y: enemy.yt },
            velocity: { 
              x: getRandom(-1, 1) * 3,
              y: getRandom(-1, 1) * 4
            },
            radius: 3 * Math.random(),
            color: getRandomColor(),
          }) );
        }
        console.log(particles);

        // kill enemy
        console.green('land on top of enemy (kills enemy)');
        kill(enemies, idx);

      } else if (
        AXRinBXL(new_xr, enemy.xl) && AXLinBXR(new_xl, enemy.xr) && // hero is within enemy's x bounds
        AYBinBYT(new_yb, enemy.yt) && AYTinBYB(new_yt, enemy.yb) // hero is within enemy's y bounds
      ) { // -hit enemy from side (kills hero)
        console.red('hit enemy from side (kills hero)');
        reset();
      }
    });

    // - - - - - - - - - - - - -
    // - -  End Update Y - - - -
    // - - - - - - - - - - - - -

    render();
  };
  
  // ============================================
  // ============================================
  // ============================================
  // ============================================

  function render () {
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, w, h);
  };

  // ==============================================
  // ==============================================
  // ========= Controls Event Listeners ===========
  // ==============================================
  // ==============================================

  // Keyboard Controls:

  document.addEventListener("keydown", (e) => {
    if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', ' '].indexOf(e.key) >= 0) e.preventDefault();
    keys[e.key] = true;

    if (e.key === 'ArrowUp' && jumps < MAX_JUMPS) {
      vel.y = -JUMP;
      jumps++;
    }
  }, false);

  document.addEventListener("keyup", ({ key }) => keys[key] = false, false);

  // ==============================================

  // Touch Controls:
  
  touch_controller_down.addEventListener('touchstart',  ()  =>    keys['ArrowDown']  = true);
  touch_controller_down.addEventListener('touchend',    ()  =>    keys['ArrowDown']  = false);
  
  touch_controller_left.addEventListener('touchstart',  ()  =>    keys['ArrowLeft']  = true);
  touch_controller_left.addEventListener('touchend',    ()  =>    keys['ArrowLeft']  = false);
  
  touch_controller_right.addEventListener('touchstart', ()  =>    keys['ArrowRight'] = true);
  touch_controller_right.addEventListener('touchend',   ()  =>    keys['ArrowRight'] = false);
  
  touch_controller_up.addEventListener('touchend',      ()  =>    keys['ArrowUp']    = false);
  touch_controller_up.addEventListener('touchstart',    ()  =>  { keys['ArrowUp']    = true;
    if (jumps < MAX_JUMPS) {
      vel.y = -JUMP;
      jumps++;
    }
  });

  // ============================================

  return ({
    update,
    render,
    get xl() { return pos.x; },
    get yt() { return pos.y; },
    get xr() { return pos.x + w; },
    get yb() { return pos.y + h; },
  });
}