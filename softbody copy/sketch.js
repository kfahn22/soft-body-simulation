const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;

const { GravityBehavior } = toxi.physics2d.behaviors;

const { Vec2D, Rect } = toxi.geom;

let physics;

// let particles = [];
// let springs = [];

let boid;
let head;
let move = false;

function setup() {
  createCanvas(640, 360);

  physics = new VerletPhysics2D();

  let bounds = new Rect(0, 0, width, height);
  physics.setWorldBounds(bounds);

  boid = new Boid(move);
  head = boid.addPoints();
  boid.connectPoints();
}

function draw() {
  background(255);

  physics.update();
  
  boid.show();
  
  if (mouseIsPressed) {
    head.lock();
    head.x = mouseX;
    head.y = mouseY;
    head.unlock();
  }
}


