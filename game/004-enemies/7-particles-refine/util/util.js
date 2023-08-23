const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// ==========================================

const GRAVITY = 0.5;

// ==========================================

// remove from array
const kill = (entities, idx) => setTimeout(() => entities.splice(idx, 1), 0);

// ==========================================

export { canvas, ctx, GRAVITY, kill }