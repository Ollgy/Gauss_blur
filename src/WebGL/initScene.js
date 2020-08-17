import { INIT_POWER, POWER_RATIO } from "../Modules/AppContent/index";

var image;
export const updateImage = (imageBase64) => {
    image = new Image();
    image.src = imageBase64;
    image.onload = function() {
      initShaders(image);
      drawScene();
    };
}

var shaderProgram, sigma;
function initShaders(image) {
  var fragmentShader = getShader(gl, "shader-fr");
  var vertexShader = getShader(gl, "shader-vs");
  
  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }
  
  gl.useProgram(shaderProgram);
  
  initBuffers(image);
  createTexture(image);
 
  var positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
  var texcoordLocation = gl.getAttribLocation(shaderProgram, "a_texCoord");
  var resolutionLocation = gl.getUniformLocation(shaderProgram, "u_resolution");

  setSizeScene();
  clearScene();
  
  gl.enableVertexAttribArray(positionLocation);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var size = 2;          
  var type = gl.FLOAT;   
  var normalize = false; 
  var stride = 0;        
  var offset = 0;        
  gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset);

  gl.enableVertexAttribArray(texcoordLocation);

  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

  gl.vertexAttribPointer(
      texcoordLocation, size, type, normalize, stride, offset);

  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

  sigma = gl.getUniformLocation(shaderProgram, "sigma");
  gl.uniform1f(sigma, INIT_POWER * POWER_RATIO);
}

function getShader(gl, id) {
  var shaderScript, theSource, currentChild, shader;
  
  shaderScript = document.getElementById(id);
  if (!shaderScript) {
    return null;
  }
  
  theSource = "";
  currentChild = shaderScript.firstChild;
  
  while(currentChild) {
    if (currentChild.nodeType == currentChild.TEXT_NODE) {
      theSource += currentChild.textContent;
    }
    
    currentChild = currentChild.nextSibling;
  }

  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
     return null;
  }
  
  gl.shaderSource(shader, theSource);
  
  gl.compileShader(shader);  
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));  
    return null;  
  }
  
  return shader;
}

var positionBuffer, texcoordBuffer;
function initBuffers(image) {
  positionBuffer = gl.createBuffer();
  
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  setRectangle(gl, 0, 0, image.width, image.height);

  texcoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0,
  ]), gl.STATIC_DRAW);
}

var texture;
function createTexture(image) {
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
}

function clearScene() {
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function setSizeScene() {
  webglUtils.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

function drawScene(timestamp) {
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 6;
  gl.drawArrays(primitiveType, offset, count);
}

function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2,
  ]), gl.STATIC_DRAW);
}

export function updateBlur(blurValue) {
  gl.uniform1f(sigma, blurValue || INIT_POWER * POWER_RATIO);
  drawScene();
}