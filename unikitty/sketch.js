// Aatish Bhatia 01/14/2016
// Sam Lee (added in textures) 05/27/2020
// Built starting from Dan Shiffman's Nature of Code
// http://natureofcode.com/book/chapter-5-physics-libraries/
// https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js

//***********************************************************
// You can play with the variables in here
let img;
// These set how many particles wide and tall the cloth is:
var cloth_particles_wide = 20;
var cloth_particles_tall = 20;

// These set the width and height of the cloth (in pixels):
var cloth_width = 300;
var cloth_height = 300;

var stiffness = 0.1; //spring stiffness
//***********************************************************


var physics; 
var particles = []; // this will become a 2D array that will store all the particles

var x_spacing = cloth_width/cloth_particles_wide;
var y_spacing = cloth_height/cloth_particles_tall;

var i0 = cloth_particles_wide-1;
var j0 = cloth_particles_tall-1;



function setup() {
  createCanvas(600,600, WEBGL);
  img = loadImage("https://raw.githubusercontent.com/CodingTrain/website/master/CodingChallenges/CC_063_unikitty_flag/Processing/CC_063_unikitty_flag/data/unikitty.jpg");
  // Initialize the physics world
  physics=new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior(new Vec2D(0,0.5)));

  // Set the world's bounding box (particles can't leave this box)
  physics.setWorldBounds(new Rect(0,0,width,height));
  
  // Now we'll create a 2d array of particles called particles[i][j]
  // where i is the column and j is the row of the particle
  // so e.g. particles[0][0] contains the particle in the 1st row & 1st column
  // and particles[5][10] contains the particle in the (5+1)th = 6th column & (10+1)th = 11th row 
  

  // Go through each column of the cloth..
  for(var i = 0; i<cloth_particles_wide; i++){

    // this is how we create a 2D array
    particles[i] = []; 

    // Go through each row of the cloth..
    for(var j = 0; j<cloth_particles_tall; j++){
    
      // This is where we create the particles
      particles[i][j] = new Particle(new Vec2D(width/2-cloth_width/2+i*x_spacing,j*y_spacing));
      // And add the particle to the physics workd
      physics.addParticle(particles[i][j]);

    }
  }

  // Go through each column of the cloth..
  for(var i = 0; i<cloth_particles_wide; i++){

    // Go through each row of the cloth..
    for(var j = 0; j<cloth_particles_tall; j++){

      if(i>0 && j==0){
        // then make a spring connecting this particle (i,j) to the particle to its left (i-1,j)
        physics.addSpring(new VerletSpring2D(particles[i][j],particles[i-1][j],x_spacing,stiffness));
      }

      if((i==0 || i==i0) && j>0){
        // also make a spring connecting this particle (i,j) to the particle above it (i,j-1)
        physics.addSpring(new VerletSpring2D(particles[i][j],particles[i][j-1],y_spacing,stiffness));
      }


      if(i>0 && j>0 && i<i0 && j<j0){
        physics.addSpring(new VerletSpring2D(particles[i][j],particles[i-1][j-1],1.4*y_spacing,stiffness));
        physics.addSpring(new VerletSpring2D(particles[i][j],particles[i+1][j-1],1.4*y_spacing,stiffness));
      }

    }
  }


  // Lock corners in place
  particles[0][0].lock();
  particles[cloth_particles_wide-1][0].lock();

}




function draw() {
  //need to be able to rotate this ish and apply wind
//rotateX(PI/2);
  // Update the physics world
  physics.update();

  background(51);

  // This next bit draws lines between the particles
  stroke(200);
  strokeWeight(2);

  // Again, we iterate through all the particles (columns and rows)
  for(var i = 0; i<cloth_particles_wide; i++){
    for(var j = 0; j<cloth_particles_tall; j++){

      if(i>0 && j==0){
        // then make a spring connecting this particle (i,j) to the particle to its left (i-1,j)
        line(particles[i][j].x,particles[i][j].y,particles[i-1][j].x,particles[i-1][j].y);
      }

      if((i==0 || i==i0) && j>0){
        // also make a spring connecting this particle (i,j) to the particle above it (i,j-1)
        line(particles[i][j].x,particles[i][j].y,particles[i][j-1].x,particles[i][j-1].y);
      }

      if(i>0 && j>0 && i<i0 && j<j0){
        line(particles[i][j].x,particles[i][j].y,particles[i-1][j-1].x,particles[i-1][j-1].y);
        line(particles[i][j].x,particles[i][j].y,particles[i+1][j-1].x,particles[i+1][j-1].y);
      }
    }
  }
  

  // This next part lets you drag the particle closest to the mouse
  // First, if the mouse is pressed, identify the particle closest to the mouse
  if (mouseIsPressed) {
    for(var i = 0; i<cloth_particles_wide; i++){
      for(var j = 0; j<cloth_particles_tall; j++){
        if(abs(particles[i][j].x-mouseX)<x_spacing && abs(particles[i][j].y-mouseY)<y_spacing){
          i0 = i;
          j0 = j;
        }
      }
    }

    // Set this particle's position to be the mouse position
    particles[i0][j0].lock(); 
    particles[i0][j0].x = mouseX;
    particles[i0][j0].y = mouseY;
    particles[i0][j0].unlock(); 

  } 
  translate(-300,-300);
  //Begin my stuff
  textureMode(NORMAL);
  for (var j = 0; j < rows-1; j++) {
    beginShape(TRIANGLE_STRIP);
    texture(img);
    for (var i = 0; i < cols; i++) {
      var x1 = particles[i][j].x;
      var y1 = particles[i][j].y;
      var z1 = particles[i][j].z;
      var u = map(i, 0, cols-1, 0, 1);
      var v1 = map(j, 0, rows-1, 0, 1);
      vertex(x1, y1, z1, u, v1);
      var x2 = particles[i][j+1].x;
      var y2 = particles[i][j+1].y;
      var z2 = particles[i][j+1].z;
      var v2 = map(j+1, 0, rows-1, 0, 1);
      vertex(x2, y2, z2, u, v2);
    }
    endShape();
  }
}
var cols = 20;
var rows = 19;