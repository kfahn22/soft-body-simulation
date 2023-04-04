class JellyFish {
    constructor() {
        this.particles = [];
        this.springs = [];
        this.t1 = [];
        this.t2 = [];
        this.t3 = [];
        this.t4 = [];
        this.t5 = [];
        this.t6 = [];

    }
    addPoints() {
        this.particles.push(new Particle(238, 327));
        this.particles.push(new Particle(239, 320));
        this.particles.push(new Particle(241, 312));
        this.particles.push(new Particle(246, 304));
        this.particles.push(new Particle(253, 298));
        this.particles.push(new Particle(261, 295));
        this.particles.push(new Particle(270, 292));
        this.particles.push(new Particle(280, 292));
        this.particles.push(new Particle(292, 294));
        this.particles.push(new Particle(298, 297));
        this.particles.push(new Particle(308, 305));
        this.particles.push(new Particle(314, 312));
        this.particles.push(new Particle(316, 321));
        this.particles.push(new Particle(314, 335));
        this.particles.push(new Particle(308, 343));
        this.particles.push(new Particle(298, 344));
        this.particles.push(new Particle(284, 344));
        this.particles.push(new Particle(272, 344));
        this.particles.push(new Particle(258, 340));
        this.particles.push(new Particle(249, 336));
        this.particles.push(new Particle(244, 334));
        return this.particles;
    }

    connectPoints() {
        for (let i = 0; i < this.particles.length - 1; i++) {
            let particle_i = this.particles[i];
            for (let j = i + 1; j < this.particles.length; j++) {
                let particle_j = this.particles[j];
                // A Spring needs two particles, a resting length, and a strength
                this.springs.push(new Spring(particle_i, particle_j, 0.01));
            }
        }
    }

    addTenticles() {
       // this.t1.push(new Particle(314, 335));
       let sp = 5;
       let n = 5;
       let ran = floor(random(-1,1));
       for (let i = 0; i < n; i++)
        {this.t1.push(new Particle(this.particles[13].x + ran, this.particles[13].y + i*sp));}
      return this.t1;
    }

    connectTenticlePoints() {
        for (let i = 0; i < this.t1.length - 1; i++) {
            let particle_i = this.t1.length[i];
            for (let j = i + 1; j < this.t1.length .length; j++) {
                let particle_j = this.t1.length[j];
                // A Spring needs two particles, a resting length, and a strength
                this.springs.push(new Spring(particle_i, particle_j, 0.001));
            }
        }
    }
    connect() {
        this.springs.push(new Spring(this.particles[13], this.t1[1], 0.01));
    //     let a = this.particles[13];
    //     let b = this.t1[1];
    //     let length = dist(a.x, a.y, b.x, b.y);
    //    physics.addSpring.push(new VerletMinDistanceSpring2D(this.particles[13], this.t1[0], length, 0.01));
    }


    show() {
        fill(237, 230, 13, 200);
        stroke(237, 230, 13);
        beginShape();
        for (let particle of this.particles) {
            vertex(particle.x, particle.y);
        }
        endShape(CLOSE);
        beginShape();
        for (let t of this.t1) {
            vertex(t.x, t.y);
        }
        endShape(CLOSE);
    }
}