import { PerspectiveCamera } from "three";

function createCamera(width = 800, height = 800) {
  const camera = new PerspectiveCamera(
    45, // fov = Field Of View
    width / height, // aspect ratio (dummy value)
    0.1, // near clipping plane
    1000 // far clipping plane
  );

  // move the camera back so we can view the scene
  camera.position.set(30, 30, 30);

  camera.lookAt(0,0,0);

  return camera;
}

export { createCamera };
