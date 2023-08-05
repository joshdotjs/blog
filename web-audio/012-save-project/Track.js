// Minimal OOP - an object is the right structure for Track info

import { setLS, fireEvent, qs } from './util.js' ;
import { notification } from './notification.js';

class Track {
  pattern = [];
  name = '';
  path = '';
  player = new Tone.Player().toDestination();
  steps = []; // DOM elements
  enabled = true;
  locked = false;
  elem = null;

  // ============================================

  constructor({ pattern, name, path, /* elem, */ enabled, locked, num }) {
    this.num = num;
    this.elem = qs(`.track-${num}`),
    this.pattern = pattern;
    this.name = name;
    this.path = path;
    this.player.load(path);
    this.enabled = enabled;
    this.locked = locked;
    this.steps = this.elem.querySelectorAll('.steps > .step');
    this.initUI();    
  }

  // ============================================

  initUI() {

    // ------------------------------------------

    // initialize the UI and set step click listeners
    const initSteps = () => {
      this.steps.forEach((step, j) => {
    
        // initialize the UI to match initial patterns
        // if (this.pattern[j]) this.toggleStep(j);
        if (this.pattern[j]) this.turnStepOn(j); // DON'T TOGGLE
        else this.turnStepOff(j);

        // toggle the pattern and UI when a step is clicked
        step.addEventListener('click', () => {
          
          console.clear();
          console.log('%cstep click listener', 'color: green;');

          this.toggle(j);
          if (this.pattern[j]) this.turnOn(j);
          else this.turnOff(j);

          fireEvent('track-change', { data_key: `track: ${this.name}\nstep click: ${j}` });
        });
      });
    };
    initSteps();

    // ------------------------------------------

    const initLoad = () => {
      const load_btn_label = this.elem.querySelector('.track-title-container > label');
      const load_btn_input = this.elem.querySelector('.track-title-container > input');

      // write name in button
      load_btn_label.textContent = this.name;

      // file upload:
      load_btn_input.addEventListener('change', (e) => {

        // step 1: upload file
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        this.player.load(url);

        // step 2: change title
        // -if file has file extension, then remove it from name:
        let name = file.name.split('.');
        if (name.length > 1) {
          name.pop();
          name = name.join('.');
        }
        // -write title to button
        this.name = name;
        load_btn_label.textContent = name;

        // show notification to user:
        const message = `uploaded file: ${file.name}`
        notification({ message });

        fireEvent('track-change', { data_key: `track: ${this.name}\nload change` });
      });
    };
    initLoad();

    // ------------------------------------------

    const initEnable = () => {

      // set disbled styles if track is disabled on load
      if (!this.enabled) {
        this.elem.classList.add('track-disabled');
      } else {
        this.elem.classList.remove('track-disabled');
      }

      const enable_btn = this.elem.querySelector('.track-led-enable');
      enable_btn.addEventListener('click', () => {
        // this.elem.classList.toggle('track-disabled');
        if (!this.enabled) this.elem.classList.remove('track-disabled'); // DON'T TOGGLE
        else this.elem.classList.add('track-disabled');;

        this.enabled = !this.enabled;

        // turn off .current styling on all steps
        if (!this.enabled)
          this.steps.forEach(step => step.classList.remove('current'));

        fireEvent('track-change', { data_key: `track: ${this.name}\nenable click` });
        
      });
    };
    initEnable();

    // ------------------------------------------

    const initLock = () => {

      // set locked styles if track is locked on load
      if (this.locked)
        this.elem.classList.add('track-locked');

      const lock_btn = this.elem.querySelector('.track-lock');
      lock_btn.addEventListener('click', () => {
        this.elem.classList.toggle('track-locked');
        this.locked = !this.locked;
        fireEvent('track-change', { data_key: `track: ${this.name}\nlock click` });
      });
    };
    initLock();

    // ------------------------------------------
  }

  // ============================================

  toggleStep(index)  { this.steps[index].classList.toggle('step-on'); }
  turnStepOn(index)  { this.steps[index].classList.add('step-on'); }
  turnStepOff(index) { this.steps[index].classList.remove('step-on'); }

  // ============================================

  togglePattern(index) { this.pattern[index] = this.pattern[index] ? 0 : 1; }
  turnPatternOn(index) { this.pattern[index] = 1; }
  turnPatternOff(index) { this.pattern[index] = 0; }

  // ============================================

  toggle(index) {
    this.togglePattern(index);
    this.toggleStep(index);
  }

  turnOn(index) {
    this.turnPatternOn(index);
    this.turnStepOn(index);
  }

  turnOff(index) {
    this.turnPatternOff(index);
    this.turnStepOff(index);
  }

  // ============================================

  start(time) {
    this.player.start(time);
  }

  // ============================================

  getData() {
    return {
      pattern: this.pattern,
      name: this.name,
      path: this.path,
      enabled: this.enabled,
      locked: this.locked,
    };
  }

  // ============================================
}

export default Track;