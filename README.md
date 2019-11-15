## Ticket Vue 2.0

# Introduction
该项目为侠侣联盟前端项目仓库。前后端代码和仓库使用分离开发模式，前后端对接使用API交互。

# 目录结构
├── build                   // help
│   ├── build.js
│   ├── dev.json                      // 开发环境
│   ├── experiment.json               // 实验
│   ├── index.js                      // 配置控制
│   ├── local.json                    // 本地
│   ├── production.json               // 生产环境
│   └── test.json                     // 测试环境
├── config                            // 配置
│   ├── index.js
│   ├── webpack.base.config.js                // 开发环境
│   ├── experiment.json         // 实验
│   ├── index.js                // 配置控制
│   ├── local.json              // 本地
│   ├── production.json         // 生产环境
│   └── test.json               // 测试环境
├── dist
├── node_modules
├── src                      // web静态资源加载
│   ├── api
│   ├── assets                // 开发环境
│   ├── components         // 实验
│   ├── constants                // 配置控制
│   ├── lib              // 本地
│   ├── router         // 生产环境
│   ├── store         // 生产环境
│   ├── router         // 生产环境
│   ├── views
│   │   ├── about
│   │   ├···
│   │   └── index.js         // 提供给前端的配置
│   └── index.js
├── test
├── utils
├── babel.config.js
├── .editorconfig
├── .eslintrc
├── .eslintignore           // 启动日志配置
├── package.json
├── package-lock.json
├── app-service.js              // 启动应用配置
├── test
├── postcss.config.js
└── README.md
