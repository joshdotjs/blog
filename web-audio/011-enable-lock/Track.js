// Minimal OOP - an object is the right structure for Track info

class Track {
  pattern = [];
  name = '';
  player = new Tone.Player().toDestination();
  steps = []; // DOM elements
  // load_btn = null;
  enabled = true;
  locked = false; // TODO

  elem = null;

  // ============================================

  constructor({ pattern, name, path, /*steps, load_btn, */ elem }) {
    this.pattern = pattern;
    this.name = name;
    this.player.load(path);

    this.elem = elem;

    // this.steps = steps;
    this.steps = elem.querySelectorAll('.steps > .step');

    // this.load_btn = load_btn;
    // this.load_btn = elem.querySelector('.track-title-container');

    this.initUI();
  }

  // ============================================

  initUI() {

    // ------------------------------------------

    // initialize the UI and set step click listeners
    const initSteps = () => {
      this.steps.forEach((step, j) => {
    
        // initialize the UI to match initial patterns
        if (this.pattern[j]) this.toggleStep(j);
    
        // toggle the pattern and UI when a step is clicked
        step.addEventListener('click', () => {
          this.toggle(j);
        });
      });
    };
    initSteps();

    // ------------------------------------------

    const initLoad = () => {
          // grab reference to <input> & <label>
      // const load_btn_label = this.load_btn.querySelector('label');
      // const load_btn_input = this.load_btn.querySelector('input');
      const load_btn_label = this.elem.querySelector('.track-title-container > label');
      const load_btn_input = this.elem.querySelector('.track-title-container > input');

      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
      // -we hide the <input> element — we do this because file inputs tend to be ugly, difficult to style, and inconsistent in their design across browsers.
      // -You can activate the input element by clicking its <label>, so it is better to visually hide the input and style the label like a button, so the user will know to interact with it if they want to upload files.

      // write name in button
      load_btn_label.textContent = this.name;

            // // not currently used
      // this.load_btn.addEventListener('click', () => {
      //   console.log('clicked track load button: ', this.name);
      // });

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
        const notification = () => {

          const rect = document.querySelector('main').getBoundingClientRect();
          const { top, right, bottom, left } = rect;

          console.log('uploaded file: ', file.name);
          const elem = document.createElement('div');
          elem.style.position = 'absolute';
          // elem.style.bottom = '32px';
          elem.style.left = '32px';
          // elem.style.width = '100vw';
          elem.style.zIndex = '100';
          elem.style.backgroundColor = 'white';
          elem.style.color = 'black';
          elem.style.borderRadius = '5px';
          elem.style.padding = '1rem';
          // elem.style.boxShadow = '0 0 1rem black';
          elem.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
          elem.textContent = `uploaded file: ${file.name}`;
          
          // elem.style.top = `calc(${bottom}px - ${elem.getBoundingClientRect().height}px)`;
          elem.style.top = `calc(${bottom}px - 54px - 32px)`;
          document.body.appendChild(elem);

          console.log('elem height: ', elem.getBoundingClientRect().height);
          console.log('elem height: ', `${elem.getBoundingClientRect().height}px`);

          const options = {
            duration: 750,
            easing: 'ease-in-out',
            fill: 'forwards',
          };
      
          elem.style.transform = 'translateX(-100%)';
          elem.animate([
              { transform: 'translateX(-100%)', opacity: 0 },
              { transform: 'translateX(0%)', opacity: 1 }
            ], 
            options
          );
      
          setTimeout(() => {
            elem.animate([
                { transform: 'translateX(0%)', opacity: 1 },
                { transform: 'translateX(-100%)', opacity: 0 }
              ], 
              options
            );
            setTimeout(() => document.body.removeChild(elem), options.duration);
          }, 3e3);

        };
        notification();
      });
    };
    initLoad();

    // ------------------------------------------

    const initEnable = () => {
      const enable_btn = this.elem.querySelector('.track-led-enable');
      enable_btn.addEventListener('click', () => {
        this.elem.classList.toggle('track-disabled');
        this.enabled = !this.enabled;

        // turn off .current styling on all steps
        if (!this.enabled)
          this.steps.forEach(step => step.classList.remove('current'));
      });
    };
    initEnable();

    // ------------------------------------------

    const initLock = () => {
      const lock_btn = this.elem.querySelector('.track-lock');
      lock_btn.addEventListener('click', () => {
        this.elem.classList.toggle('track-locked');
        this.locked = !this.locked;
      });
    };
    initLock();

    // ------------------------------------------
  }

  // ============================================

  toggleStep(index) {
    this.steps[index].classList.toggle('step-on');
  }

  // ============================================

  togglePattern(index) {
    this.pattern[index] = this.pattern[index] ? 0 : 1;
  }

  // ============================================

  toggle(index) {
    this.togglePattern(index);
    this.toggleStep(index);
  }

  // ============================================

  start(time) {
    this.player.start(time);
  }

  // ============================================
}

export default Track;