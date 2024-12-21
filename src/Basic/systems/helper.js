// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(50);

// GridHelper：网格线
const gridHelper = new THREE.GridHelper(50, 50);

// CameraHelper：辅助观察相机
const cameraHelper = (camera) => new THREE.CameraHelper(camera);

// 平行光辅助
const lightHelper = (light) => new THREE.DirectionalLightHelper(light, 5);

// 环境光辅助
const hemiLightHelper = (light) => new THREE.HemisphereLightHelper(light, 5);

// 平行光阴影辅助
const lightCameraHelper = (light) => new THREE.CameraHelper(light.shadow.camera);

export { axesHelper, gridHelper, cameraHelper, lightHelper, hemiLightHelper, lightCameraHelper };
