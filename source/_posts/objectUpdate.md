title: 'objectUpdate'
order: 17
group: 基础模块
---

## 功能

object/array类型对象的更新

> author leeenx
> version 1.0.0
> data: 2015-12-07

## Official Usage

```javascript
$.objectUpdate(//对象更新
	{
		obj1: obj1,
		obj2: obj2,
		incremental: 1//是否增量更新，默认为1。如果为0，当前方法相当于obj1是obj2的深度拷贝
	}
);
```

## Lazy Usage

```javascript
$.objectUpdate(obj1,obj2[,incremental]);
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| obj1 | object/array | compulsory | 目标对象：更新的对象 |
| obj2 | object/array | compulsory | 增量对象：更新的参照对象 |
| incremental | boolean | optional | 是否增量更新，默认：1。为0表示对象的深度拷贝 |


## DEMO

{% demo demo/objectUpdate.html 点击查看objectUpdate %}
