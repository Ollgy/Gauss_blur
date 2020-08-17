export const initWebGL = () => {
  const canvas = document.getElementById("canvas");
  canvas.width = canvas.parentNode.clientWidth;
  canvas.height = canvas.parentNode.clientHeight;
  
  let gl = init(canvas);
  window.gl = gl;
}

function init(canvas) {
  let gl = null;
  
  try {
    let glContextAttributes = { preserveDrawingBuffer: true }; 
    gl = canvas.getContext("webgl", glContextAttributes) || canvas.getContext("experimental-webgl", glContextAttributes);
  }
  catch(e) {}
  
  if (!gl) {
    console.error("Unable to initialize WebGL. Your browser may not support it.");
    gl = null;
  }
  
  return gl;
}