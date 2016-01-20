title: 'dataSave'
order: 3
group: 业务模块
deps:
	- jsonp
---

## 功能

读取取万金油接口数据，需要**登录**。

> author leeenx
> version 1.0.0
> data: 2015-12-15

## Official Usage

```javascript
$.dataSave(
	{
		data: {
            biztype:'halowglogin',
            msgcontent:'我做的测试数据',
            platform:2 //表示环境来源 1 - 手Q 2 - 微信   如果不传这个参数，datasave会自动检测当前环境
        },
		callback:function(json){
            //返回的报文中，iTotalNum表示提交数据的总人数（按biztype计算）
            //sMsgContent 当前用户提交的信息
            //json.iRet 报文结果码， 0 -- 成功, 9999 ---- 未登录， 其它 ---- 失败
		}
	}
);
```
## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| data | object | compulsory | 参见 data 参数 |
| callback | function | optional | 返回数据回调。返回对象参见 json列表 |

## data 参数

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| biztype | string | compulsory | 活动名 |
| msgcontent | string | compulsory | 需要存储的数据 |
| platform | int | optional | 环境来源选项：1 - 手Q，2 - 微信。默认：自动认别当前环境 |

## json列表

| name | 类型 | 描述 |
| :----: | :----: | :---- |
| iRet | string | 结果码： 0: 成功，9999: 未登录, 其它: 失败 |
| iTotalNum | int | 提交数据的总人数（UV） |
| iRepeatNum | int | 提交数据的总次数（PV） |
| iRank | int | 提交的排名，可用于统计参与活动的排名 |
| sMsgContent | string | 存储的内容 |

