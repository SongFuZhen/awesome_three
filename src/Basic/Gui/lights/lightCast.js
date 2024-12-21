// 添加平行光阴影
const lightShadowGui = (gui, light, cameraHelper) => {
  const lightShadowFolder = gui.addFolder("平行光阴影");
  const cam = light.shadow.camera;

  function updateFunc(v) {
    cam.updateProjectionMatrix(); // 相机更新投影矩阵
    cameraHelper.update(); // 相机范围变化了，相机辅助对象更新
  }

  lightShadowFolder.add(cam, "left", -500, 50).onChange(updateFunc);

  lightShadowFolder.add(cam, "right", 0, 500).onChange(updateFunc);

  lightShadowFolder.add(cam, "top", 0, 500).onChange(updateFunc);

  lightShadowFolder.add(cam, "bottom", -500, 50).onChange(updateFunc);

  lightShadowFolder.add(cam, "far", 0, 1000).onChange(updateFunc);

  lightShadowFolder.add(cam, "near", 0, 1).onChange(updateFunc);

  return lightShadowFolder;
};

export { lightShadowGui };
