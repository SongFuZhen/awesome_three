// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(50);

// GridHelper：网格线
const gridHelper = new THREE.GridHelper(50, 50);

// CameraHelper：辅助观察相机
const cameraHelper = (camera) => new THREE.CameraHelper(camera);

// 平行光辅助
const lightHelper = (light) => new THREE.DirectionalLightHelper(light, 5);

export { axesHelper, gridHelper, cameraHelper, lightHelper };
