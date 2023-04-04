class Target extends Vehicle {
    constructor(x, y) {
      super(x, y);
      this.maxForce = 0.05;
      this.vel = p5.Vector.random2D();
      this.vel.mult(10);
      this.maxSpeed = 4;
      this.wandertheta = 0;
    }
  
    wander() {
      let wanderR = 24;
      let wanderD = 120;
      let change = 0.2;
      this.wandertheta += random(-change, change);
  
      let pos = this.vel.copy();
      pos.normalize();
      pos.mult(wanderD);
      pos.add(this.pos);
  
      let h = this.vel.heading();
  
      let offset = createVector(
        wanderR * cos(this.wandertheta + h),
        wanderR * sin(this.wandertheta + h)
      );
      let target = p5.Vector.add(pos, offset);
      let force = this.seek(target);
      this.applyForce(force);
  
      if (debug) this.drawWanderStuff(this.pos, pos, target, wanderR);
    }
  
    show() {
      stroke(255);
      strokeWeight(2);
      fill("#F063A4");
      push();
      translate(this.pos.x, this.pos.y);
      circle(0, 0, this.r * 2);
      pop();
    }
  
    // A method just to draw the circle associated with wandering
    drawWanderStuff(location, pos, target, rad) {
      stroke(255, 150);
      noFill();
      ellipseMode(CENTER);
      circle(pos.x, pos.y, rad * 2);
      fill(255);
      circle(target.x, target.y, 8);
      line(location.x, location.y, pos.x, pos.y);
      line(pos.x, pos.y, target.x, target.y);
    }
  }
  