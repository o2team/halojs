title: 'stylesheet'
order: 18
---

## 功能

动态创建css样式

> author leeenx
> version 1.0.0
> create: 2015-11-11

## Official Usage

```javascript
//添加样式
$.stylesheet({
    css: 'body{background-color: #ff0',
    type: "add"
});

//添加样式
$.stylesheet({
    css: 'body{background-color: #ff0',
    type: "delete"
});
```
## Lazy Usage

```javascript
//添加样式
$.stylesheet('body{background-color: #ff0');
//减少样式
$.stylesheet('body{background-color: #ff0','delete');
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| css | string | compulsory | css样式 |
| type | string | optional | 操作选项，目前有两个值：`add`, `delete`，默认为: add。 |
| incremental | boolean | optional | 是否增量更新，默认：1。为0表示对象的深度拷贝 |


## DEMO

{% demo /demo/stylesheet.html 点击查看stylesheet %}


