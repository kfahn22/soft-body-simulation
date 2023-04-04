// Steering Behaviors
// Based on Daniel Shiffman Nature Of Code tutorial site
// http://www.shiffman.net/teaching/nature/steering/
// 
// 3D dimension (Z) added plus toxiclib Vec3D class
// 

class Boid {

    constructor(_id, _location, _maxForce, _maxSpeed) {
        this.id = _id;
        this.maxForce = _maxForce;
        this.maxSpeed = _maxSpeed;
        this.location = _location;
        this.velocity = createVector(random(-1.0, 1.0), random(-1.0, 1.0), random(-1.0, 1.0));
        this.acceleration = createVector(0, 0, 0);

        this.r;

        this.wandertheta = 0;

        // setup agent and tails
        // agent(radius, height, horizontal resolution, vertical resolution)
        this.agent = new Agent(100.0, 60.0, 18, 8);
        this.NUM_TAILS = agent.segments;
        this.tails = [];
        this.boids = [];

        for (let i = 0; i < this.NUM_TAILS; i++) {
            tails[i] = new Tail(i + (this.id * this.NUM_TAILS), this.location);
        }



    }

    // Steer
    steer(target, slowdown) {
        let steer = createVector(0,0,0);
        let desired = createVector(target.sub(this.location));
        let d = desired.mag();

        if (d > 0.0) {
            desired.norm();

            if (slowdown && d < 100.0) desired.mult(this.maxSpeed * (d / 100.0));
            else desired.mult(this.maxSpeed);

            steer = desired.sub(this.velocity);
            steer.limit(this.maxForce);
        } else steer = createVector(0.0, 0.0, 0.0);

        return steer;
    }


    // Seek
    seek(target) {
        this.acceleration.add(steer(target, false));
    }


    // Arrive
    arrive(target) {
        this.acceleration.add(steer(target, true));
    }


    // Flee
    flee(target) {
        this.acceleration.sub(steer(target, false));
    }


    // Wander
    wander() {
        let wanderR = 5.0;
        let wanderD = 100.0;
        let change = 0.025;

        this.wandertheta += random(-change, change);

        let circleLocation = createVector(this.velocity);
        circleLocation.norm();
        circleLocation.mult(wanderD);
        circleLocation.add(this.location);

        let circleOffset = createVector(wanderR * cos(this.wandertheta),
            wanderR * sin(this.wandertheta),
            wanderR * tan(this.wandertheta));

        let target = createVector(circleLocation.add(circleOffset));

        seek(target);
    }


