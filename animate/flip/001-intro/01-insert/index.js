import { v4 as uuid } from 'https://jspm.dev/uuid';

import { 
  listen, listenAll,
  qs, qsAll,
  createElement, resetElement,  
 } from './util/dom.js';

// ==============================================

let layout = {
  items: [
    { id: uuid(), status: 'entered' },
    { id: uuid(), status: 'entered' }
  ],
};

// ==============================================

const setLayout = (new_layout) => {

  console.log('setLayout() - new_layout: ', new_layout);

  layout = new_layout;
  updateUI();
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
    container.append(div);
  });
}

resetUI();

// ==============================================

function updateUI() {

 const container = qs('#container');

  // FLIP Step 2: Update state
  const div = createElement('div');
  div.classList.add('box');
  const { items } = layout;
  const item = items[items.length - 1];
  div.textContent = item.status;
  container.append(div);


  if (!layout.state) return;

  // FLIP Step 3: Apply FLIP
  Flip.from(layout.state, {
    absolute: true,
    targets: '.box',
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
  },
});