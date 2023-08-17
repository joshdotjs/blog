import { canvas, ctx } from "./util.js";

// ==========================================

const createElement = (type) => document.createElement(type);
const qs  = (str, elem=document) => elem.querySelector(str);
const qsa = (str, elem=document) => elem.querySelectorAll(str);

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

// const loadImg = (str) => {
//   const image = new Image();
//   image.src = `./${str}`;
//   return image; 
// };

// const img = loadImg('lena.png');
// ctx.drawImage(img, 0, 0, 50, 50);

// const image = new Image(60, 45); // Using optional size for image
// image.onload = function() {

//   // Load an image of intrinsic size 300x227 in CSS pixels
//   image.src = "/digital-logic/001-canvas/lena.png";
//   ctx.drawImage(image, 0, 0);
// }; // Draw when image has loaded

// ==========================================


let selected_element = {
  type: null,
};

// ==========================================

const setupElementPicker = () => {

  const dom_elements = qsa('section#elements-picker > .element');
  console.log('dom_elements: ', dom_elements);


  dom_elements.forEach((dom_element) => {
    
    const element_type = dom_element.dataset.type;

    dom_element.addEventListener('click', () => {
      if (element_type === 'and') {
        selected_element.type = 'and';
      } else
      if (element_type === 'not') {
        selected_element.type = 'not';
      }

      console.log('selected element: ', selected_element);
    });
  });
};
setupElementPicker();

// ==========================================

const setupPoints = () => {
  
  const canvas_container = qs('section#canvas');
  
  const GAP = 40;
  const WIDTH = 20;
  
  for (let i = 0; i < 5; ++i) {
    for (let j = 0; j < 5; ++j) {
      const elem = createElement('div');
      elem.classList.add('point');
      elem.style.top = `${i * (WIDTH + GAP)}px`;
      elem.style.left = `${j * (WIDTH + GAP)}px`;
      canvas_container.appendChild(elem);

      elem.addEventListener('click', () => {
        if (selected_element.type !== null) {
          console.log('place element: ', selected_element, '\ni: ', i, '\tj: ', j);
          selected_element.type = null;
        }
      });
    }
  }
};
setupPoints();