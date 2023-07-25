// Minimal OOP - an object is the right structure for Track info

class Track {
  pattern = [];
  name = '';
  player = new Tone.Player().toDestination();
  steps = []; // DOM elements

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

    // initialize the load button
    const load_btn_label = this.load_btn.querySelector('label');
    const load_btn_input = this.load_btn.querySelector('input');

    // console.log('load_btn_label: ', load_btn_label);
    console.log('load_btn_input: ', load_btn_input);

    load_btn_label.textContent = this.name;
    this.load_btn.addEventListener('click', () => {
      console.log('clicked track load button: ', this.name);
    });
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
    // -we hide the <input> element — we do this because file inputs tend to be ugly, difficult to style, and inconsistent in their design across browsers.
    // -You can activate the input element by clicking its <label>, so it is better to visually hide the input and style the label like a button, so the user will know to interact with it if they want to upload files.
    load_btn_input.style.opacity = 0.5;
    load_btn_input.style.textContent = 'absolute';
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