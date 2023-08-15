import { canvas, ctx } from "./util.js";

export default function newHero({
  size: { width, height }, 
  position,
  color='darkorange', // this.color = color;
}) {

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
      if (keys['ArrowLeft']  || keys['a'])  return -1 * SPEED;
      if (keys['ArrowRight'] || keys['d'])  return 1 * SPEED;
      return 0;
    }, 
    get y() {
      if (keys['ArrowUp']   || keys['w'])  return -1 * SPEED;
      if (keys['ArrowDown'] || keys['s'])  return 1 * SPEED;
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
    x: position?.x || canvas.width / 2 - w / 2,
    y: position?.y || canvas.height / 2 - h / 2,
    // xr: position?.x + w || canvas.width / 2 - w / 2 + w,
    // yb: position?.x + h || canvas.height / 2 - h / 2 + h,
  };

  // ============================================

  // velocity
  let vel = { x: 0, y: 0 };

  // ============================================

  // jump count
  let jumps = 0;

  // ============================================
  // ============================================
  // ============================================
  // ============================================

  const AXRinBXL = (A_xr, B_xl) => {
    if (A_xr >= B_xl) return true;
  };
 
  const AXLinBXR = (A_xl, B_xr) => {
    if (A_xl <= B_xr) return true;
    else return false;
  }

  // ============================================

  const AYBinBYT = (A_yb, B_yt) => {
    if (A_yb >= B_yt) return true;
    else return false;
  }

  const AYTinBYB = (A_yt, B_yb) => {
    if (A_yt <= B_yb) return true;
    else return false;
  }

  // ============================================
  // ============================================
  // ============================================
  // ============================================

  const GRAVITY = 0.5;

  // const update = (x, y) => {
  const update = (enemy) => {

    const new_xl = pos.x + vel.x; // left of entity
    const new_xr = new_xl + w;    // right of entity

    const new_yt = pos.y + vel.y; // top of entity
    const new_yb = new_yt + h;    // bottom of entity

    pos.x = new_xl;
    vel.x = controls.x;
  
    
    // Check for collision with canvas bottom
    if (new_yb >= canvas.height) {
      pos.y = canvas.height - h;
      vel.y = 0;
      console.log('landed on bottom');
      jumps = 0;
    } else {
      pos.y = new_yt;
      vel.y += GRAVITY;
    }

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

    if (e.key === 'ArrowUp' && jumps < 2) {
      vel.y = -10;
      jumps++;
    }
  }, false);

  document.addEventListener("keyup", ({ key }) => {
    keys[key] = false;
  }, false);

  // ==============================================

  // Touch Controls:

  touch_controller_up.addEventListener('touchstart',    () => keys['ArrowUp']    = true);
  touch_controller_up.addEventListener('touchend',      () => keys['ArrowUp']    = false);

  touch_controller_down.addEventListener('touchstart',  () => keys['ArrowDown']  = true);
  touch_controller_down.addEventListener('touchend',    () => keys['ArrowDown']  = false);

  touch_controller_left.addEventListener('touchstart',  () => keys['ArrowLeft']  = true);
  touch_controller_left.addEventListener('touchend',    () => keys['ArrowLeft']  = false);

  touch_controller_right.addEventListener('touchstart', () => keys['ArrowRight'] = true);
  touch_controller_right.addEventListener('touchend',   () => keys['ArrowRight'] = false);

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