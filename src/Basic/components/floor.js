// 添加地板
class CreateFloor {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.floors = {};
  }

  // 获取地板
  getFloor(key) {
    return this.floors[key];
  }

  // 添加地板
  addFloor(key, name = "地板") {
    const geometry = new THREE.PlaneGeometry(this.width, this.height, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.5;
    floor.name = name;

    // 接收阴影
    floor.receiveShadow = true;

    // 添加进去
    this.floors[key] = floor;

    return floor;
  }
}

export { CreateFloor };
