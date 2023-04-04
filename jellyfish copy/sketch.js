const {
  VerletPhysics2D,
  VerletParticle2D,
  VerletSpring2D
} = toxi.physics2d;

const {
  GravityBehavior
} = toxi.physics2d.behaviors;

const {
  Vec2D,
  Rect
} = toxi.geom;

let physics;

let particles = [];
let springs = [];
let t1 = [];
let jellyfish;

function preload() {
  img = loadImage("jelly2.jpg");
}

function setup() {
  createCanvas(800, 600);

  physics = new VerletPhysics2D();

  let bounds = new Rect(0, 0, width, height);
  physics.setWorldBounds(bounds);

  //Add a jellyfish to the ocean
  jellyfish = new JellyFish();
  particles = jellyfish.addPoints();
  jellyfish.connectPoints();
  t1 = jellyfish.addTenticles();
  jellyfish.connectTenticlePoints()
  jellyfish.connect();
}

function draw() {
  //background(63, 68, 170);
  background(img);
  console.log(mouseX, mouseY);
  physics.update();

  fill(237, 230, 13, 200);
  stroke(237, 230, 13);

  jellyfish.show();


  if (mouseIsPressed) {
    particles[0].lock();
    t1[0].lock();
    particles[0].x = mouseX;
    particles[0].y = mouseY;
    particles[0].unlock();
    t1[0].unlock();
  }
}