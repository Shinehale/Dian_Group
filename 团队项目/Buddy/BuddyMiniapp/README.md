# BuddyMiniapp

**请仔细阅读本文档以及`/src/docs`内的文档**

## 基本信息
项目名称：BuddyMiniapp
框架：Vue + Uniapp
语言：JS
组件库：Vant
请求工具：axios + uni原生request

## 基本规范
已经在ESLint和Prettier中进行了配置，在进行Git相关操作时不要使用Sourcetree等第三方工具（切分支开分支无所谓），手动add commit push，会自动进行代码规范性的检查，不符合要求不能push。
## 项目相关
### 准备工作
```bash
npm install
npm run lint:init
husky install
```

### 启动项目
已经配置为serve/build自动启动微信小程序
```bash
npm run serve
```
打开微信开发者工具，选择导入dist/dev/mp-weixin文件夹，此时开发者工具会自动识别项目名称。

### 新建组件
```bash
npm run component <name>
```
自动创建新组件。

### 新建页面
```bash
npm run page <name>
```
自动创建新页面，需要在pages.json中配置页面路径。

### 引入Vant组件
按需引入，在`pages.json`内部放引用的组件。
### 打包
```bash
npm run build
```
然后在微信开发者工具中选择发布版本，版本号规则遵循a.b.c基本规则。