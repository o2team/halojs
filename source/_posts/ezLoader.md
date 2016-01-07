title: 'ezLoader'
order: 21
---

## 功能

图片懒人加载

> author leeenx
> version 1.0.0
> data: 2015-11-11

## Official Usage

```javascript
$.ezLoader(
    {
        fadeIn: 0,
        preload: document.documentElement.clientHeight,
        zoom: 1
    }
);
```
{% alert warn%}
使用的限制条件是 `&lt;img&gt;` 标签，并且在添加`halo-data-ez`属性，如： `&lt;img halo-data-ez src="..." &gt;`
{% endalert %}

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| fadeIn | boolean | optional | 淡入显示图片。默认为true |
| preload | int | optional | 预加载高度。单位px，默认为当前显示的一屏高度 |
| zoom | int | optional | 当前页面的缩放率。默认为 1 |


## DEMO

{% demo demo/ezLoader.html 点击查看ezLoader %}
