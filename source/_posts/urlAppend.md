title: 'urlAppend'
order: 10
group: 基础模块
---

## 功能

向url插入新的参数

> author leeenx
> version 1.0.0
> data: 2015-12-07

## Official Usage

```javascript
$.urlAppend({k:"key",v:"value"});
```

## Lazy Usage

```javascript
// 一次插入多个参数
$.urlAppend([{k:"key",v:"value"},...]);
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| k | string | compulsory | 参数的键名 |
| v | string | compulsory | 参数的键值 |


## DEMO

{% demo demo/urlAppend.html 点击查看urlAppend %}
