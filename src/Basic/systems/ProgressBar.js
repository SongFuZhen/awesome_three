const progressContainerStyle = {
  position: "absolute",
  width: "400px",
  height: "16px",
  top: "50%",
  left: "50%",
  marginLeft: "-200px",
  marginTop: "-8px",
  borderRadius: "8px",
  border: "1px solid #009999",
  overflow: "hidden",
};

const progressBarStyle = {
  height: "100%",
  width: "0px",
  background: "#00ffff",
  color: "#00ffff",
  lineHeight: "15px",
};

class ProgressBar {
  constructor(domContainer) {
    this.container = domContainer;
    this.progressContainer = null;
    this.progressBar = null;
  }

  // 挂载
  init() {
    this.progressContainer = this.createProcessContainer();
    this.progressBar = this.createProcessBar();
    this.progressContainer.appendChild(this.progressBar);
    this.container.appendChild(this.progressContainer);
  }

  // 更新进度条
  progress(progress) {
    // 宽度
    const width = this.progressContainer.style.width;

    // 进度条
    this.progressBar.style.width = progress * width + "px"; // 进度条元素长度
    this.progressBar.style.textIndent = progress * width + 5 + "px"; //缩进元素中的首行文本
    this.progressBar.innerHTML = progress * 100 + "%"; //进度百分比
  }

  // 创建外部容器样式
  createProcessContainer() {
    const progressContainer = document.createElement("div");
    progressContainer.id = "progressContainer";
    // 添加样式
    Object.keys(progressContainerStyle).forEach((key) => {
      progressContainer.style[key] = progressContainerStyle[key];
    });

    return progressContainer;
  }

  // 创建内部进度条样式
  createProcessBar() {
    const progressBar = document.createElement("div");
    progressBar.id = "percentageBar";
    // 添加样式
    Object.keys(progressBarStyle).forEach((key) => {
      progressBar.style[key] = progressBarStyle[key];
    });

    return progressBar;
  }
}

export { ProgressBar };