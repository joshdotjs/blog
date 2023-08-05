import { qs, qsa, fireEvent } from '../../util.js';

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
  // {
  //   id: 'task-bar__dropdown-options',
  // },
  // {
  //   id: 'task-bar__dropdown-patterns',
  // },
];

// ==============================================

// -


const setupDropdown = ({ id, name, items }) => {
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
  
  let opened = false;

  dropdown_trigger.addEventListener('click', () => {

    const duration = 0.2;

    if (!opened) {
      dropdown_menu.classList.add('show');
      gsap.fromTo(dropdown_menu, { 
        opacity: 0, yPercent: -10, duration
      },
      { 
        opacity: 1, yPercent: 0, duration
      }
      );
    } else {
      gsap.to(dropdown_menu, { opacity: 0, yPercent: -10, duration, onComplete: () => {
        dropdown_menu.classList.remove('show');
      }});
    }
    opened = !opened;
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
  dropdown_data.forEach((dropdown_datum) => {
    setupDropdown(dropdown_datum);
  });

} catch(e) {
  console.log(`%c${e}`, 'padding: 0.5rem 1rem; border: solid hotpink 4px; background: lightgreen; color: darkorchid;');
}