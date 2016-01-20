title: 'cardSlider'
order: 1
group: 翻页模块
beta: 0
deps:
    - prefix
    - isDom
---

## 功能

卡片式翻页。

> author: leeenx
> version: 1.0.0
> data: 2015-12-07

## Official Usage

```javascript
$("#wrap").cardSlider(
	{
        direction:'Y',
        cover: 0,//首屏索引
        scale:true,
        offset:50,
        duration:300,
        infinite:true,
        onchange:function(o,i){
            //通过this[0]可以取对应的分页哦
            //o滑出页索引，i滑入页索引
            console.log(o,i);
        }
    }
);
```

## Lazy Usage

```javascript
$("#wrap").cardSlider(
	{
        direction:'Y',
        cover: 0,//首屏索引
        scale:true,
        offset:50,
        duration:300,
        infinite:true,
        onchange:function(o,i){
            //通过this[0]可以取对应的分页哦
            //o滑出页索引，i滑入页索引
            console.log(o,i);
        }
    }
);
```
{% alert warn %}
需要注意，#wrap容器下的所有子节点都会被识别为它的子页。具体，看DEMO
{% endalert %}


## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| direction | string | optional | 翻页的方向，默认值为Y。可选值：X,Y|
| cover | int | optional | 首屏的页面索引。默认为：0 |
| scale | boolean | optional | 缩放翻页，默认为true |
| offset | int | optional | 翻页所需的手指位移最少偏移量。默认 50，单位px |
| duration | int | optional | 翻页动画持续时长。默认 300，默认毫秒 |
| infinite | boolean | optional | 无限循环。默认 true |
| onchange | function | optional | 翻页事件监听 |



## 方法列表

| name | 描述 |
| :----: | :---- |
| lock | 锁定页面。锁定后不能翻页 |
| unlock | 解锁页面，与lock相对应 |
| move | 将页面定位到指定的索引值。cardSlider.move(index); |



## DEMO

{% demo demo/cardSlider.html 点击查看cardSlider %}

<!--## 模块下载

[直接下载cardSlider](#)
线上地址： <input type="text" value="#" /> <input type="button" value="复制" />-->
