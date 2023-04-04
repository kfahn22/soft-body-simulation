// https://github.com/nardove/p5Jellies


// 3D STEERING BEHAVIORS
// by Ricardo Sanchez, Feb 2010
//
// You are free to use this code, but if you do it will be nice to let me know.
//
// Note: toxiclibs use in this build is the feb 2010 previous version.
//

const {
  VerletPhysics3D 
} = toxi.physics3d;

// const {
//   VerletPhysics3D,
//   VerletParticle3D,
//   VerletSpring3D
// } = toxi.physics3d;

const {
  GravityBehavior
} = toxi.physics3d.behaviors;

const {
  Vec3D,
  Rect
} = toxi.geom;

let physics;

let particles = [];
let springs = [];


let NUM_BOIDS = 2;
let boids = [];
// PImage skin, reef;

// PImage frame;

// load images
function preload() {
  //skin = loadImage("jelly_texture.png");
  //reef = loadImage("reef.jpg");
  //reef = loadImage("deepsea.jpg");}
}

function setup() {
  createCanvas(640, 780, WEBGL);

  //frameRate(30.0);

  physics = new VerletPhysics3D();

  let bounds = new Rect(0, 0, width, height);
  physics.setWorldBounds(bounds);

  //physics = new VerletPhysics(Vec3D.Y_AXIS.scale(0.025), 5, 0.05, 0.8);
  //physics.addBehavior( new GravityBehavior( Vec3D.Y_AXIS.scale( 0.025 ) ) );



  // create jellies
  for (let i = 0; i < NUM_BOIDS; i++) {
    let location = createVector(width * 0.5, height * 0.65, -100.0);
    let maxSpeed = random(0.5, 1.5);
    let maxForce = random(0.1, 0.3);

    boids.push(new Boid(i, location, maxSpeed, maxForce));
  }

  //background(0);
}


function draw() {
  background(0);
  //noStroke(); fill(0); rect(0, 0, width, height);


  // render background image
  //image(reef, 0, 0);

  //directionalLight(20, 20, 200, 0, 1, -1);
  //ambientLight(50, 70, 252);

  physics.update();


  // render jellies
  for (let i = 0; i < NUM_BOIDS; i++) {
   // let b = (Boid) boids.get(i);
    boids.run(boids[i]);
  }
}