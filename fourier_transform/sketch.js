// Coding Challenge 130.2: Drawing with Fourier Transform and Epicycles
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/130.2-fourier-transform-drawing.html
// https://youtu.be/n9nfTxp_APM

const USER = 0;
const PHYSICS = 1;
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
// A list of cluster objects
let cluster;

let particles = [];
let springs = [];
let x = [];
let y = [];

let time = 0;
let path = [];
let drawing = [];
let state = -1;

function mousePressed() {
    state = USER;
    drawing = [];
    x = [];
    y = [];
    time = 0;
    path = [];
}

function mouseReleased() {
    state = PHYSICS;
    const skip = 150;
    for (let i = 0; i < drawing.length; i += skip) {
        particles.push(new Particle(drawing[i].x, drawing[i].y));
        
    }
    // for (let i = 0; i < particles.length - 1; i++) {
    //     // let spring = new VerletSpring2D(particles[i], paticles[i+1], skip, 0.01);
    //     // physics.addSprint(spring);
    //     springs.push(new Spring(particles[i], particles[i+1], skip, 0.01))
    // }
    
    //console.log(drawing)

}

function setup() {
    createCanvas(400, 400);

    physics = new VerletPhysics2D();

    let bounds = new Rect(0, 0, width, height);
    physics.setWorldBounds(bounds);
    console.log(particles.length)
   cluster = new Cluster(particles);
}

function draw() {
    background(210,210,210);
    fill(127);
    stroke(0);

    physics.update();
    if (state == USER) {

        let point = createVector(mouseX - width / 2, mouseY - height / 2);
        drawing.push(point);
        stroke(0);
        noFill();
        beginShape();
        for (let v of drawing) {
            vertex(v.x + width / 2, v.y + height / 2);
        }
        endShape();
    } else if (state == PHYSICS) {

        // beginShape();
        // for (let particle of particles) {
        //     vertex(particle.x, particle.y);
        // }
        // endShape(CLOSE);
       cluster.show();

    }
    // if (particles[0] != null)
    // {
    //     if (mouseIsPressed) {
    //         particles[0].lock();
    //         particles[0].x = mouseX;
    //         particles[0].y = mouseY;
    //         particles[0].unlock();
    //     }
    // }
}







// function mousePressed() {
// 	// Start a new stroke
// 	const stroke = []
// 	if (state == USER)
// 	// Begin at the mouse position
// {
//     stroke.push(createVector(mouseX, mouseY))
//     strokes.push(stroke)
// }
// }

// function mouseDragged() {
// 	// Add a new point to the latest stroke
// 	const stroke = strokes[strokes.length - 1]

// 	// Instead of directly adding the mouse coordinate,
// 	// move from the last point *toward* the mouse, but
// 	// not quite getting there. This smooths the line
// 	const targetPt = createVector(mouseX, mouseY)
// 	const lastPt = stroke[stroke.length-1]
// 	// This moves 10% of the way to the mouse. Try other values here
// 	// for different amounts of smoothing
// 	stroke.push(lastPt.copy().lerp(targetPt, 0.1))
// }