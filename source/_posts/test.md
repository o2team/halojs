title: test
---

## 功能

卡片式翻页。

> author: leeenx
> version: 1.0.0
> data: 2015-12-07

## Example

```js
$("#wrap").cardSlider({
    direction: 'Y',
    scale: true,
    Offset: 50,
    duration: 300,
    infinite: true,
    onchange: function (o, i) {
        //通过this[0]可以取对应的分页哦
        //o滑出页索引，i滑入页索引
        console.log(o, i);
    }
});
```

## 参数列表

## DEMO
{% demo /demo/cardSlider.html Demotitle %}
