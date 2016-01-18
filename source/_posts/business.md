title: 'business'
order: 19
group: 业务模块
deps:
    - enablea
    - compare
    - stylesheet
    - compare
    - prefix
---

## 作用

常规弹窗

> author leeenx
> version 1.0.0
> data: 2015-12-12

## Official Usage

```javascript
$.dialog(
    {
        type:"success",
        text:"你好，这是普通的消息",
        closeBtn:{//关闭按钮
            show: 1,//显示，默认为0 -- 不显示
            css: '',//内联样式
            className: '',//样式类名
            attr: {},
            close: 1,//自动关闭弹窗，默认为 1
            cb: function(){
                //点击回调
                this.close();//调用this.close()可以关闭弹窗
            }
        },
        btns:[
            {
                text: "知道了",
                close: 0,//自动关闭弹窗，默认为 1
                cb:function(){
                    //点击回调
                    this.close();//调用this.close()可以关闭弹窗
                },
                addEvent:{//添加事件
                    "touchmove":function(e){
                        //调用this.close可以关闭弹窗
                        e.stopPropagation();
                        console.log("btn move");
                    }
                }
            }
        ],
        mask:{//蒙层相关的属性，目前只有css(内联样式),className 类名,attr - 属性（attribute）
            className: '',
            css: '',
            attr: {},
            addEvent:{//添加事件
                "touchmove":function(){
                    //调用this.close可以关闭弹窗
                    console.log("mask move");
                }
            }
        },
        box:{//窗口相关的属性，目前只有css(内联样式),className 类名,attr - 属性（attribute）
            className: '',
            css: '',
            attr: {},
            addEvent:{//添加事件
                "touchmove":function(e){
                    //调用this.close可以关闭弹窗
                    e.stopPropagation();
                    console.log("box move");
                }
            }
        }
    }
);
```

## Example

```javascript
//普通文案弹窗
$.dialog(
    {
        text: "普通消息弹窗",
        btns:[
            {
                text: "不可关闭",
                close: 0
            },
            {
                text: "关闭按钮"
            }
        ]
    }
);

// 成功弹窗
$.dialog(
    {
    	type: "success",
        text: "成功弹窗",
        close: 1,
        btns:[
            {
                text: "关闭按钮"
            }
        ]
    }
);

// 错误弹窗
$.dialog(
    {
    	type: "error",
        text: "错误弹窗",
        close: 1,
        btns:[
            {
                text: "关闭按钮"
            }
        ]
    }
);

// 警告弹窗
$.dialog(
    {
    	type: "alert",
        text: "警告弹窗",
        close: 1,
        btns:[
            {
                text: "关闭按钮"
            }
        ]
    }
);

//加载中
$.dialog(
    {
        text: "努力加载中",
        type: "loading"
    }
);

```


## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| type | string | optional | 弹窗的类型选项：normal,success,error,alert,loading。默认为normal |
| text | string | compulsory | 弹窗文案 |
| closeBtn | object | optional | 定义弹窗右上角的关闭按钮的样式与监听事件。详见：closeBtn参数 |
| btns | array | optional | 定义弹窗的按钮组：[btn,btn,...]。 详见：btn参数|
| mask | object | optional | 定义蒙层的样式与监听蒙层事件。详见：mask参数 |
| box | object | optional | 定义弹窗体的样式与监听事件。详见：box参数 |

## closerBtn参数

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| show | boolean | optional | 是否显示按钮。默认不显示 |
| css | string | optional | 定义按钮的内联样式 |
| className | string | optional | 定义按钮添加一个样式类名（关闭按钮使用外部样式） |
| attr | object | optional | 为按钮添加attribute属性 |
| close | boolean | optional | 点击关闭弹窗。默认:true |
| cb | function | optional | 点击事件监听 |

## btn参数

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| text | string | optional | 按钮文案 |
| close | boolean | optional | 点击后关闭弹窗。默认: true |
| css | string | optional | 定义按钮的内联样式 |
| className | string | optional | 定义按钮添加一个样式类名（关闭按钮使用外部样式） |
| attr | object | optional | 为按钮添加attribute属性 |
| cb | function | optional | 点击事件监听 |
| addEvent | object | optional | 自定义监听事件。以键值列表的形式同时添加多个事件，具体可以看DEMO |

## mask参数

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| css | string | optional | 定义按钮的内联样式 |
| className | string | optional | 定义按钮添加一个样式类名（关闭按钮使用外部样式） |
| attr | object | optional | 为按钮添加attribute属性 |
| addEvent | object | optional | 自定义监听事件。以键值列表的形式同时添加多个事件，具体可以看DEMO |

## box参数

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| css | string | optional | 定义按钮的内联样式 |
| className | string | optional | 定义按钮添加一个样式类名（关闭按钮使用外部样式） |
| attr | object | optional | 为按钮添加attribute属性 |
| addEvent | object | optional | 自定义监听事件。以键值列表的形式同时添加多个事件，具体可以看DEMO |



## DEMO

{% demo demo/dialog.html 点击查看dialog %}
