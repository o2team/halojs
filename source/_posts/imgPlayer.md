title: 'imgPlayer'
order: 20
---

## 功能

图片轮播

> author leeenx
> version 1.0.0
> data: 2015-11-11

## Official Usage

```javascript
$("#container").imgPlayer(
	{
        motion: "X",
        showNumList: 1,//显示图片小icon列表
        duration: 4000,//图片切换的动画时长
        autoPlay: 1 //自动轮播
    }
);
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| motion | string | optional | 图片轮播方向选项：X,Y。默认：X |
| showNumList | boolean | optional | 是否显示图片小icon列表 |
| duration | int | optional | 图片切换过渡时长，单位ms，默认：4000ms |
| autoPlay | boolean | optional | 是否自动轮播播放，默认：true |


## 方法列表

| name | 描述 |
| :----: | :----: |
| move| 图片切换到指索引的图片 |
| prev | 切换到上一张图片 |
| next | 切换到下一张图片 |

## 属性列表

| name | 类型 | 描述 |
| :----: | :----: | :----: |
| autoPlay | boolean | 是否为自动播放。可直接更改 |
| duration | int | 图片切换过渡时长。可直接更改 |
| totalPage | int | 播放器的图片数。不可修改 |


## DEMO 

{% demo /demo/imgPlayer.html 点击查看imgPlayer %}


