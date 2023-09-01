const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// ==========================================

const GRAVITY = 0.5;

// ==========================================

// remove from array
const kill = (entities, idx) => setTimeout(() => entities.splice(idx, 1), 0);

// ==============================================

const loadImg = (str) => {
  const image = new Image();
  image.src = `/_assets/img/sprites/${str}`;
  return image; 
};

// ==============================================

export { 
  canvas, ctx, 
  GRAVITY, 
  kill, loadImg 
};