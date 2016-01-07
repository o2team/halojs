title: 'warn'
order: 13
---

## 功能

横屏引导层

> author leeenx
> version 1.0.0
> data: 2015-11-12

## Official Usage

```javascript
$.warn(
	{
		bg: "#f00",//背景，可以使用背景图片，只要按照background: ... 的标准写法即可 -- option
		icon: "image_url",//引导层图标的url地址(一般使用缺省图片即可) -- option
		text: "..."//引导文案，有缺省值 -- option
	}
);
```

## Example

```javascript
$.warn();
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| bg | string | optional | 背景颜色，可以使用背景图片，只要按照background: ... 的标准写法即可 |
| icon | string | optional | 引导层图标的url地址 |
| text | string | optional | 引导文案 |


## DEMO

{% demo demo/warn.html 点击查看warn %}


