title: 概述
group: 概述
order: 9
ignore: true
---

## Installation

首先将源码下下来
`git clone https://github.com/o2team/haloDoc.git haloDoc`

**安装依赖**
```bsh
cd haloDoc
npm install
git submodule update --init --recursive
```


## Usage
**新建文章**
`hexo new post {% raw %}{{ title }}{% endraw %}`

**生成静态文件**
`hexo g`

**开启服务**
`hexo s`

打开**[http://0.0.0.0:4000](http://0.0.0.0:4000)**看效果


## TAGS

### 警示框

**{% raw %}{% alert error %}{% endraw %}**
这是警示框
**{% raw %}{% endalert %}{% endraw %}**

### 提示框
**{% raw %}{% alert warn %}{% endraw %}**
这是提示框
**{% raw %}{% endalert %}{% endraw %}**


### 信息框
**{% raw %}{% alert info %}{% endraw %}**
这是信息框
**{% raw %}{% endalert %}{% endraw %}**

### codeDemo

{% raw %}
{% demo demo/cardSlider.html Demotitle %}
{% endraw %}

{% alert warn %}
注意: demo文件请放在source/demo/路径下.
{% endalert %}

## Demo

{% alert error %}
这是警示框
{% endalert %}

{% alert warn %}
这是提示框
{% endalert %}

{% alert info %}
这是信息框
{% endalert %}

{% demo api/index.html Demotitle %}
