## Installation

首先将源码下下来
`git clone git@github.com:Littly/haloDoc.git haloDoc`

安装依赖
```bash
cd haloDoc
npm install
git submodule update --init --recursive
```

## Usage
新建文章
`hexo new doc {{ title }}`

生成静态文件
`hexo g`

开启服务
`hexo s`

打开[http://0.0.0.0:4000](http://0.0.0.0:4000)看效果