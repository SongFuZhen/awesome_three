import { AnimationMixer } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ProgressBar } from "./ProgressBar.js";

// 创建GLTF加载器对象
const loader = new GLTFLoader();

// 模型的 key
const modelKeys = {
  parrot: "Parrot",
  Flamingo: "Flamingo",
  Stork: "Stork",
};

// 加载远程模型
class RemoteModels {
  constructor(url, domContainer) {
    this.models = {};
    this.url = url || "/assets/models/"; // 模型的路径地址

    this.progressBar = new ProgressBar(domContainer);
    this.progressBar.init();
  }

  // 加载所有模型
  async loadModels() {
    const keyArr = Object.keys(modelKeys);

    const onProgress = (xhr) => {
      const { loaded, total } = xhr;

      // 添加进度条到页面上, 计算进度百分比
      const progress = Math.ceil(loaded / total);
      this.progressBar.progress(progress);
    };

    for (let index = 0; index < keyArr.length; index++) {
      const modelUrl = this.url + keyArr[index] + ".glb";
      const gltfModel = await loader.loadAsync(modelUrl, onProgress);

      // 结束加载时，隐藏进度条
      document.getElementById("progressContainer").style.display = "none";

      this.models[keyArr[index]] = this.setupModel(gltfModel);
    }
  }

  // 解析模型，添加动画
  setupModel(data) {
    const model = data.scene;

    // 添加动画
    const clip = data.animations[0];
    const mixer = new AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.play();

    model.tick = (delta) => mixer.update(delta);

    return model;
  }

  // 获取模型
  getModels() {
    return this.models;
  }

  // 通过 Key 获取单个模型
  getModel(key) {
    return this.models[key];
  }
}

export default RemoteModels;
