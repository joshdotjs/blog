import { canvas, ctx } from "./util.js";

const newHero = ({
  size: { width, height }, 
  position,
  color='darkorange', // this.color = color;
}) => {

  // ============================================

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

  // const update = (x, y) => {
  const update = (controls, enemy) => {

    const new_xl = pos.x + vel.x; // left of entity
    const new_xr = new_xl + w;    // right of entity

    const new_yt = pos.y + vel.y; // top of entity
    const new_yb = new_yt + h;    // bottom of entity

    pos.x = new_xl;
    vel.x = controls.x;
  
    pos.y = new_yt;
    // vel.y = controls.y;
    vel.y += 0.5;

    // Check for collision with canvas bottom
    if (pos.y + h > canvas.height) {
      pos.y = canvas.height - h;
      vel.y = 0;
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

  // ============================================
  // ============================================
  // ============================================
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

export { newHero };