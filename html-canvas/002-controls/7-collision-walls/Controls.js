// ==============================================

let keys = {};

// ==============================================

const main = document.querySelector('main');
main.addEventListener('touchstart', e => e.preventDefault() ); // disable touch zooming / scrolling  

const touch_controller_up = document.querySelector('#touch-controller-up');
const touch_controller_down = document.querySelector('#touch-controller-down');
const touch_controller_left = document.querySelector('#touch-controller-left');
const touch_controller_right = document.querySelector('#touch-controller-right');

// ==============================================

// Keyboard Controls:

document.addEventListener("keydown", (e) => {
  if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', ' '].indexOf(e.key) >= 0) e.preventDefault();
  keys[e.key] = true;
}, false);

document.addEventListener("keyup", ({ key }) => keys[key] = false, false);

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

// ==============================================

const x = () => {
  if (keys['ArrowLeft']  || keys['a'])  return -1;
  if (keys['ArrowRight'] || keys['d'])  return 1;
  return 0;
};
const y = () => {
  if (keys['ArrowUp']   || keys['w'])  return -1;
  if (keys['ArrowDown'] || keys['s'])  return 1;
  return 0;
};

// ==============================================

const controls = { x, y };

// ==============================================

export default controls;