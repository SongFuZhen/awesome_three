const RoadKeys = {
  DottedOldRoad: "Plane", // 单虚线 破旧 公路
  DottedRoad: "Plane001", // 单虚线 公路
  BlackStoneRoad: "Plane002", // 黑色 石头 路面
  StoneRoad: "Plane003", // 石头硬路面
  SolidRoad: "Plane004", // 双实线 双车道公路
  GrassRoad: "Plane005", // 带草的格子路
  SandRoad: "Plane006", // 沙子路
};

// 第二组路
const Road2Keys = {
  DoubleSolidYellowRoad: "Tube_0",
  DottedYellowRoad: "Tube_3_1",
  DottedYellowRoadLong: "Tube_2_2",
  DoubleSolidYellowRoadLong: "Tube_4_3",
  DottedYellowCurveRoad: "Tube_1_4",
  DoubleSolidYellowCurveRoad: "Tube_5_5",
};

class Road {
  constructor(roadModel, road2Model) {
    this.roadModel = roadModel;
    this.road2Model = road2Model;
    this.roads = {};
  }

  init() {
    for (const key in RoadKeys) {
      this.roads[key] = this.roadModel.getObjectByName(RoadKeys[key]).clone();
    }

    for (const key in Road2Keys) {
      this.roads[key] = this.road2Model.getObjectByName(Road2Keys[key]).clone();
    }
  }

  getRoadByName(name) {
    return this.roads[name];
  }
}

export { Road };
