const {
	VerletPhysics2D,
	VerletParticle2D,
	VerletSpring2D
} = toxi.physics2d;

const {
	GravityBehavior
} = toxi.physics2d.behaviors;

const {
	Vec2D,
	Rect
} = toxi.geom;

let physics;
const strokes = [];
let particles = [];
let springs = [];

function setup() {
	createCanvas(640, 360);
	
	physics = new VerletPhysics2D();

	let bounds = new Rect(0, 0, width, height);
	physics.setWorldBounds(bounds);

	for (const stroke of strokes) {
		// Got to have at least two points to connect into a line!
		if (stroke.length < 2) continue
		
		for (const pt of stroke) {
			particles.push(new Particle(pt.x, pt.y))
		}
		console.log(particles)
	}
	
	//   particles.push(new Particle(200, 100));
	//   particles.push(new Particle(400, 100));
	//   particles.push(new Particle(350, 200));
	//   particles.push(new Particle(400, 300));
	//   particles.push(new Particle(200, 300));
	//   particles.push(new Particle(250, 200));

	//springs.push(new Spring(particles[0], particles[1], 0.1));
	// springs.push(new Spring(particles[1], particles[2], 0.1));
	//   springs.push(new Spring(particles[2], particles[3], 0.1));
	//   springs.push(new Spring(particles[3], particles[4], 0.1));
	//   springs.push(new Spring(particles[4], particles[5], 0.1));
	//   springs.push(new Spring(particles[5], particles[0], 0.1));
	//   springs.push(new Spring(particles[5], particles[2], 0.1));
	//   springs.push(new Spring(particles[0], particles[3], 0.1));
	//   springs.push(new Spring(particles[1], particles[4], 0.1));


}

draw = () => {
	background(255);

	physics.update();

	fill(125);
	stroke(0);
	beginShape();
	for (let particle of particles) {
		vertex(particle.x, particle.y);
	}
	endShape(CLOSE);

	  for (let particle of particles) {
	    particle.show();
	  }

	//   for (let spring of springs) {
	//     spring.show();
	//   }

	
	// if (keyIsPressed) {
	// 	particles[0].lock();
	// 	particles[0].x = mouseX;
	// 	particles[0].y = mouseY;
	// 	particles[0].unlock();
	// }
	// if (keyIsPressed) {
	// 	particles[0].lock();
	// 	particles[0].x = mouseX;
	// 	particles[0].y = mouseY;
	// 	particles[0].unlock();
	// }
}

function mousePressed() {
	// Start a new stroke
	const stroke = []

	// Begin at the mouse position
	stroke.push(createVector(mouseX, mouseY))
	strokes.push(stroke)
}

function mouseDragged() {
	// Add a new point to the latest stroke
	const stroke = strokes[strokes.length - 1]

	// Instead of directly adding the mouse coordinate,
	// move from the last point *toward* the mouse, but
	// not quite getting there. This smooths the line
	const targetPt = createVector(mouseX, mouseY)
	const lastPt = stroke[stroke.length - 1]
	// This moves 10% of the way to the mouse. Try other values here
	// for different amounts of smoothing
	stroke.push(lastPt.copy().lerp(targetPt, 0.1))
}