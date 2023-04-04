let gui;
let physics, worm2;
const {
	VerletPhysics2D,
	VerletParticle2D,
	VerletSpring2D,
	VerletMinDistanceSpring2D,
} = toxi.physics2d;

const {
	GravityBehavior
} = toxi.physics2d.behaviors;

const {
	Vec2D,
	Rect
} = toxi.geom;


let particles = [];
let springs = [];
let segSize = 20; // 25
let num = 16;
let tentacles = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);

	physics = new VerletPhysics2D();
	physics.addBehavior(new GravityBehavior(new Vec2D(0, 0)));
	// physics.setWorldBounds(new Rect(0, 0, width, height));
	physics.setDrag(0.5);
	// physics.setTimeStep(2);

	tentacles.push(new Leg(16, 20, new Vec2D(200, 200)));
	tentacles.push(new Leg(3, 75, new Vec2D(200, 210)));
	initGui();
}


function initGui() {
	gui = new dat.GUI();
	for (let i = 0; i < 2; i++) {
	gui.add(physics, "drag").min(0.1).max(0.2).step(0.05);
	gui.add(tentacles[i], "wait").min(1000).max(5000).step(500);
	gui.add(tentacles[i], "maxspeed");
	gui.add(tentacles[i], "maxforce");
	gui.add(tentacles[i], "springStrength").min(0.0001).max(0.001).step(0.0005);
	gui.close();
	}
}


function draw() {
	background('#414141');

	physics.update();
	for (let i = 0; i < 2; i++) {
		if (tentacles[i].isDead == false) {
			tentacles[i].update();
			tentacles[i].render();
			tentacles[0].connect(tentacles[1]);
		}
	}
}


window.onresize = function () {
	resizeCanvas(window.innerWidth, window.innerHeight);
}