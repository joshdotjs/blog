import uuid from './util/uuid.js';

// ==============================================

import { 
  listen, listenAll,
  qs, qsAll,
  createElement, resetElement,  
 } from './util/dom.js';

// ==============================================

const duration = 0.5;

// ==============================================

// -Currently this layout object is not really needed.
// -The initial render uses it to draw the first set of boxes.
// -The updateUI_addItem() function does use it.
// -Updating the removal of an does not use it, 
//  but it does update it to keep 'layout' state in synch with DOM.

let layout = {
  items: [
    { id: uuid(), status: 'entered' },
    { id: uuid(), status: 'entered' },
  ],
};

// ==============================================

const setLayout = (new_layout) => {

  console.log('setLayout() - new_layout: ', new_layout);

  layout = new_layout;
};

// ==============================================

const clickHandler = (event) => {
  console.log('clicked');

  const { target } = event;
  console.log('target: ', target);

  // -TODO: FLIP Step 1: Get FLIP state
  const state = Flip.getState('.box');
  

  // FLIP Step 2: Change DOM state
  // -Add .exiting class:
  target.classList.add('exiting');

  // -TODO: Apply FLIP
  Flip.from(state, {
    absolute: true, 
    ease: 'power1.inOut',
    targets: '.box',
    scale: true,
    onLeave: elements => {
      console.log('onLeave()');
      return gsap.to(elements, { 
        opacity: 0, 
        scale: 0,
        onComplete: () => {

          // -Syncrhonize local state:
          //  --Step 1: Grab ID of element clicked
          const id = target.dataset.id;
          //  --Step 2: Remove the element with that ID from layout.
          const filtered = layout.items.filter((item) => item.id !== id);
          setLayout({
            state,
            items: filtered
          });

          // -Remove element from DOM:
          console.log('removing Item from DOM');
          target.remove();

        },
        duration,
      });
    },
  });







  // TODO: onComplete()
  // TODO: onComplete()
  // TODO: onComplete()
  // -Remove this one element from DOM?
  setTimeout(() => {
    

  }, 2e3);

};

// ==============================================

function resetUI() {

  const container = qs('#container');

  resetElement(container);

  // -loop over layout.items and render in DOM
  layout.items.forEach((item) => {   
    const div = createElement('div');
    div.textContent = item.status;
    div.classList.add('box');
    div.dataset.id = item.id;
    container.append(div);

    // Add event listener listending for click event to add .removing class
    listen({
      elem: div,
      event: 'click',
      callback: clickHandler,
    });

  });
}

resetUI();

// ==============================================


// THIS FUNCTION IS SPECIFIC TO ADDING AN ITEM!!!
function updateUI_addItem() {

 const container = qs('#container');

  // FLIP Step 2: Update state
  const div = createElement('div');
  div.classList.add('box');
  const { items } = layout;
  const item = items[items.length - 1];
  div.textContent = item.status;
  container.append(div);

  // Add event listener listending for click event to add .removing class
  listen({
    elem: div,
    event: 'click',
    callback: clickHandler,
  });


  if (!layout.state) return;

  // FLIP Step 3: Apply FLIP
  Flip.from(layout.state, {
    absolute: true,
    targets: '.box',
    scale: true,// Resize via width/height properties (default) or scaleX/scaleY (scale: true)
    ease: 'power1.inOut',
    onEnter: (elements) => {
      return gsap.fromTo(elements, 
        { opacity: 0, scale: 0 }, 
        { opacity: 1, scale: 1 }, 
      );
    },
  });

}

// ==============================================

listen({
  selector: '#add-btn', 
  event: 'click',
  callback: () => {

    console.log('clicked');

    // FLIP Step 1: Take snapshot of state
    setLayout({
      items: [...layout.items, { id: uuid(), status: 'entered' }],
      state: Flip.getState('.box'),
    });

    updateUI_addItem();
  },
});