import { WebGLRenderer } from "three";

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true });

  renderer.physicallyCorrectLights = true;
  renderer.shadowMap.enabled = true;

  // 模型表面产生条纹影响渲染效果，可以改变.shadowMap.type 默认值优化
  renderer.shadowMap.type = THREE.VSMShadowMap;

  return renderer;
}

export { createRenderer };
