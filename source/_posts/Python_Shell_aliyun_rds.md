title: Python调用阿里云数据库监控数据
tags: Shell
categories: Python
date: 2018-02-23 17:28:00
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

### 源代码
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
### 参考资料
[Python SDK列表](https://help.aliyun.com/document_detail/30003.html)  
[SDK使用参考](https://helpcdn.aliyun.com/document_detail/42700.html?spm=a2c4g.11186623.6.608.Sp66kt)  
[性能参数表](https://help.aliyun.com/document_detail/26316.html?spm=a2c4g.11186623.6.936.jeShyh)  
