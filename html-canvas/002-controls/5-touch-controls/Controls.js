// touch start
// touch move
// touch end

// event object:
// -touches:       where screen is touched
// -targetTouches: where you are touching within the element
// -changedTouches: all of the touches that have changes since the last time the event fired

// ==============================================

const main = document.querySelector('main');
main.addEventListener('touchstart', e => {
    // disable touch zooming / scrolling
    e.preventDefault(); // NOTE: this also disables click events via touch
    
    // detect multi-touch gestures
    if (e.targetTouches.length >= 2)
      console.log('multi-touch');

    // -can implement swipe gestures by evaluating the 
    //  change in touch coordinates during touch move
});

// ==============================================

document.addEventListener("touchstart", e => {
  // console.log('start');
  [...e.changedTouches].forEach((touch) => {
    const div = document.createElement('div');
    div.classList.add('touch');
    div.style.top = `${touch.pageY}px`;
    div.style.left = `${touch.pageX}px`;
    div.id = touch.identifier; // index in array for each touch 
    document.body.appendChild(div);
  });
});

// ==============================================

document.addEventListener("touchmove",  e => {
  // console.log('move');
  [...e.changedTouches].forEach((touch) => {
    const dot = document.getElementById(touch.identifier);
    dot.style.top = `${touch.pageY}px`;
    dot.style.left = `${touch.pageX}px`;
  });
});

// ==============================================

const touchEnd = (e) => {
  // console.log('end');
  [...e.changedTouches].forEach((touch) => {
    const div = document.getElementById(touch.identifier);
    if (div) div.remove();
  });
};

document.addEventListener("touchend", touchEnd);
document.addEventListener("touchcancel", touchEnd);

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

const touch_controller_up = document.querySelector('#touch-controller-up');
const touch_controller_down = document.querySelector('#touch-controller-down');
const touch_controller_left = document.querySelector('#touch-controller-left');
const touch_controller_right = document.querySelector('#touch-controller-right');

const consoleBorder = () => console.log('%c                  ', 'border-bottom: 1px solid red; width: 300px;');

touch_controller_up.addEventListener('touchstart', e => {
  console.log('up');
  console.log('touches: ', e.touches.length);
  console.log('targets: ', e.targetTouches.length);
  consoleBorder();
});

touch_controller_down.addEventListener('touchstart', e => {
  console.log('down');
  console.log('touches: ', e.touches.length);
  console.log('targets: ', e.targetTouches.length);
  consoleBorder();
});

touch_controller_left.addEventListener('touchstart', e => {
  console.log('left');
  console.log('touches: ', e.touches.length);
  console.log('targets: ', e.targetTouches.length);
  consoleBorder();
});

touch_controller_right.addEventListener('touchstart', e => {
  console.log('right');
  console.log('touches: ', e.touches.length);
  console.log('targets: ', e.targetTouches.length);
  consoleBorder();
});

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================


class Controls {
  constructor() {
    this.keys = {};

    document.addEventListener("keydown", e => {
      if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', ' '].indexOf(e.key) >= 0) e.preventDefault();
      this.keys[e.key] = true;
    }, false);

    document.addEventListener("keyup", e => this.keys[e.key] = false, false);
  }

  get x() {
    if (this.keys['ArrowLeft']  || this.keys['a'])  return -1;
    if (this.keys['ArrowRight'] || this.keys['d'])  return 1;
    return 0;
  }

  get y() {
    if (this.keys['ArrowUp']   || this.keys['w'])  return -1;
    if (this.keys['ArrowDown'] || this.keys['s'])  return 1;
    return 0;
  }
}

export default Controls;