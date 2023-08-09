import { canvas, ctx } from "./util.js";
import controls from "./Controls.js";
import { newEntity } from './Entity.js';

// ==========================================

let entity_1;
let entity_2;

const reset = () => {
  entity_1 = newEntity({ 
    size: { width: 50, height: 50 },
  })

  entity_2 = newEntity({ 
    color: 'black',
    size: { width: 50, height: 50 },
    position: { x: canvas.width / 2 + 50, y: canvas.height / 2 + 50},
  })
};
reset();

// ==========================================

// const reset_button = document.querySelector('#reset-button');
// reset_button.addEventListener('click', () => reset());

// ==========================================

function animate(t1) {
  requestAnimationFrame(animate);

  // Refresh:
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update:
  entity_1.update(controls.x(), controls.y());

  // Render:
  // entity_1.render();
  // entity_2.render();
}
animate();