## HTML5 template

# Introduction
简单的HTML5开发模板

# 目录结构
```
├── build                             // 构建任务
│   ├── dev.js                        // 开发环境
│   └── tast.js                       // 正式环境
├── config                            // 配置
│   ├── config.js                     // 各个环境的配置文件
│   ├── entrances.js                  // webpack入口文件配置文件
│   └── webpack.config.js             // webpack通用配置文件
├── cutom_plugins                     // 自定义webpack的plugins
├── dist                              // 构建完成后的内容存放目录
├── node_modules                      // npm包
├── src                               // web静态资源加载
│   ├── api                           // API目录
│   ├── assets                        // 静态资源目录
│   │   ├── fonts                     // 字体文件
│   │   ├── modules                   // 通用javascript代码
│   │   ├── styles                    // 通用css样式
│   │   └── templates                 // 通用html模板
│   ├── components                    // 组件
│   ├── constants                     // 常量
│   ├── lib                           // 第三方库
│   ├── router                        // 路由管理
│   ├── store                         // 状态管理
│   ├── views                         // 视图
│   │   ├── index
│   │   │   ├── templates             // 组件html目录
│   │   │   │   └── ···
│   │   │   ├── index.js
│   │   │   ├── index.scss
│   │   │   ├── render.js
│   │   │   └── template.ejs
│   │   └···
│   └── index.js                      // 主入口
├── tests                             // 单元测试
├── utils                             // 工具函数
├── .browserlist                      // 支持浏览器列表
├── .editorconfig                     // editorconfig
├── .eslintignore                     // eslint忽略配置
├── .eslintrc.js                      // eslint配置
├── .gitignore                        // git忽略配置
├── babel.config.js                   // babel配置
├── favicon.ico                       // ico
├── LICENSE                           // 证书
├── package-lock.json
├── package.json
├── postcss.config.js                 // postcss配置
└── README.md
```

