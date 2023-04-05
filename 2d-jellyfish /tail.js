// Jelly tendrils, build using toxiclibs
// http://toxiclibs.org/
//
// A tail (tendril) is a set os verlet springs
// They all have 20 particles (joints) but they have random length
// so every tail have a different height

class Tail {
  constructor(_id, _initLocation) {
    this.id = _id;
    this.initLocation = _initLocation;
    this.NUM_PARTICLES = 50;

    // Create different size tails
    this.restLength = random(5, 10);

    this.head = null;
    this.nodes = [];
    this.sticks = [];
   
    this.prevParticle = null;

    
  }

  makeTail() {
    for (let i = 0; i < this.NUM_PARTICLES; i++) {
      // create particles
      let location = createVector(this.initLocation.x, this.initLocation.y);
      let particle = new Particle(location.x, location.y);
      //let particle = new Particle(location, random(0.2, 0.6));

      this.nodes[i] = particle;
      if (this.prevParticle != null) {
        let spring = new Spring(this.prevParticle, particle, 0.1);
        
        this.sticks[i - 1] = spring;
      }
      this.prevParticle = particle;
    }

    // get the top particle for evey indepentent tail
    this.head = this.nodes[0];
    this.head.lock();
  }

  show() {
    // draw springs
    strokeWeight(2);
    let scRatio = this.sticks.length * 0.75;

    beginShape(LINES);
    for (let i = 0; i < this.sticks.length; i++) {
      if (i < scRatio) {
        let sc = int((255 / scRatio) * i);
        stroke(255, sc);
      }

      let s = this.sticks[i];
      vertex(s.a.x, s.a.y);
      vertex(s.b.x, s.b.y);
    }
    endShape();

    push();
    stroke(255,0,0)
    circle(this.nodes[3].x, this.nodes[3].y, 10);
    pop();
  }
  
}