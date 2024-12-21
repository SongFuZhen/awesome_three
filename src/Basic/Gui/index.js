import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import { lightShadowGui } from "./lights/lightCast.js";

class GuiHelper {
  constructor() {
    const gui = new GUI();

    // 改变交互界面style属性
    gui.domElement.style.right = "0px";
    gui.domElement.style.width = "300px";

    this.gui = gui;
  }

  // 添加文件夹
  addFolder(name) {
    return this.gui.addFolder(name);
  }

  // 平行光阴影
  addLightShadow(light, cameraHelper) {
    return lightShadowGui(this, light, cameraHelper);
  }
}

export { GuiHelper };
