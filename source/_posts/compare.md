title: compare
order: 2
group: 基础模块
---

## 功能

Object/Array类型对象之间的比较。

> author: leeenx
> version: 1.0.0
> data: 2015-12-07

## Official Usage

`$.compare({obj1:test1,obj2:test2}`

## Lazy Usage

`$.compare(obj1,obj2);`

## Example

```javascript
test1={
    a:1,
    b:"str",
    c:[1,2,3,{c1:"c1",c2:2}],
    d:{
        d1:1,
        d2:"d2",
        d3:["a","b","c"]
    }
};
test2={
    a:11,
    b:"str",
    c:[1,2,3,{c1:"c1",c2:2}],
    d:{
        d1:1,
        d2:"d2",
        d3:["a","b","c"]
    }
};
alert($.compare({obj1:test1,obj2:test2})?"相等":"不相等");
```
## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| obj1 | object | 必选 | 参与对比的对象一|
| obj2 | object | 必选 | 参与对比的对象二|

## DEMO

{% demo demo/compare.html 点击查看compare %}





