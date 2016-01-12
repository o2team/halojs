title: 'textMarquee'
order: 15
group: UI模块
---

## 功能

走马灯文字 -- 水平

> author leeenx
> version 1.0.0
> create: 2015-11-11

## Official Usage

```javascript
$("#container").textMarquee(
	{
		speed: 50
	}
);
```

## Lazy Usage

```javascript
$.textMarquee(
    {
        speed: 50,//移动的速度，单位为px/s option
        container: DOM, //文字走马灯的容器 option
        define: "halo_text_marquee" //自定义的属性名(halo_text_marquee为缺省值) option 如果有container，程序会自动忽略define。如果没有container，程序会获取带define 属性名的节点作为container
    }
);
```

## Example

```javascript
//结合页面带`halo_text_marquee`属性的节点，可以直接调用
$.textMarquee();

//指定容器
$("#textMarquee").textMarquee();
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| speed | int | optional | 移动速度，单位为px/s。默认值为50 |
| container | string/htmlElement | optional | 走马灯的容器。如果没指定，<br />代码会自动去寻找当前页面带define定义的属性的节点当做container |
| define | string | optional | 定义默认container容器 |


## DEMO

{% demo demo/textMarquee.html 点击查看textMarquee %}