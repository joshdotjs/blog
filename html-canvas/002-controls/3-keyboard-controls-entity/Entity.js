class Entity {

  // --------------------------------------------

  constructor() {
    this.width = canvas.height / 8;
    this.height = this.width;

    this.position = {
      x: canvas.width / 2 - this.width / 2,
      y: 0, // canvas.height / 2 - this.height / 2 ,
    };

    // Added velocity property
    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  // --------------------------------------------

  // Added update method to adjust position and apply gravity
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Gravity
    this.velocity.y += 0.5;
    
    // Check for collision with canvas bottom
    if (this.position.y + this.height > canvas.height) {
      this.position.y = canvas.height - this.height;
      this.velocity.y = 0;
    }
  }

  // --------------------------------------------

  render() {
    ctx.fillStyle = 'darkorange';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  // --------------------------------------------
}

export default Entity;