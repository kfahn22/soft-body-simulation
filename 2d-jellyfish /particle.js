class Particle extends VerletParticle2D {
    constructor(x, y) {
        super(x, y);
        this.r = 4;
        physics.addParticle(this);
    }

    show() {
        fill(255);
        circle(this.x, this.y, this.r * 1);
    }
}