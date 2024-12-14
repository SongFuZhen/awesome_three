//引入性能监视器stats.js
import Stats from "three/addons/libs/stats.module.js";

//创建stats对象
const stats = new Stats();

// 添加 tick 更新函数
stats.tick = stats.update

export default stats;