    // Separation
    separate() {
        let desiredseparation = 25.0;
        let steer = createVector(0.0, 0.0, 0.0);
        let count = 0;
        // For every boid in the system, check if it's too close
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && (d > 0.0) && (d < desiredseparation)) {
                diff = this.location.sub(other.location);
                diff.norm();
                diff.scale(1.0 / d); // Weight by distance
                steer.add(diff);
                count++; // Keep track of how many
            }
        }
      
        // Average -- divide by how many
        if (count > 0) steer.scale(1.0 / count);


        // As long as the vector is greater than 0
        if (steer.mag() > 0.0) {
            // Implement Reynolds: Steering = Desired - Velocity
            steer.norm();
            steer.mult(this.maxSpeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce);
        }
        return steer;
    }


    // Alignment
    // For every nearby boid in the system, calculate the average velocity
    align() {
        let neighbordist = 50.0;
        let steer = createVector(0.0, 0.0, 0.0);
        let count = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && (d > 0.0) && (d < neighbordist)) {
                steer.add(other.velocity);
                count++;
            }
        }
        if (count > 0) steer.mult(1.0 / count);

        // As long as the vector is greater than 0
        if (steer.mag() > 0.0) {
            // Implement Reynolds: Steering = Desired - Velocity
            steer.norm();
            steer.scale(this.maxSpeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce);
        }
        return steer;
    }


    // Cohesion
    // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
    cohesion() {
        let neighbordist = 50.0;
        let sum = createVector(0.0, 0.0, 0.0); // Start with empty vector to accumulate all locations
        let count = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && (d > 0.0) && (d < neighbordist)) {
                sum.add(other.location); // Add location
                count++;
            }
        }

        if (count > 0) {
            sum.mult(1.0 / count);
            return this.steer(sum, false); // Steer towards the location
        }
        return sum;
    }


    // Flock
    // We accumulate a new acceleration each time based on three rules
    flock() {
        sep = this.separate(); // Separation
        ali = this.align(); // Alignment
        coh = this.cohesion(); // Cohesion
        // Arbitrarily weight these forces
        sep.mult(1.5);
        ali.mult(1.0);
        coh.mult(1.0);
        // Add the force vectors to acceleration
        this.acceleration.add(sep);
        this.acceleration.add(ali);
        this.acceleration.add(coh);
    }


    // Avoid walls
    avoidWall(target) {
        let new_steer = createVector(0, 0, 0);
        let new_location = createVector(this.location);
        new_steer = new_location.subSelf(target);
        new_steer.scale(1.0 / sq(this.location.dist(target)));

        return new_steer;
    }

    checkWalls() {
        let fleeVec = createVector(0, 0, 0);
        let fleeFactor = 1.0;

        fleeVec = createVector(avoidWall(createVector(this.location.x, height + 200.0, this.location.z)));
        fleeVec.mult(fleeFactor);
        this.acceleration.add(fleeVec);

        fleeVec = createVector(avoidWall(createVector(this.location.x, -300.0, this.location.z)));
        fleeVec.mult(fleeFactor);
        this.acceleration.add(fleeVec);

        fleeVec = createVector(avoidWall(createVector(width, this.location.y, this.location.z)));
        fleeVec.mult(fleeFactor);
        this.acceleration.add(fleeVec);

        fleeVec = createVector(avoidWall(createVector(-200.0, this.location.y, this.location.z)));
        fleeVec.mult(fleeFactor);
        this.acceleration.add(fleeVec);

        fleeVec = createVector(avoidWall(createVector(this.location.x, this.location.y, 300.0)));
        fleeVec.mult(fleeFactor);
        this.acceleration.add(fleeVec);

        fleeVec = createVector(avoidWall(createVector(this.location.x, this.location.y, -300.0)));
        fleeVec.mult(fleeFactor);
        this.acceleration.add(fleeVec);
    }


    run(boids) {
        flock(boids);
        update();
        checkWalls();
        display();
    }


    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.location.add(this.velocity);
        this.acceleration.mult(0.0);

        this.agent.update();
    }


    show() {
        noStroke();

        // Rotation vectors
        // use to perform orientation to velocity vector
        let new_dir = createVector(this.velocity);
        new_dir.norm();

        let new_up = createVector(0.0, 1.0, 0.0);
        new_up.norm();

        let new_side = new_dir.cross(new_up);
        new_side.norm();

        let dotP = new_dir.dot(new_up);

        //https://p5js.org/reference/#/p5.Vector/angleBetween
        let angle = new_dir.angleBetween(new_up);

        pushMatrix();
        // update location
        translate(this.location.x, this.location.y, this.location.z);
        // orientation to velocity
        rotate(-angle, new_side.x, new_side.y, new_side.z);
        this.agent.show();
        popMatrix();

        // attach head particle to agent base
        let theta = TWO_PI / this.NUM_TAILS;
        for (let i = 0; i < this.NUM_TAILS; i++) {
            let a = i * theta;
            let x = cos(a) * this.agent.radius;
            let y = this.agent.ha + 5.0;
            let z = sin(a) * this.agent.radius;

            // rotate tail head particles, so they align to the
            // base of the umbrella aperture
            c = createVector(x, y, z);
            c.rotate(new_side, -angle);
            this.tails[i].head.set(this.location.x + c.x, this.location.y + c.y, this.location.z + c.z);

            this.tails[i].show();
        }
    }
}