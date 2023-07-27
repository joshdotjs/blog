// Minimal OOP - an object is the right structure for Track info

class Track {
  pattern = [];
  name = '';
  player = new Tone.Player().toDestination();
  steps = []; // DOM elements
  load_btn = null;

  constructor({ pattern, name, path, steps, load_btn }) {
    this.pattern = pattern;
    this.name = name;
    this.player.load(path);
    this.steps = steps;
    // <div class="steps">
    //   <div class="step step-A"></div>
    //   ...
    //   <div class="step step-B"></div>
    //   </div>
    // </div>

    this.load_btn = load_btn;

    this.initUI();
  }

  initUI() {
    // initialize the UI and set step click listeners
    this.steps.forEach((step, j) => {
  
      // initialize the UI to match initial patterns
      if (this.pattern[j]) this.toggleUI(j);
  
      // toggle the pattern and UI when a step is clicked
      step.addEventListener('click', () => {
        this.toggle(j);
      });
    });

    // grab reference to <input> & <label>
    const load_btn_label = this.load_btn.querySelector('label');
    const load_btn_input = this.load_btn.querySelector('input');

    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
    // -we hide the <input> element — we do this because file inputs tend to be ugly, difficult to style, and inconsistent in their design across browsers.
    // -You can activate the input element by clicking its <label>, so it is better to visually hide the input and style the label like a button, so the user will know to interact with it if they want to upload files.

    // not currently used
    load_btn_label.textContent = this.name;
    this.load_btn.addEventListener('click', () => {
      console.log('clicked track load button: ', this.name);
    });

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
        console.log('uploaded file: ', file.name);
        const elem = document.createElement('div');
        elem.style.position = 'absolute';
        elem.style.bottom = '32px';
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
        document.body.appendChild(elem);

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
          setTimeout(() => document.body.removeChild(elem), duration);
        }, 3e3);
        
      };
      notification();
    });
  }

  toggleUI(index) {
    this.steps[index].classList.toggle('step-on');
  }

  togglePattern(index) {
    this.pattern[index] = this.pattern[index] ? 0 : 1;
  }

  toggle(index) {
    this.togglePattern(index);
    this.toggleUI(index);
  }

  start(time) {
    this.player.start(time);
  }
}

export default Track;