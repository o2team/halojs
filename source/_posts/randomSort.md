title: 'randomSort'
order: 5
---

## 功能

将数组随机打乱后重新排列。

> author leeenx
> version 1.0.0
> data: 2015-12-07

## Official Usage

```javascript
$.randomSort(
	{
		list: [1,2,3,4,5],//要打散的数组
		length: 4 //打散后重组的数组长度
	}
);
```

## Lazy Usage

```javascript
$.randomSort([1,2,3,4,5],length);
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| list | array | compulsory | 重新排序的目标数组 |
| length | int | optional | 指定重组后数组的长度。默认为原数组长度 |


## DEMO

{% demo demo/randomSort.html 点击查看randomSort %}


