const strokes = []

function setup() {
	createCanvas(windowWidth, windowHeight)
}

function mousePressed() {
	// Start a new stroke
	const stroke = []
	
	// Begin at the mouse position with an initial thickness
	stroke.push({
		pt: createVector(mouseX, mouseY),
		thickness: 4
	})
	strokes.push(stroke)
}

function mouseDragged() {
	angleMode(RADIANS)
	
	// Add a new point to the latest stroke
	const stroke = strokes[strokes.length - 1]
	
	// Instead of directly adding the mouse coordinate,
	// move from the last point *toward* the mouse, but
	// not quite getting there. This smooths the line
	const targetPt = createVector(mouseX, mouseY)
	const lastPt = stroke[stroke.length-1].pt
	stroke.push({
		// This moves 10% of the way to the mouse. Try other values here
		// for different amounts of smoothing
		pt: lastPt.copy().lerp(targetPt, 0.1),
		
		// Some arbitrary thickness
		thickness: 10 + 8 * sin(stroke.length)
	})
}

function draw() {
	background(255)
	fill(0)
	noStroke()
	
	angleMode(DEGREES)
	
	// Loop over all strokes
	for (const stroke of strokes) {
		// Got to have at least two points to connect into a line!
		if (stroke.length < 2) continue
		
		// Calculate the direction to expand each stroke in
		const tangents = []
		for (let i = 1; i < stroke.length; i++) {
			const prev = stroke[i-1]
			const next = stroke[i]
			tangents.push(next.pt.copy().sub(prev.pt).normalize())
		}
		
		// We want a direction for each stroke but we have strokes.length-1
		// *differences* between strokes, so we just duplicate the last one
		tangents.push(tangents[tangents.length-1].copy())
		
		// Rotate the tangent directions to point directly out
		const normals = tangents.map((tangent) => tangent.copy().rotate(90))
		
		// Draw the outline of the shape
		beginShape(TRIANGLE_STRIP)
		for (const [i, { pt, thickness }] of stroke.entries()) {
			const n = normals[i]
			
			// Loop over inside and outside of the curve
			for (const side of [-1, 1]) {
				vertex(
					pt.x + side * n.x * thickness / 2,
					pt.y + side * n.y * thickness / 2
				)
			}
		}
		endShape()
	}
}