import { createCamera } from "./components/camera.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";

import { createControls } from "./systems/controls.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";
import stats from "./systems/Stats.js";
import RemoteModels from "./systems/RemoteModels.js";
import { Road } from "./common/Road.js";
import { axesHelper, gridHelper, cameraHelper, lightHelper, hemiLightHelper, lightCameraHelper } from "./systems/helper.js";
import { CreateFloor } from "./components/floor.js";
import { MathUtils } from "three";
import { GuiHelper } from "./Gui/index.js";

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

    // 添加地板，用于显示投影
    const createFloor = new CreateFloor(50, 50);
    const floor = createFloor.addFloor();
    scene.add(floor);

    // 添加 stats，方便显示性能
    container.append(stats.domElement);
    loop.updatables.push(stats);

    const resizer = new Resizer(container, camera, renderer);

    //#region 添加辅助 gui

    const guiHelper = new GuiHelper();

    // 添加平行光阴影
    guiHelper.addLightShadow(mainLight, lightCameraHelper(mainLight));

    //#endregion

    // 添加辅助组件
    scene.add(
      axesHelper,
      gridHelper,
      // cameraHelper(camera),
      // lightHelper(mainLight),
      // hemiLightHelper(ambientLight)
    );
  }

  // 初始化
  async init() {
    const remoteModels = new RemoteModels(undefined, document.querySelector("#domContainer"));
    await remoteModels.loadModels();

    // 三维向量Vector3创建一组顶点坐标
    const arr = [new THREE.Vector3(25.5, 0.1, 25.5), new THREE.Vector3(-25.5, 0.1, 25.5), new THREE.Vector3(-25.5, 0.1, -25.5), new THREE.Vector3(25.5, 0.1, -25.5)];

    // 三维样条曲线
    const curve = new THREE.CatmullRomCurve3(arr, true, "catmullrom", 0.1);

    // //曲线上获取点
    // const pointsArr = curve.getPoints(1000);
    // const geometry = new THREE.BufferGeometry();
    // //读取坐标数据赋值给几何体顶点
    // geometry.setFromPoints(pointsArr);
    // // 线材质
    // const material = new THREE.LineBasicMaterial({
    //   color: 0x00fffff,
    // });
    // // 线模型
    // const line = new THREE.Line(geometry, material);
    // scene.add(line);

    // 添加 BMW 到场景中
    const bmw = remoteModels.getModels().bmw;
    window.bmw = bmw;
    bmw.position.set(20, 0.1, 23);
    bmw.scale.set(120, 120, 120);

    let progress = 0;
    bmw.tick = (delta) => {
      const velocity = 0.1 * delta;

      if (progress <= 1 - velocity) {
        const point = curve.getPointAt(progress); // 获取样条曲线指定点坐标
        const pointBox = curve.getPointAt(progress + velocity); // 获取样条曲线指定点坐标

        if (point && pointBox) {
          bmw.position.set(point.x, point.y, point.z);

          var targetPos = pointBox; // 目标位置点
          var offsetAngle = -Math.PI / 2; // 标移动时的朝向偏移

          // 以下代码在多段路径时可重复执行
          var mtx = new THREE.Matrix4(); // 创建一个4维矩阵
          mtx.lookAt(bmw.position, targetPos, bmw.up); // 设置朝向
          mtx.multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, offsetAngle, 0)));
          var toRot = new THREE.Quaternion().setFromRotationMatrix(mtx); // 计算出需要进行旋转的四元数值
          bmw.quaternion.slerp(toRot, 0.2);
        }

        progress += velocity;
      } else {
        progress = 0;
      }
    };

    loop.updatables.push(bmw);
    scene.add(bmw);

    // 添加鸟到场景中
    const parrot = remoteModels.getModels().parrot;
    parrot.position.set(-3, 5, -5);
    parrot.scale.set(0.05, 0.05, 0.05);
    parrot.rotation.set(0, -Math.PI / 2, 0);
    loop.updatables.push(parrot); // 让鸟动起来
    scene.add(parrot);

    // 添加 路 到场景中
    const road = remoteModels.getModels().road;
    const road2 = remoteModels.getModels().road2;
    const allRoads = new Road(road, road2);
    allRoads.init();

    const roadGroup = new THREE.Group();
    roadGroup.position.set(-26.5, 0, -16.5);

    for (let i = 0; i < 4; i++) {
      // 绘制 路面  长 12 宽 4
      const dottedRoad = allRoads.getRoadByName("DottedYellowRoadLong").clone();
      dottedRoad.position.set(0, 0.1, i * 11);
      dottedRoad.rotation.set(Math.PI / 2, 0, 0);
      dottedRoad.scale.set(10, 16, 1);
      roadGroup.add(dottedRoad);
    }

    for (let i = 0; i < 4; i++) {
      // 绘制 路面  长 12 宽 4
      const dottedRoad = allRoads.getRoadByName("DottedYellowRoadLong").clone();
      dottedRoad.position.set(53, 0.01, i * 11);
      dottedRoad.rotation.set(Math.PI / 2, 0, 0);
      dottedRoad.scale.set(10, 16, 1);
      roadGroup.add(dottedRoad);
    }

    for (let i = 0; i < 4; i++) {
      // 绘制 路面  长 12 宽 4
      const dottedRoad = allRoads.getRoadByName("DottedYellowRoadLong").clone();
      dottedRoad.position.set(i * 11 + 10, 0.1, -10);
      dottedRoad.scale.set(10, 16, 1);
      dottedRoad.rotation.set(Math.PI / 2, 0, Math.PI / 2);
      roadGroup.add(dottedRoad);
    }

    for (let i = 0; i < 4; i++) {
      // 绘制 路面  长 12 宽 4
      const dottedRoad = allRoads.getRoadByName("DottedYellowRoadLong").clone();
      dottedRoad.position.set(i * 11 + 10, 0.0, 43);
      dottedRoad.scale.set(10, 16, 1);
      dottedRoad.rotation.set(Math.PI / 2, 0, Math.PI / 2);
      roadGroup.add(dottedRoad);
    }

    // 四个角的弯曲路
    const dottedYellowCurveRoad = allRoads.getRoadByName("DottedYellowCurveRoad").clone();
    dottedYellowCurveRoad.position.set(1.05, 1.9, -10);
    dottedYellowCurveRoad.scale.set(10, 10, 10);
    dottedYellowCurveRoad.rotation.set(MathUtils.degToRad(90), 0, MathUtils.degToRad(-90));

    const dottedYellowCurveRoad2 = dottedYellowCurveRoad.clone();
    dottedYellowCurveRoad2.position.set(53, 1.85, -9);
    dottedYellowCurveRoad2.rotation.set(MathUtils.degToRad(90), 0, 0);

    const dottedYellowCurveRoad3 = dottedYellowCurveRoad.clone();
    dottedYellowCurveRoad3.position.set(53, -2.2, 42);
    dottedYellowCurveRoad3.rotation.set(MathUtils.degToRad(-90), 0, MathUtils.degToRad(0));

    const dottedYellowCurveRoad4 = dottedYellowCurveRoad.clone();
    dottedYellowCurveRoad4.position.set(1, -2.2, 43);
    dottedYellowCurveRoad4.rotation.set(MathUtils.degToRad(-90), 0, MathUtils.degToRad(-90));

    window.dottedYellowCurveRoad4 = dottedYellowCurveRoad4;
    roadGroup.add(dottedYellowCurveRoad, dottedYellowCurveRoad2, dottedYellowCurveRoad3, dottedYellowCurveRoad4);

    scene.add(roadGroup);
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
