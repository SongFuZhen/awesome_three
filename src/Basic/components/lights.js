import { DirectionalLight, HemisphereLight } from "three";

function createLights() {
  const ambientLight = new HemisphereLight("white", "darkslategrey", 1);
  ambientLight.position.set(0, 20, 0);

  const mainLight = new DirectionalLight("white", 4);
  mainLight.position.set(-20, 20, -20);
  // 平行光设置产生阴影的光源对象,开启光源阴影的计算功能
  mainLight.castShadow = true;

  // mainLight.shadow.intensity = 1;

  // 模糊弱化阴影边缘
  mainLight.shadow.radius = 3;

  // // 如果阴影边缘锯齿感的时候，可以适当提升像素
  // mainLight.shadow.mapSize.set(1024, 1024);

  // mainLight.shadow.camera.top = 10;
  // mainLight.shadow.camera.bottom = -10;
  // mainLight.shadow.camera.left = -10;
  // mainLight.shadow.camera.right = 10;
  // mainLight.shadow.camera.near = 0.1;
  // mainLight.shadow.camera.far = 500;

  return { ambientLight, mainLight };
}

export { createLights };
