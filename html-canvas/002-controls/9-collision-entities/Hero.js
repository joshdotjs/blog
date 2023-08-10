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

  // const update = (x, y) => {
  const update = (controls, enemy) => {

    // move X (with wall collision detection)
    // vel.x = x;
   
    const new_xl = pos.x + vel.x; // left of entity
    const new_xr = new_xl + w;    // right of entity

    const new_yt = pos.y + vel.y; // top of entity
    const new_yb = new_yt + h;    // bottom of entity

    vel.x = controls.x;
    pos.x = new_xl;
  
    vel.y = controls.y;
    pos.y = new_yt;


    // if (AXRinBXL(new_xr, enemy.xl) && AXLinBXR(new_xl, enemy.xr)) {
    //   console.log('%cX-dimension collision', 'color: red');
    // }  else {
    //   console.log('%cNo X-dimension collision', 'color: green');
    // }

    // if (AYBinBYT(new_yb, enemy.yt) && AYTinBYB(new_yt, enemy.yb)) {
    //   console.log('%cY-dimension collision', 'color: red');
    // }  else {
    //   console.log('%cNo Y-dimension collision', 'color: green');
    // }

    if (
      AXRinBXL(new_xr, enemy.xl) && AXLinBXR(new_xl, enemy.xr) &&
      AYBinBYT(new_yb, enemy.yt) && AYTinBYB(new_yt, enemy.yb)
    ) {
      canvas.style.backgroundColor = 'darkorchid';
    }  else {
      canvas.style.backgroundColor = 'lightgreen';
    }

    render();
  };
  
  // ============================================

  function render () {
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, w, h);
  };

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