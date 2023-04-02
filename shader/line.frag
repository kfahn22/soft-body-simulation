const frag = `
precision highp float;

varying vec2 vTexCoord;
varying vec4 vVertexColor;

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float rand(float n){return fract(sin(n) * 43758.5453123);}

float noise(float p){
  float fl = floor(p);
  float fc = fract(p);
  return mix(rand(fl), rand(fl + 1.0), fc);
}

float noise(vec2 n) {
  const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
  return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

void main() {
	float opacity = 1. - smoothstep(
		vVertexColor.a - 0.3,
		vVertexColor.a,
		noise(vTexCoord * 15.)
	);

  // Tell WebGL what color to make the pixel
  gl_FragColor = vVertexColor * opacity;
}
`