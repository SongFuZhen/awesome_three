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
    this.Scene = scene; // 将场景暴露出去，方便在其他系统中使用
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
      gridHelper,
      // cameraHelper(camera),
      // lightHelper(mainLight)
    );
  }

  // 初始化
  async init() {
    const remoteModels = new RemoteModels(
      undefined,
      document.querySelector("#domContainer")
    );
    await remoteModels.loadModels();

    // 添加 BMW 到场景中
    const bmw = remoteModels.getModels().bmw;
    bmw.position.set(0, 0.1, 0);
    bmw.scale.set(200, 200, 200);
    scene.add(bmw);

    // 添加鸟到场景中
    const parrot = remoteModels.getModels().parrot;
    parrot.position.set(3, 5, -5);
    parrot.scale.set(0.05, 0.05, 0.05);
    parrot.rotation.set(0, -Math.PI / 2, 0);
    loop.updatables.push(parrot); // 让鸟动起来
    scene.add(parrot);
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
