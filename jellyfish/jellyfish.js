class JellyFish {
    constructor(_wander) {
        this.particles = [];
        this.tenticles = [];
        this.wander = _wander;
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
        //return this.particles();
    }

    connectPoints() {
        for (let i = 0; i < this.particles.length - 1; i++) {
            let particle_i = this.particles[i];
            for (let j = i + 1; j < this.particles.length; j++) {
                let particle_j = this.particles[j];
                // A Spring needs two particles, a resting length, and a strength
                springs.push(new Spring(particle_i, particle_j, 0.01));
            }
        }
    }

    addTenticles() {
        this.tenticles.push()
    }

    show() {
        fill(237, 230, 13, 200);
        stroke(237, 230, 13);
        beginShape();
        for (let particle of this.particles) {
            vertex(particle.x, particle.y);
        }
        endShape(CLOSE);
    }

    // floatAround() {
    //     if (this.wander) {
    //         this.particles[0].lock();
    //         this.particles[0].x = mouseX;
    //         this.particles[0].y = mouseY;
    //     } else {
    //         this.particles[0].unlock();
    //     }

    // }


}