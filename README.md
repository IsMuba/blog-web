<p align="center">
    <img width="200px" src="https://s21.ax1x.com/2024/07/16/pkIr1Bj.jpg" style="border-radius:50%;" />
</p>

<p align="center">
  大家好，我是沐爸。给个 Star 鼓励一下吧！
</p>
</p>

<p align="center">
  <a href="https://gitee.com/ismuba/projects">
    <img height="30px" src="https://s21.ax1x.com/2024/07/16/pkIsWiq.png" />
  </a>
  <a href="https://www.zhihu.com/people/mu-ba-38-69">
    <img height="30px" src="https://s21.ax1x.com/2024/07/16/pkIsUII.jpg" />
  </a>
  <a href="https://blog.csdn.net/m0_37943716">
    <img height="30px" src="https://s21.ax1x.com/2024/07/16/pkIsGse.jpg" />
  </a>
</p>

## 项目介绍

博客管理系统前台，框架采用 Vue2 + Vue-Router + Vuex + View-Design + Axios，功能相对完整。欢迎大家在此基础上进行二次开发，快速打造一个属于自己的博客网站。如果有好的想法或建议，欢迎在 issue 中提出。

## 开源地址

- 博客服务端：[github](https://github.com/ismuba/blog-express.git)、[gitee](https://gitee.com/ismuba/blog-express.git)
- 博客后台：[github](https://github.com/ismuba/blog-admin.git)、[gitee](https://gitee.com/ismuba/blog-admin.git)
- 效果预览：[沐爸的官方网站](http://blog.muba888.cn/#/home)
- 接口地址：[https://doc.apipost.net/docs/detail/2e6803128c64000?target_id=0](https://doc.apipost.net/docs/detail/2e6803128c64000?target_id=0)

## 快速开始

clone 到本地后，安装依赖并运行

```
    # 安装依赖
    npm install

    # 启动项目
    npm run serve

    # 打包项目
    npm run build
```

**提示**：该项目的正常运行依赖于服务端，该项目的正常运行依赖于服务端，请先将博客服务端克隆到本地并启动。

## 功能列表

- 主要模块
  - 首页
  - 项目经历
  - 资讯管理
  - 我的博客
  - 开源项目
  - 关于我
  - 音乐播放
  - 友情链接
- layout布局
- axios封装
- 公共组件自动注册
- 环境变量

## 目录结构

```
    ├── public // 项目主入口
    ├── src
    │   ├── assets // 静态资源
    │   ├── components // 公共组件
    │   ├── layouts // 布局组件
    │   ├── plugins // 插件
    │   ├── router // 路由
    │   ├── store // 状态管理
    │   ├── styles // 公共样式
    │   ├── views // 页面组件
    │   ├── App.vue // 根组件
    │   └── main.js // 入口文件
    ├── .env.development // 开发环境配置
    ├── .env.production // 生产环境配置
    ├── .gitignore // git忽略文件
    ├── .prettierrc.js // prettier配置
    ├── babel.config.js // babel配置
    ├── jsconfig.json // js配置
    ├── package-lock.json // 依赖版本锁定文件
    ├── package.json // 项目依赖
    ├── README.md // 项目说明
    └── vue.config.js // vue配置
```

后续会持续更新，敬请期待。如果对你有所帮助，给个 Star 吧！
