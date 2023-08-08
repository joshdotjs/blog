// touch start
// touch move
// touch end

// event object:
// -touches:       where screen is touched
// -targetTouches: where you are touching within the element
// -changedTouches: all of the touches that have changes since the last time the event fired

document.addEventListener("touchstart", e => {
  console.log('start');

  [...e.changedTouches].forEach((touch) => {
    const div = document.createElement('div');
    div.classList.add('touch');
    div.style.top = `${touch.pageY}px`;
    div.style.left = `${touch.pageX}px`;
    div.id = touch.identifier; // index in array for each touch 
    document.body.appendChild(div);
  });
});
document.addEventListener("touchmove",  e => {
  console.log('move');
});
document.addEventListener("touchend",   e => {
  console.log('end');

  [...e.changedTouches].forEach((touch) => {
    const div = document.getElementById(touch.identifier);
    if (div) div.remove();
  });
});



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