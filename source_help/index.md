title: HaloJS文档使用说明
layout: index
---

## Installation

从git上下载最新代码
```bsh
git clone git@github.com:o2team/halojs.git halojs
cd halojs
npm install
```
接下来, 运行`hexo s -o`即可看到使用文档.

## Usage

### 新建文章
`node internal new post {% raw %}{{ title }}{% endraw %}`
或者
`node external new post {% raw %}{{ title }}{% endraw %}`均可.

### 生成内部版本静态文件
`node internal g`

### 生成外部版本静态文件
`node external g`

### 开启内部版本预览服务
`node internal s [ -p {% raw %}{{ port }}{% endraw %} 指定端口号 | -o 是否立即打开浏览器 ]`

### 开启外部版本预览服务
`node external s [ -p {% raw %}{{ port }}{% endraw %} 指定端口号 | -o 是否立即打开浏览器 ]`

打开**[http://0.0.0.0:4000](http://0.0.0.0:4000)**看效果

> 注意此处有可能存在浏览器缓存的问题, 在浏览器中disable cache即可
