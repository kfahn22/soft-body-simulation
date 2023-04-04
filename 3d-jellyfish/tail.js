// Jelly tendrils, build using toxiclibs
// http://toxiclibs.org/
//
// A tail (tendril) is a set os verlet springs
// They all have 20 particles (joints) but they have random length
// so every tail have a different height

class Tail {
  constructor(_id, _initLocation) {
    this.id = _id;
    this.initLocation = createVector(0, 0, 0);
    this.NUM_PARTICLES = 24;

    // Create different size tails
    this.restLength = random(10, 20);

    this.head;

    this.nodes = [];
    this.sticks = [];

    this.prevParticle = null;

    for (let i = 0; i < this.NUM_PARTICLES; i++) {
      // create particles
      let location = createVector(this._initLocation.x, this._initLocation.y, this._initLocation.z);
      let particle = new Particle(location, random(0.2, 0.6));

      this.nodes[i] = particle;
      if (this.prevParticle != null) {
        let spring = new Spring(this.prevParticle, particle, this.restLength, 0.5);
        
        this.sticks[i - 1] = spring;
      }
      this.prevParticle = particle;
    }

    // get the top particle for evey indepentent tail
    head = physics.particles.get(id * NUM_PARTICLES);
    head.lock();
  }


  show() {
    // draw springs
    //noFill();

    let scRatio = this.sticks.length * 0.75;

    beginShape(LINES);
    for (let i = 0; i < sticks.length; i++) {
      if (i < scRatio) {
        let sc = int((127 / scRatio) * i);
        stroke(255, sc);
      }
      //stroke(255);

      let s = sticks[i];
      vertex(s.a.x, s.a.y, s.a.z);
      vertex(s.b.x, s.b.y, s.b.z);
    }
    endShape();
  }

}