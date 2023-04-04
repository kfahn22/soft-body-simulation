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

let jellyfish;
let wander = true;

function preload() {
  img = loadImage("jelly2.jpg");
}

function setup() {
  createCanvas(500, 500);
  

  physics = new VerletPhysics2D();

  let bounds = new Rect(0, 0, width, height);
  physics.setWorldBounds(bounds);

 //translate(width/2, height/2);
  jellyfish = new JellyFish(wander);
  jellyfish.addPoints();
  jellyfish.connectPoints();

  // Add points for jellyfish
  // particles.push(new Particle(238, 327));
  // particles.push(new Particle(239, 320));
  // particles.push(new Particle(241, 312));
  // particles.push(new Particle(246, 304));
  // particles.push(new Particle(253, 298));
  // particles.push(new Particle(261, 295));
  // particles.push(new Particle(270, 292));
  // particles.push(new Particle(280, 292));
  // particles.push(new Particle(292, 294));
  // particles.push(new Particle(298, 297));
  // particles.push(new Particle(308, 305));
  // particles.push(new Particle(314, 312));
  // particles.push(new Particle(316, 321));
  // particles.push(new Particle(314, 335));
  // particles.push(new Particle(308, 343));
  // particles.push(new Particle(298, 344));
  // particles.push(new Particle(284, 344));
  // particles.push(new Particle(272, 344));
  // particles.push(new Particle(258, 340));
  // particles.push(new Particle(249, 336));
  // particles.push(new Particle(244, 334));


  // Connect all the nodes with a Spring
  // for (let i = 0; i < particles.length - 1; i++) {
  //   let particle_i = particles[i];
  //   for (let j = i + 1; j < particles.length; j++) {
  //     let particle_j = particles[j];
  //     // A Spring needs two particles, a resting length, and a strength
  //     springs.push(new Spring(particle_i, particle_j, 0.01));
  //   }
  // }

}

function draw() {
  background(63, 68, 170);
  // background(148,229,239);
  console.log(mouseX, mouseY);
  physics.update();

  fill(237, 230, 13, 200);
  stroke(237, 230, 13);

  //wanders();

  jellyfish.show();
  //jellyfish.floatAround();


  // beginShape();
  // for (let particle of particles) {
  //   vertex(particle.x, particle.y);
  // }  
  // endShape(CLOSE);

  //   for (let particle of particles) {
  //     particle.show();
  //   }

  //   for (let spring of springs) {
  //     spring.show();
  //   }


}

function keyIsPressed() {
    wander = false;
  // particles[0].lock();
  // particles[0].x = mouseX;
  // particles[0].y = mouseY;
  // particles[0].unlock();
}

function mouseIsReleased() {
  wander = true;
}