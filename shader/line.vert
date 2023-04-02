const vert = `
precision highp float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 vTexCoord;
varying vec4 vVertexColor;

uniform float time;

void main() {
		vec3 position = aPosition + vec3(
			10. * sin(aTexCoord.y * 0.1 + time * 0.005),
			10. * sin(aTexCoord.y * 0.1 + time * 0.005 + 0.2),
			0.
		);

    // Apply the camera transform
    vec4 viewModelPosition =
      uModelViewMatrix *
      vec4(position, 1.0);

    // Tell WebGL where the vertex goes
    gl_Position =
      uProjectionMatrix *
      viewModelPosition;  

    // Pass along data to the fragment shader
    vTexCoord = aTexCoord;
    vVertexColor = aVertexColor;
}
`