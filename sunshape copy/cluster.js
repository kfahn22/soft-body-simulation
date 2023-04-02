// Sun class adapted from:
// Coding Train / Daniel Shiffman
// http://codingtrain.com
// Circle Morphing

class Sun {
  constructor(_x, _y) {
    this.x = 0;
    this.y = 0;
    this.cirPath = [];
    this.spacing = 36;
    this.r1 = 70;
    this.r2 = 50;
  }

  polarToCartesian(r, angle) {
    return createVector(r * cos(angle), r * sin(angle));
  }

  sunCurve() {
    angleMode(DEGREES);
    let cv;
    // for (let a = 0; a < 360; a += this.spacing) {
    //   if (a % 2 == 0) {
    //     cv = this.polarToCartesian(this.r1, a);
    //   } else {
    //     cv = this.polarToCartesian(this.r2, a);
    //   }
    //   //this.cirPath.push(cv);
    //   this.cirPath.push(new Particle(cv.x, cv.y));
    // }
    this.cirPath.push(new Particle(200, 100));
    this.cirPath.push(new Particle(400, 100));
    this.cirPath.push(new Particle(350, 200));
    this.cirPath.push(new Particle(400, 300));
    this.cirPath.push(new Particle(200, 300));
    this.cirPath.push(new Particle(250, 200));
    console.log(this.cirPath.length);
    // Connect all the nodes with a Spring
    for (let i = 0; i < this.cirPath.length - 1; i++) {
      let particle_i = this.cirPath[i];
      for (let j = i + 1; j < this.cirPath.length; j++) {
        let particle_j = this.cirPath[j];
        // A Spring needs two particles, a resting length, and a strength
        physics.addSpring(new Spring(particle_i, particle_j, 0.01));
      }
    }
  }

  // show() {
  //   stroke(0);
  //   // Show all the nodes
  //   for (let n of this.cirPath) {
  //     n.show();
  //   }
  // }

  // Draw all the internal connections
  showConnections() {
    stroke(0, 150);
    strokeWeight(2);
    for (let i = 0; i < this.cirPath.length - 1; i++) {
      let pi = this.cirPath[i];
      for (let j = i + 1; j < this.cirPath.length; j++) {
        let pj = this.cirPath[j];
        line(pi.x, pi.y, pj.x, pj.y);
      }
    }
  }
  lock()
 { if (mouseIsPressed) {
    cirPath[0].lock();
    cirPath[0].x = mouseX;
    cirPath[0].y = mouseY;
    cirPath[0].unlock();
  }}

  show() {
    stroke(0);
    
    // beginShape();
    // for (let i = 0; i < this.cirPath.length; i++) {
    //   let v = this.cirPath[i];
    //   circle(v.x, v.y, 10);
    // }
    // endShape(CLOSE);
    beginShape();
    for (let particle of this.cirPath) {
      vertex(particle.x, particle.y);
    }  
    endShape(CLOSE);
  }
}