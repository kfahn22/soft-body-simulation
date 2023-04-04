// Jelly umbrella main body
// draws a hemisphere

//   textureMode(NORMALIZED);

class Agent {
  constructor(_radius, _height, _numSegments, _steps) {
    this.radius = _radius; // 300
    this.ha = -_height; // 200
    this.radius_ini = this.radius;
    this.ha_ini = this.ha;
    this.x = 0;
    this.y = 0;
    this.fpsSpeed = 0;

    // controls expand/contract motion speed
    this.fpsSpeedFactor = random(18.0, 20.0);

    this.segments = _numSegments;
    this.steps = _steps;

    this.isVertexNormalActive = false;
    this.drawAxis = false;
  }

  update() {
    // expand / contract motion
    // using sin & cos waves
    this.fpsSpeed = frameCount / this.fpsSpeedFactor;
    this.radius = (this.radius_ini * 0.5) + (1.0 + sin(this.fpsSpeed)) * (this.radius_ini * 0.2);
    this.ha = (this.ha_ini * 0.9) + (1.0 + cos(this.fpsSpeed)) * (this.ha_ini * 0.1);
  }



  show() {
    stroke(255);
    //noFill();

    // builds hemisphere, using bezier points
    for (let i = 0; i < this.segments; i++) {
      beginShape(TRIANGLE_STRIP);
      //texture(skin);
      for (let j = 0; j < this.steps + 1; j++) {
        let t = j / this.steps;
        let theta = TWO_PI / this.segments;
        let a = i * theta;

        // bezier control points
        let cp1 = 1.0 + cos(this.fpsSpeed) * 0.3;
        let cp2 = 1.0 + cos(this.fpsSpeed) * 0.2;

        // UV texture map coordinates
        let u = i / this.segments;
        let bu = (i + 1) / this.segments;


        this.x = cos(a) * this.radius;
        this.y = sin(a) * this.radius;
        
        let vx = bezierPoint(0.0, this.x * cp1, this.x * cp2, this.x, t);
        let vy = bezierPoint(0.0, this.y * cp1, this.y * cp2, this.y, t);
        let v = createVector(vx, vy);
        if (this.isVertexNormalActive)  {norm(v);}
        vertex(v.x, v.y, u, t);

        this.x = cos(a + theta) * this.radius;
        this.y = sin(a + theta) * this.radius;
        vx = bezierPoint(0.0, this.x * cp1, this.x * cp2, this.x, t);
        vy = bezierPoint(0.0, this.y * cp1, this.y * cp2, this.y, t);
        v = createVector(vx, vy);
        if (this.isVertexNormalActive) norm(v);
        vertex(v.x, v.y, bu, t);
      }
      endShape();
    }

    // Draws XYZ axis for reference only
    if (this.drawAxis) {
      let axisRadius = 60.0;
      stroke(255, 0, 0);
      line(0.0, 0.0, axisRadius, 0.0);
      stroke(0, 255, 0);
      line(0.0, 0.0, 0.0, axisRadius);
      stroke(0, 0, 255);
      line(0.0, 0.0, 0.0, 0.0, 0.0, axisRadius);
    }
  }

}