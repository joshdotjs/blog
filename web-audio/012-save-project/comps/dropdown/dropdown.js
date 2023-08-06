import { qs, qsa, fireEvent, listenForEvent } from '../../util.js';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

const dropdown_data = [
  {
    id: 'task-bar__dropdown-file',
    name: 'File',
    items: [
      {
        label: 'Save',
        callback: () => {
          fireEvent('project-save');
        },
      },
      {
        label: 'Open',
        callback: () => {
          fireEvent('project-open');
        },
      },
      {
        label: 'Reset',
        callback: () => {
          fireEvent('project-reset');
        },
      },
    ]
  },
  {
    id: 'task-bar__dropdown-edit',
    name: 'Edit',
    items: [
      {
        label: 'Option 1',
        callback: () => {},
      },
      {
        label: 'Option 2',
        callback: () => {},
      },
    ]
  },
  {
    id: 'task-bar__dropdown-options',
    name: 'Options',
    items: [
      {
        label: 'Option 1',
        callback: () => {},
      },
      {
        label: 'Option 2',
        callback: () => {},
      },
    ]
  },
  {
    id: 'task-bar__dropdown-patterns',
    name: 'Patterns',
    items: [
      {
        label: 'Option 1',
        callback: () => {},
      },
      {
        label: 'Option 2',
        callback: () => {},
      },
    ]
  },
  {
    id: 'task-bar__dropdown-help',
    name: 'Help',
    items: [
      {
        label: 'Option 1',
        callback: () => {},
      },
      {
        label: 'Option 2',
        callback: () => {},
      },
    ]
  },
];

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

const animateInDropdown = (dropdown_menu) => {

  console.log('animateInDropdown()');

  const duration = 0.2;

  dropdown_menu.classList.add('show');
  gsap.fromTo(dropdown_menu, { 
      opacity: 0, yPercent: -10, duration
    },
    { 
      opacity: 1, yPercent: 0, duration
    }
  );
};

// ==============================================

const animateOutDropdown = (dropdown_menu) => {

  console.log('%canimateOutDropdown()', 'color: red');

  const duration = 0.2;

  gsap.to(dropdown_menu, { opacity: 0, yPercent: -10, duration, onComplete: () => {
    dropdown_menu.classList.remove('show');
  }});
};

// ==============================================

const setupDropdown = ({ id, name, items }) => {
  
  let opened = false;
  
  const query = `.dropdown#${id}`;
  const dropdown = qs(query);

  // --------------------------------------------

  // <buton class="dropdown-trigger">File</button>
  const dropdown_trigger = document.createElement('div');
  dropdown_trigger.classList.add('dropdown-trigger');
  dropdown_trigger.textContent = name;
  dropdown.appendChild(dropdown_trigger);

  // --------------------------------------------

  // <ul class="dropdown-menu">
  //   <li class="dropdown-item">Save</li>
  //   <li class="dropdown-item">Open</li>
  //   <li class="dropdown-item">Reset</li>
  // </ul>
  const dropdown_menu = document.createElement('ul');
  const dropdown_menu_items = [];
  dropdown_menu.classList.add('dropdown-menu');
  items.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('dropdown-item');
    li.textContent = item.label;
    dropdown_menu_items.push(li);
    dropdown_menu.appendChild(li);
  });
  // console.log('dropdown_menu: ', dropdown_menu);
  dropdown.appendChild(dropdown_menu);

  // --------------------------------------------
  
  listenForEvent('dropdown-opening', () => {
    if (opened) { // close dropdown
      animateOutDropdown(dropdown_menu);
      opened = false;
    }
  });

  // --------------------------------------------

  dropdown_trigger.addEventListener('click', () => {


    console.log('%cdropdown_trigger clicked!', 'color: green');

    
    if (!opened) {// open dropdown
      fireEvent('dropdown-opening'); // close all dropdowns (effectively only the previously opened one)
      animateInDropdown(dropdown_menu); // open the currently clicked dropdown
      opened = true;
    } else { // close only the current dropdown (it is currently opened, and we clicked it again)
      animateOutDropdown(dropdown_menu);
      opened = false;
    }
    
  });

  // --------------------------------------------

  const animateItem = (item) => {
    const tl = gsap.timeline();
    const duration = 0.075;
    tl.to(item, { background: 'black', color: 'white', duration });
    tl.to(item, { background: 'white', color: 'black', duration });
    tl.to(item, { background: 'black', color: 'whie',  duration });
    tl.to(item, { background: 'white', color: 'black', duration });
    tl.to(item, { background: 'black', color: 'white', duration });
    tl.to(item, { background: 'white', color: 'black', duration, 
      onComplete: () => {
        gsap.to(dropdown_menu, { opacity: 0, yPercent: -10, duration: 0.2, onComplete: () => {
        dropdown_menu.classList.remove('show');
        opened = false;
      }});
    }});
  };

  // --------------------------------------------

  dropdown_menu_items.forEach((dropdown_menu_item, idx) => {

    dropdown_menu_item.addEventListener('click', (e) => {
      e.stopPropagation();

      animateItem(dropdown_menu_item);

      // execute callback for menu item
      items[idx].callback();
    });
  });

  // --------------------------------------------
};

// ==============================================

try {

  // Logic: 
  //  -Each dropdown is implemented in the function setupDropdown()
  //  -The data for each dropdown is stored in the array dropdown_data
  //  -The array dropdown_data is iterated over, and each datum is passed to setupDropdown()
  //  -setupDropdown() creates the dropdown and adds it to the DOM
  //  -setupDropdown() also adds event listeners to the dropdown
  //  -The event listeners are responsible for opening and closing the dropdown
  //  -The event listeners also execute the callback for the menu item that was clicked
  //  -The callback for the menu item that was clicked is responsible for executing the desired functionality
  //  -We have two animations here:
  //    -animateInDropdown() /animateOutDropdown()  animates the dropdown opening and closing
  //    -animateItem() animates the menu item that was clicked and then closes the dropdown
  //  -We have a state variable stored as a closure that keeps track of whether the dropdown is open or closed
  //  -When we open one dropdown, we close all other dropdowns by firing a custom event named 'dropdown-opening'
  //   and before we open the current dropdown that was clicked we execute animateOutDropdown() on all dropdowns 
  //   and for the ones that are open they are closed -- this effectively closes the previously opened dropdown 
  //   without having to keep track of which one the previous one was in terms of sharing state between the dropdowns.


  dropdown_data.forEach((dropdown_datum) => {
    setupDropdown(dropdown_datum);
  });

} catch(e) {
  console.log(`%c${e}`, 'padding: 0.5rem 1rem; border: solid hotpink 4px; background: lightgreen; color: darkorchid;');
}