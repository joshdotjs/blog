import {draw_frame} from './draw.js';
// ----------------------------------------------
const create_matrix = (r,c) => [...Array(r)].map(() => Array(c).fill(0));
// ----------------------------------------------
let state = {
    data: null,
    create_state: function() {
        this.data = create_matrix(screen.num_grid_blocks_x, screen.num_grid_blocks_y);
    },
    set_state: function(block_x, block_y) {

        console.log("drag_state_object.current_device: ", drag_state_object.current_device);

        this.data[block_y][block_x]     = {
            device: drag_state_object.current_device,
            img:    drag_state_object.get_image()
        };

        console.log('UPDATED STATE:');
        console.log(this.data);
        console.log('Ending updated state!');
        console.log('Ending updated state!');
        console.log('Ending updated state!');
        console.log('Ending updated state!');

    },
    update_logic: function() {


        // 

    }
};
// ----------------------------------------------
let drag_state_object = {
    is_dragging: false,
    current_device: null,
    x: null, 
    y: null,
    set_drag_pos: function(x, y) {
        this.x = x;
        this.y = y;
    },
    get_image: function() {
        if (this.current_device === 'BOOL-switch') {
            return screen.imgs[1];
        } else if (this.current_device === 'AND-gate') {
            return screen.imgs[2];
        } else if (this.current_device === 'OR-gate') {
            return screen.imgs[3];
        }
    },
    begin_dragging: function(device, x, y) {
        this.is_dragging = true;
        this.current_device = device;
        this.set_drag_pos(x, y);
    },
    end_dragging: function() {
        this.is_dragging = false;
        this.current_device = null;

    }
};
// ----------------------------------------------
let timer;
// ----------------------------------------------
let screen = {
    canvas_ctx: null,
    screen_width: null,
    screen_height: null,
    grid_spacing: null,
    num_grid_blocks_x: null,
    num_grid_blocks_y: null,
    imgs: [],
    num_devices_in_picker: 0,
    setup_canvas: function(canvas_id='canvas', grid_spacing=50) {
        this.grid_spacing = grid_spacing;
        const canvas = document.querySelector(`#${canvas_id}`);
        this.canvas_ctx = canvas.getContext('2d');

        this.width  = canvas.width  = window.innerWidth;
        this.height = canvas.height = window.innerHeight;       

        this.num_grid_blocks_x = Math.floor(this.width / this.grid_spacing);
        this.num_grid_blocks_y = Math.floor(this.height / this.grid_spacing);

        console.log(`grid_spacing: ${this.grid_spacing}`);
        console.log(`canvas width: ${this.width}`);
        console.log(`canvas height: ${this.height}`);
        console.log(`num grid blocks x: ${this.num_grid_blocks_x}`);
        console.log(`num grid blocks y: ${this.num_grid_blocks_y}`);
        console.log(`: ${this.grid_spacing}`);
        console.log(`: ${this.grid_spacing}`);
        
        const img_0_off = new Image();	        img_0_off.src = './img/digital-source-off.png';
        img_0_off.onload = () => {
            console.log('1st image loaded');
            this.imgs.push(img_0_off);
            const img_0 = new Image();  	    img_0.src = './img/digital-source-on.png';
            img_0.onload = () => {
                console.log('2nd image loaded');
                this.imgs.push(img_0);
                const img_1 = new Image();	    img_1.src = './img/and-gate.png';
                img_1.onload = () => {
                    console.log('3rd image loaded');
                    this.imgs.push(img_1);
                    const img_2 = new Image();	img_2.src = './img/or-gate.png';
                    img_2.onload = () => {
                        console.log('4th image loaded');
                        this.imgs.push(img_2);

                        // Update number of devices to be displayed in device-picker:
                        this.num_devices_in_picker = this.imgs.length - 1; // Don't display off-swtitch

                        // All images are loaded:
                        // -Draw initial frame (with picker)
                        draw_frame();
                    };
                };
            };
        };
    }
};
// ----------------------------------------------
export {screen, drag_state_object, state};