import { canvas, ctx } from "./util.js";

// ==========================================

const createElement = (type) => document.createElement(type);
const qs = (str, elem=document) => elem.querySelector(str);

// ==========================================

// const css = {
//   get(str) {
//     // Get the styles (properties and values) for the root
//     const rs = getComputedStyle(r);
//     // Return the value of the --blue variable
//     return rs.getPropertyValue(str);
//   },
//   // Create a function for setting a variable value
//   set(str, val) {
//     // Set the value of variable --point-size
//     const r = qs(':root');
//     r.style.setProperty(str, str);
//   }
// };

// ==========================================

const setupPoints = () => {
  
  const main = qs('main');
  
  const GAP = 50;
  const WIDTH = 50;
  
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      const elem = createElement('div');
      elem.classList.add('point');
      elem.style.top = `${i * (WIDTH + GAP)}px`;
      elem.style.left = `${j * (WIDTH + GAP)}px`;
      main.appendChild(elem);

      elem.addEventListener('click', () => {
        console.log('i: ', i, '\tj: ', j);
      });
    }
  }



};
setupPoints();