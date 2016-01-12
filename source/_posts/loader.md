title: 'loader'
order: 7
group: 基础模块
---

## 功能

资源加载器。由于兼容性问题，目前只支持图片：jpg,gif,png等图片格式

> author leeenx
> version 1.0.0
> data: 2015-12-07

## Official Usage

```javascript
$.loader(
    {
        source:[],
        onchange:function(percent){
            console.log(percent);
        },
        complete:function(){
            //加载完成
        }
    }
);
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| source | array | compulsory | 图片资源URL数组 |
| onchange | function | optional | 监听加载变化，加载完成一个资源就会触发一次onchange |
| complete | function | optional | 监听加载完成。加载完成是会调用complete函数 |


## DEMO

{% demo demo/loader.html 点击查看loader %}