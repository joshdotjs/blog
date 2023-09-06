import { canvas, ctx, loadImg } from "../util/util.js";

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function newPlatform({
  position,
  image,
}) {

  // ============================================

  const [w, h] = [image.width, image.height];

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
    ctx.drawImage(image, pos.x, pos.y);
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