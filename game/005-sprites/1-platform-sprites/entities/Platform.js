import { canvas, ctx, loadImg } from "../util/util.js";

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function newPlatform({
  size: { width, height }, 
  position,
  color='hotpink',
}) {

  // ============================================

  const [w, h] = [width, height];

  const platform_img = loadImg('platform.png');

  // ============================================

  // position
  let pos = { 
    x: position?.x ?? canvas.width / 2 - w / 2,
    y: position?.y ?? canvas.height / 2 - h / 2,
    xr: position?.x + w ?? canvas.width / 2 - w / 2 + w,
    y1: position?.x + h ?? canvas.height / 2 - h / 2 + h,
  };

  // ============================================

  // velocity
  let vel = { x: 0, y: 0 };

  const update = (x, y) => {
    render();
  };
  
  // ============================================

  function render () {
    ctx.drawImage(platform_img, pos.x, pos.y);

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

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================
