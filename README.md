# THREE 项目历程

这个项目会尽可能的记录下 THREE 的学习过程。

没有高大上的效果，没有复杂的代码效果。

能用 原生 JS 的尽量都使用原生代码，争取做到 `跨框架`，有浏览器就可以运行。

## 目录

- [功能](#功能)
- [安装](#安装)
- [部署](#部署)
- [代码结构](#代码结构)
<!--
- [使用方法](#使用方法)
- [贡献](#贡献)
- [许可证](#许可证)
  -->

## 功能

- 入门级别的代码结构组织
- N 个示例
- 结合框架 React，Vue
- FAQ

## 安装

要安装本项目，请按照以下步骤操作：

1. 克隆仓库：
   ```bash
   git clone https://github.com/SongFuZhen/awesome_three
   ```

## 部署

要部署本项目，请按照一下啊步骤操作：

1. 安装 nginx

   参考网上的文章自行安装

2. 配置 nginx.conf

```bash
server {
    listen       20000;
    server_name  awesome_three;

    location / {
        root   /xxx/awesome_three/; // 项目存放位置
        index  index.html index.htm;
    }
}
```

3. 启动 nginx，打开浏览器访问 [http://localhost:20000](http://localhost:20000)

## 代码结构

```markdown
- src // 业务代码
  - src/Basic // 基础代码结构
    - src/Basic/assets // 资源文件
    - src/Basic/components // 组件
    - src/Basic/systems // 场景系统相关
    - src/Basic/World.js // 场景入口文件
  - styles // 样式文件
  - vendor // 第三方库
    - vendor/three // three 库
- .gitignore // git 忽略文件
- icon.png // 图标文件
- index.css // 样式文件
- index.html // 入口文件
- index.js // 入口文件
- nginx.conf // nginx 配置文件
- README.md // 说明文件
```
