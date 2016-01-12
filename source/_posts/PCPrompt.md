title: 'PCPrompt'
order: 4
group: UI模块
---

## 功能

在PC环境下的友好提示

> author leeenx
> version 1.0.0
> data: 2015-12-07

## Official Usage

```javascript
$.PCPrompt(
    {
        title: "京东温馨提示",
        QRCode: '',//二维码URL
        link: location.href,
        hint: '请使用 手机/平板 等移动设备扫描二维码',
        description: '',//其它描述信息
        background: 'rgba(0,0,0,.4)',//蒙层背景
        color: '#fff',//整体颜色
        minWidth: 800//PC的最少宽度 -- 如果设置了这个值，代码会自动检查如果大于这个值，蒙层会自动显示
    }
);
```

## Example

```javascript
$.PCPrompt();
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| title | string | optional | 标题文字。默认值：温馨提示 |
| QRCode | string | optional | 二维码图片的URL。默认值: <br /> `http://qr.liantu.com/api.php?&text='+encodeURIComponent(location.href)` |
| link | string | optional | 二维码的目标URL。默认值: location.href |
| hint | sting | optional | 提示文案。默认值： 请使用 手机/平板 等移动设备扫描二维码|
| description | string | optional | 底部描述文案。默认值为空|


## DEMO

{% demo demo/PCPrompt.html 点击查看PCPrompt %}

