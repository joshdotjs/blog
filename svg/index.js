const svg_sprite = document.querySelector('.svg-sprite');
const g_sprite_1 = document.querySelector('.g-sprite-1');
const g_sprite_2 = document.querySelector('.g-sprite-2');


console.log('svg_sprite', svg_sprite);
svg_sprite.setAttribute('width', '600');
svg_sprite.setAttribute('height', '200');
svg_sprite.setAttribute('viewBox', '0 0 600 200');

// g_sprite_1.setAttribute('transform', 'translate(400, 0)');



// Strategy:
//  - We generate the actual .svg file based on the parameters from the Node.js script
//  - Eventually, these parameters will be grabbed from the UI in the electron app
//  - After writing the svg code to the file the program will load the svg as a sprite sheet
//    and then will sweep through the spritesheet to grab each sprite for each fraome in the game loop.
//  - So we cannot set the attributes dynamically like we are here because 
//    we cannot do this for external .svg files.
//  - Holy shit, you don't need to do the transformation math for each coordinate parameter,
//    you simply apply a transformation to th g-element!
//  -So the only thing wel will vary in each sprite in the generated sprite sheet is the
//   x-dim transform and the way we want to animate the sprite.


// - generate the svg in js
const g_sprite_3 = structuredClone(g_sprite_2);
g_sprite_3.classList.remove('g-sprite-2');
g_sprite_3.classList.add('g-sprite-3');
console.log('g_sprite_3: ', g_sprite_3);
