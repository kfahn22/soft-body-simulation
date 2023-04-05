class Boid {
    constructor(_move) {
        this.particles = [];
        this.springs = [];
        this.move = _move;
    }

    addPoints() {
        this.particles.push(new Particle(200, 100));
        this.particles.push(new Particle(400, 100));
        this.particles.push(new Particle(350, 200));
        this.particles.push(new Particle(400, 300));
        this.particles.push(new Particle(200, 300));
        this.particles.push(new Particle(250, 200));
        return this.particles[0];
    }

    // addSprings() {
    //     springs.push(new Spring(particles[0], particles[1], 0.1));
    //     springs.push(new Spring(particles[1], particles[2], 0.1));
    //     springs.push(new Spring(particles[2], particles[3], 0.1));
    //     springs.push(new Spring(particles[3], particles[4], 0.1));
    //     springs.push(new Spring(particles[4], particles[5], 0.1));
    //     springs.push(new Spring(particles[5], particles[0], 0.1));
    //     springs.push(new Spring(particles[5], particles[2], 0.1));
    //     springs.push(new Spring(particles[0], particles[3], 0.1));
    //     springs.push(new Spring(particles[1], particles[4], 0.1));
    // }
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

    show() {
        fill(127);
        stroke(0);
        beginShape();
        for (let particle of this.particles) {
            vertex(particle.x, particle.y);
        }
        endShape(CLOSE);
    }

    if (move) {
        this.particles[0].lock();
        this.particles[0].x = mouseX;
        this.particles[0].y = mouseY;
        this.particles[0].unlock();
    }
}