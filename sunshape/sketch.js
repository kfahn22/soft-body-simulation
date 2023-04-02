const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;

const { GravityBehavior } = toxi.physics2d.behaviors;

const { Vec2D, Rect } = toxi.geom;

let physics;

let particles = [];
let springs = [];
let sun;

function setup() {
  createCanvas(600, 600);

  physics = new VerletPhysics2D();

  let bounds = new Rect(0, 0, width, height);
  physics.setWorldBounds(bounds);

  // Add a cluster called sun
  sun = new Sun(width/2, height/2);

}

function draw() {
  background(255);
  fill(238, 232, 44, 125);
  //noStroke();
  physics.update();
  sun.sunCurve();
  sun.show();
  //sun.showConnections();
  
  // if (mouseIsPressed) {
  //   particles[0].lock();
  //   particles[0].x = mouseX;
  //   particles[0].y = mouseY;
  //   particles[0].unlock();
  // }
}


