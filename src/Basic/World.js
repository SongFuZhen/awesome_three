import { createCamera } from "./components/camera.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";

import { createControls } from "./systems/controls.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";
import stats from "./systems/Stats.js";
import RemoteModels from "./systems/RemoteModels.js";
import {
  axesHelper,
  gridHelper,
  cameraHelper,
  lightHelper,
} from "./systems/helper.js";

// import { loadBirds } from './components/birds/birds.js';

let camera;
let controls;
let renderer;
let scene;
let loop;

class BasicWorld {
  constructor(container) {
    camera = createCamera(container.innerWidth, container.innerHeight);
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    const { ambientLight, mainLight } = createLights();

    loop.updatables.push(controls);
    scene.add(ambientLight, mainLight);

    // 添加 stats，方便显示性能
    container.append(stats.domElement);
    loop.updatables.push(stats);

    const resizer = new Resizer(container, camera, renderer);

    // 添加辅助组件
    scene.add(
      axesHelper,
      gridHelper
      //   cameraHelper(camera),
      //   lightHelper(mainLight)
    );
  }

  // 初始化
  async init() {
    const remoteModels = new RemoteModels(
      undefined,
      document.querySelector("#domContainer")
    );
    await remoteModels.loadModels();

    // 获取模型并添加到场景中
    Object.keys(remoteModels.getModels()).map((d, i) => {
      const model = remoteModels.getModels()[d];
      loop.updatables.push(model);
      model.scale.set(0.1, 0.1, 0.1);
      if (i > 0) {
        model.position.set(i % 2 == 0 ? (i - 1) * 8 : -i * 8, 1, -16);
      }
      scene.add(model);
    });
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { BasicWorld };
