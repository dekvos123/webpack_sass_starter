# webpack_sass_starter

### Features
* webpack3
* babel preset, 使用es6语法
* 自启动，热加载刷新
* 分别优化了HTML, CSS, JavaScript
* 使用SASS预编译器

### Setup
1. 克隆项目
```bash
git clone git@github.com:greyu/webpack_sass_starter.git
cd webpack_sass_starter
```
2. 使用yarn，配置 淘宝源 或者 使用yrm
```bash
npm install -g yarn
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```
or
```bash
npm install -g yrm
yrm use taobao
```
3. 安装环境
```bash
yarn
```
***如果你是windows用户，你可能在安装sass的时候会报gyp错误，你可以按下面操作试试***
```bash
npm install -g node-gyp 
npm install --global --production windows-build-tools
```
4. 启动
```bash
yarn run dev
```
5. 服务器监听在4000端口

### Build
1. 克隆项目
```bash
git clone git@github.com:greyu/webpack_sass_starter.git
cd webpack_sass_starter
```
2. 使用yarn，配置 淘宝源 或者 使用yrm
```bash
npm install -g yarn
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```
or
```bash
npm install -g yrm
yrm use taobao
```
3. 安装环境
```bash
yarn
```
4. Build
```bash
yarn run build
```