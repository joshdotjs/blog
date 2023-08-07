// ==============================================

let keys = {};

// ==============================================

document.addEventListener("keydown", (e) => {
  if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', ' '].indexOf(e.key) >= 0) e.preventDefault();
  keys[e.key] = true;
}, false);

// ==============================================

document.addEventListener("keyup", ({ key }) => keys[key] = false, false);

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

const controls = {
  x,
  y
};

// ==============================================

export default controls;