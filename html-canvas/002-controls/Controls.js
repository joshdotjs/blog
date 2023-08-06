
// Mouse:
//  -0: No button
//  -1: Left button
//  -2: Middle button (if present)
//  -3: Right button

// Keyboard:


// Desktop Mouse and Keyboard Controls:
//  -https://developer.mozilla.org/en-US/docs/Games/Techniques/Control_mechanisms/Desktop_with_mouse_and_keyboard

// Key Codes:
// -https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes#a-full-list-of-key-event-values

// NAME	        EVENT.WHICH	    EVENT.KEY	    EVENT.CODE	    NOTES
// space	      32		          ' '           Space	          The event.key value is a single space.
// left arrow	  37	            ArrowLeft	    ArrowLeft	
// up arrow	    38	            ArrowUp	      ArrowUp	
// right arrow	39	            ArrowRight	  ArrowRight	
// down arrow	  40	            ArrowDown	    ArrowDown	
// 0	          48	            0	            Digit0	
// 1	          49	            1	            Digit1	
// 2	          50	            2	            Digit2	
// 3	          51	            3	            Digit3	
// 4	          52	            4	            Digit4	
// 5	          53	            5	            Digit5	
// 6	          54	            6	            Digit6	
// 7	          55	            7	            Digit7	
// 8	          56	            8	            Digit8	
// 9	          57	            9	            Digit9	
// a	          65	            a	            KeyA	
// b	          66	            b	            KeyB	
// c	          67	            c	            KeyC	
// d	          68	            d	            KeyD	
// e	          69	            e	            KeyE	
// f	          70	            f	            KeyF	
// g	          71	            g	            KeyG	
// h	          72	            h	            KeyH	
// i	          73	            i	            KeyI	
// j	          74	            j	            KeyJ	
// k	          75	            k	            KeyK	
// l	          76	            l	            KeyL	
// m	          77	            m	            KeyM	
// n	          78	            n	            KeyN	
// o	          79	            o	            KeyO	
// p	          80	            p	            KeyP	
// q	          81	            q	            KeyQ	
// r	          82	            r	            KeyR	
// s	          83	            s	            KeyS	
// t	          84	            t	            KeyT	
// u	          85	            u	            KeyU	
// v	          86	            v	            KeyV	
// w	          87	            w	            KeyW	
// x	          88	            x	            KeyX	
// y	          89	            y	            KeyY	
// z	          90	            z	            KeyZ


class Controls {
  constructor() {
    this.keys = {};

    // Bind event handlers
    document.addEventListener("keydown", e => {
      // if ([37, 38, 39, 40, 32].indexOf(e.which) >= 0) {
      //   e.preventDefault();
      // }
      if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', ' '].indexOf(e.key) >= 0) {
        e.preventDefault();
      }
      // this.keys[e.keyCode] = true;
      this.keys[e.key] = true;
    }, false);

    document.addEventListener("keyup", e => {
      // this.keys[e.keyCode] = false;
      this.keys[e.key] = false;
    }, false);
  }

  key(key, value) {
    if (value !== undefined) {
      this.keys[key] = value;
    }
    return this.keys[key];
  }

  reset () {
    for (let key in this.keys) {
      this.keys[key] = false;
    }
  }

  // Handle key actions
  get action() {
    return this.keys[' '];
  }

  get x() {
    if (this.keys['ArrowLeft'] || this.keys['a']) {
      return -1;
    }
    if (this.keys['ArrowRight'] || this.keys['d']) {
      return 1;
    }
    return 0;
  }

  get y() {
    if (this.keys['ArrowUp'] || this.keys['w']) {
      return -1;
    }
    if (this.keys['ArrowDown'] || this.keys['s']) {
      return 1;
    }
    return 0;
  }
}


export default Controls;