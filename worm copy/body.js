class Octo {
    constructor(_numSegments, _segmentSize, _location) {
        this.numSegments = _numSegments;
        this.segmentSize = _segmentSize;
        this.springs = [];
        this.particles = [];
        this.vertices = [];
        this.reverseVertices = [];

        this.isDead = false;
        this.time = millis();
        this.wait = 4000;
        this.tick = false;

        this.location = new Vec2D(200, 200);
        this.velocity = new Vec2D(0, 0);

        this.springStrength = 0.05;

        this.acceleration = new Vec2D(0, 0);
        this.maxspeed = 0.5;
        this.maxforce = 0.01;
        this.wandertheta = 0;
        this.targetLocation = this.location.copy();

        this.bodySize = 10;

        this.init(_location, "left");
        this.leg = new Leg(8, 10, 200, 200);
    }


    init(_location, _direction) {
        for (let i = 0; i < this.numSegments; i++) {
            let particleWeight = 1; // + (i * 0.3);
            let particlePosition = new Vec2D(_location.x, _location.y);
            switch (_direction) {
                case "right":
                    particlePosition.set(_location.x + (i * this.segmentSize), _location.y);
                    break;
                case "left":
                    particlePosition.set(_location.x - (i * this.segmentSize), _location.y);
                    break;
                case "top":
                    particlePosition.set(_location.x, _location.y + (i * this.segmentSize));
                    break;
                case "bottom":
                    particlePosition.set(_location.x, _location.y - (i * this.segmentSize));
                    break;
            }

            let particle = new VerletParticle2D(particlePosition, particleWeight);
            this.particles[i] = particle;
            physics.addParticle(particle);
            // physics.addBehavior(new AttractionBehavior(particle, this.segmentSize, -0.1, 0));

            if (i != 0) {
                let particleA = this.particles[i - 1];
                let particleB = this.particles[i];
                let spring = new VerletSpring2D(particleA, particleB, this.segmentSize, this.springStrength);
                this.springs.push(spring);
                physics.addSpring(spring);
            }
        }

        for (let i = 0; i < (this.numSegments * 2) + 1; i++) {
        	let v = {x: 0, y: 0};
            this.vertices.push(v);
        }

        for (let i = 0; i < this.numSegments; i++) {
        	let v = {x: 0, y: 0};
    	   this.reverseVertices.push(v);
        }

        this.particles[0].lock();
    }


    kill() {
        this.vertices = [];
        this.reverseVertices = [];
        for (let p of this.particles) {
            physics.removeParticle(p);
        }
        for (let s of this.springs) {
            physics.removeSpring(s);
        }
        this.particles.length = 0;
        this.springs.length = 0;
    }


    render() {
        for (let [i, p] of this.particles.entries()) {
        	// p -> this.particles[i]

            let dx = 0;
            let dy = 0;
            let v1 = new Vec2D(0, 0);
            let v2 = new Vec2D(0, 0);

            if (i == 0) {
                dx = this.particles[1].x - this.particles[0].x;
                dy = this.particles[1].y - this.particles[0].y;

                v1.set(this.particles[0].x, this.particles[0].y);
                v2.set(this.particles[1].x, this.particles[1].y);
            } else {
                dx = this.particles[i].x - this.particles[i - 1].x;
                dy = this.particles[i].y - this.particles[i - 1].y;

                v1.set(this.particles[i - 1].x, this.particles[i - 1].y);
                v2.set(this.particles[i].x, this.particles[i].y);
            }

            let dist = v1.sub(v2).mag();
            let thickness = this.segmentSize * (1 / norm(dist, 0, this.segmentSize));

            let n = i / (this.particles.length - 1);
            let b = bezierPoint(0.25, 1.5, 1.5, 0.2, n);
            //let b = bezierPoint(0.20, 0.8, 0.2, 0.2, n);

            //let angle = 45;
            let angle = -atan2(dy, dx);

            // let x1 = this.particles[i].x + sin(angle) * this.segmentSize;
            // let y1 = this.particles[i].y + cos(angle) * this.segmentSize;
            // let x2 = this.particles[i].x + sin(angle) * this.segmentSize;
            // let y2 = this.particles[i].y + cos(angle) * this.segmentSize;

            let x1 = this.particles[i].x + sin(angle) * thickness * b;
            let y1 = this.particles[i].y +  thickness * b;
            let x2 = this.particles[i].x + sin(angle) * -thickness * b;
            let y2 = this.particles[i].y +  -thickness * b;

            this.vertices[i].x = x1;
            this.vertices[i].y = y1;
            this.reverseVertices[i].x = x2;
            this.reverseVertices[i].y = y2;
        }

        let numVertices = this.vertices.length - 1;
        reverse(this.reverseVertices);
        for (let i = 0; i < this.numSegments; i++) {
        	this.vertices[i + this.numSegments] = this.reverseVertices[i];
        }
        this.vertices[numVertices] = this.vertices[0];

        fill('#212121');
        strokeWeight(2);
        stroke('#B2B2B2');
        // noStroke();
        beginShape();
        curveVertex(this.vertices[numVertices].x, this.vertices[numVertices].y);
        for (let i = 0; i <= numVertices; i++) {
        	let v = this.vertices[i];
            curveVertex(v.x, v.y);
            // ellipse(v.x, v.y, 50, 50);
        }
        curveVertex(this.vertices[1].x, this.vertices[1].y);
        endShape();

        if (false) {
        	noFill();
	        stroke('#FF5252');
	        beginShape();
	        for (let p of this.particles) {
	            vertex(p.x, p.y);
	        }
	        endShape();

	        stroke('#FFACAC');
	        for (let p of this.particles) {
	            ellipse(p.x, p.y, 5);
	        }
    	}
    }


    arrive(target) {
        let desired = new Vec2D(target.x - this.location.x, target.y - this.location.y);
        let d = desired.magnitude();
        desired.normalize();
        if (d < 100) {
            let m = map(d, 0, 100, 0, this.maxspeed);
            desired.scaleSelf(m);
        } else {
            desired.scaleSelf(this.maxspeed);
        }
        let steer = new Vec2D(desired.x - this.velocity.x, desired.y - this.velocity.y);
        steer.limit(this.maxforce);
        this.acceleration.addSelf(steer);
    }


    update() {
        if (millis() - this.time >= this.wait) {
            this.tick = !this.tick;
            this.time = millis();

            let wanderR = 30;
            let wanderD = 20;
            let change = 0.75;

            this.wandertheta += random(-change, change);

            let circleLocation = this.velocity.copy();
            circleLocation.normalize();
            circleLocation.scaleSelf(wanderD);
            circleLocation.addSelf(this.location);

            let circleOffset = new Vec2D(wanderR * cos(this.wandertheta), wanderR * sin(this.wandertheta));
            this.targetLocation = circleLocation.addSelf(circleOffset).copy();
        }

        this.arrive(this.targetLocation);

        this.velocity.addSelf(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.location.addSelf(this.velocity);
        this.acceleration.scaleSelf(0);

        this.particles[0].set(this.location.x, this.location.y);

        this.checkBounds();
    }


    checkBounds() {
        let offset = this.segmentSize * this.numSegments + this.numSegments;
        if (this.location.x > width + offset) {
            console.log("outside right");
            this.location.x = -10;
            this.targetLocation = this.location.copy();
            this.velocity.scaleSelf(0);
            this.isDead = true;
            this.kill();
            this.init(this.location, "left");
        }
        if (this.location.x < -offset) {
            console.log("outside left");
            this.location.x = width + 10;
            this.targetLocation = this.location.copy();
            this.velocity.scaleSelf(0);
            this.isDead = true;
            this.kill();
            this.init(this.location, "right");
        }
        if (this.location.y > height + offset) {
            console.log("outside bottom");
            this.location.y = -10;
            this.targetLocation = this.location.copy();
            this.velocity.scaleSelf(0);
            this.isDead = true;
            this.kill();
            this.init(this.location, "bottom");
        }
        if (this.location.y < -offset) {
            console.log("outside top");
            this.location.y = height + 10;
            this.targetLocation = this.location.copy();
            this.velocity.scaleSelf(0);
            this.isDead = true;
            this.kill();
            this.init(this.location, "top");
        }
        this.isDead = false;
    }

    
      // This functons connects one cluster to another
      // Each point of one cluster connects to each point of the other cluster
      // The connection is a "VerletMinDistanceSpring"
      // A VerletMinDistanceSpring is a spring which only enforces its rest length if the
      // current distance is less than its rest length. This is handy if you just want to
      // ensure objects are at least a certain distance from each other, but don't
      // care if it's bigger than the enforced minimum.
      

}