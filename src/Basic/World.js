import { createCamera } from "./components/camera.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";

import { createControls } from "./systems/controls.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";
import stats from "./systems/Stats.js";
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
      gridHelper,
    //   cameraHelper(camera),
    //   lightHelper(mainLight)
    );
  }

  async init() {
    // const { parrot, flamingo, stork } = await loadBirds();
    // move the target to the center of the front bird
    // controls.target.copy(parrot.position);
    // loop.updatables.push(parrot, flamingo, stork);
    // scene.add(parrot, flamingo, stork);
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
