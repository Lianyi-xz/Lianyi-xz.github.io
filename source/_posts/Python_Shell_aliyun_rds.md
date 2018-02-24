title: Python调用阿里云数据库监控数据
tags: Shell
categories: Python
date: 2018-02-24 14:28:00
---
### 概述
* 基于Python 3.6.0 实现
* 抓取公司云数据库监控数据 存入本地数据库
* centos定时任务 每分钟执行一次

<!-- more -->

### 引入SDK 
```bash
# 安装Python SDK 包
pip install aliyun-python-sdk-core-v3
pip install aliyun-python-sdk-rds
```

### 获取json代码
```bash
from aliyunsdkcore import client
from aliyunsdkrds.request.v20140815 import DescribeRegionsRequest

# 设置访问凭证
accessKeyId = '<access-key-id>'
accessKeySecret = '<access-key-secret>'
client = client.AcsClient(accessKeyId, accessKeySecret,'cn-shanghai')

# 创建Request对象，并对其中参数赋值
request = DescribeRegionsRequest.DescribeRegionsRequest()
#设置返回数据格式，默认为XML
request.set_accept_format('json')
request.set_action_name('DescribeDBInstancePerformance')
#多个性能指标用 "," 分隔
request.set_query_params(dict(DBInstanceId="数据库实例名",key="性能指标",StartTime="2018-02-22T05:00Z",EndTime="2018-02-22T15:00Z"))
print(client.do_action_with_exception(request))
```
### json转化为sql语句基本思路
* 获取返回json数据
* 循环PerformanceKeys/PerformanceKey键内array
* 将key作为表名
* 将其它键作为属性名,并额外添加Date属性
* 循环Values/PerformanceValue，将Value和Date值存入数组
* 拼接字符串转化成插入sql语句

### json格式
![](https://ws1.sinaimg.cn/large/006Xrlj6gy1forhayuth9j30hj0fbt8z.jpg)

### 转化json代码
```python
#案例数据
apidate={"DBInstanceId":"rm-test","RequestId":"test","PerformanceKeys":{"PerformanceKey":[{"Values":{"PerformanceValue":[{"Value":"2624&415&5&0&2204","Date":"2018-02-23T08:00:32Z"},{"Value":"2624&415&5&0&2204","Date":"2018-02-23T08:05:32Z"},{"Value":"2624&415&5&0&2204","Date":"2018-02-23T08:10:32Z"},{"Value":"2624&415&5&0&2204","Date":"2018-02-23T08:15:32Z"},{"Value":"2624&415&5&0&2204","Date":"2018-02-23T08:20:33Z"},{"Value":"2624&415&5&0&2204","Date":"2018-02-23T08:25:33Z"}]},"Key":"MySQL_DetailedSpaceUsage","Unit":"MB","ValueFormat":"ins_size&data_size&log_size&tmp_size&other_size"},{"Values":{"PerformanceValue":[{"Value":"0.28","Date":"2018-02-23T08:00:32Z"},{"Value":"0.26","Date":"2018-02-23T08:05:32Z"},{"Value":"0.26","Date":"2018-02-23T08:10:32Z"},{"Value":"0.38","Date":"2018-02-23T08:15:32Z"},{"Value":"0.28","Date":"2018-02-23T08:20:33Z"},{"Value":"0.36","Date":"2018-02-23T08:25:33Z"}]},"Key":"MySQL_IOPS","Unit":"int","ValueFormat":"io"}]},"EndTime":"2018-02-23T09:41Z","StartTime":"2018-02-23T08:00Z","Engine":"MySQL"}
apikey=apidate['PerformanceKeys']['PerformanceKey']
for i in apikey:
    #定义表名
    tablename=i["Key"]
    #定义列名
    tablecolumn=i['ValueFormat'].replace("&",",")+",date,unit"
    valueunit=i['Unit']
    sqlhalf="INSERT INTO "+tablename+" ("+tablecolumn+") VALUES"
    apivalues=i['Values']['PerformanceValue']
    valuelist=[]
    for i in  apivalues:
        tablevalue="("+i['Value'].replace("&",",")+",'"+i['Date'].replace("T"," ").replace("Z"," ")+"','"+valueunit+"')"
        valuelist.append(tablevalue)
    sql=sqlhalf+",".join(valuelist)+";"
    print(sql)
```

### 参考资料
[Python SDK列表](https://help.aliyun.com/document_detail/30003.html)  
[SDK使用参考](https://helpcdn.aliyun.com/document_detail/42700.html?spm=a2c4g.11186623.6.608.Sp66kt)  
[性能参数表](https://help.aliyun.com/document_detail/26316.html?spm=a2c4g.11186623.6.936.jeShyh)   
[实例性能数据返回参数](https://help.aliyun.com/document_detail/26280.html?spm=a2c4g.11186623.6.910.lsLvHa)
