title: 'launchApp'
order: 16
group: 其它模块
---

## 功能

在移动端页面打开指定的APP

> author leeenx
> version 1.0.0
> data: 2015-11-12

## Official Usage

```javascript
$.launcthApp(
    {
        packageName: "com.jingdong.app.mall", -- android对应的packagename
        scheme: "openApp.jdMobile://", -- ios使用的scheme(其实android也会用这个)
        downloadUrl:'http://h5.m.jd.com/active/download/download.html?channel=jd-shhd3',//通用下载地址
        downloadAndroid:'http://a.app.qq.com/o/simple.jsp?pkgname=com.jingdong.app.mall&g_f=991850',//安卓的下载地址
        downloadIOS:'https://itunes.apple.com/cn/app/id414245413'//ios的app_store地址
    }
);
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| packageName | string | compulsory | android对应的packagename |
| scheme | string | compulsory | ios使用的scheme |
| downloadUrl | string | optional | 通用下载地址。如果设置了这个参数，则下载会统一跳转到这个地址 |
| downloadAndroid | string | optional | 安卓的下载地址 |
| downloadIOS | string | optional | ios的app_store地址 |


## DEMO

{% demo demo/launchApp.html 点击查看launchApp %}
