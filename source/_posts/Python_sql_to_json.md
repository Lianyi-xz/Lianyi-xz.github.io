title: Python实现SQL数据转化为json格式
tags: [Shell,Python]
categories: Python
date: 2018-02-11 15:28:00
---
> 基于Python 2.7.5 实现

### 基本思路
* 连接mysql数据库
* 查询表数据
* 查询表结构
* 按行循环表数据
* 按行表数据与表结构对应 存入字典中
* 将字典存入list中，然后将list转化为json格式

<!-- more -->
### 源代码
```python
#!/usr/bin/python
#coding: utf-8
import MySQLdb
import json
import datetime

#处理data类型
def date_handler(obj):
    if hasattr(obj, 'isoformat'):
        return obj.isoformat()
    else:
        raise TypeError

#连接数据库
try:
        conn = MySQLdb.connect (host = "192.168.0.1",
                           user = "root",
                           passwd = "root123",
                           db = "os_system",
                           charset='utf8')
except Exception as e:
     print(e)
     sys.exit()

#查询数据
select_cursor = conn.cursor ()
selectsql="select * from os_status limit 10"
select_cursor.execute(selectsql)
#获取表数据
sql_data=select_cursor.fetchall()
#获取表结构
fields=select_cursor.description 
select_cursor.close()
#关闭数据库连接
conn.commit()
conn.close ()

#定义表结构的列表
column_list = []

# 提取字段，追加到列表中
for i in fields:
  column_list.append(i[0])

#按行将数据存入数组中，并转换为json格式
#column_size = len(column_list)
#定义存储sql数据的list
sql_list=[]
#按行对sql数据进行循环
for row in sql_data:
  #表数据与表结构对应 存入字典中
  result = {}
  for i in range(len(row)):
    result[column_list[i]] = row[i]
  #字典存入list中
  sql_list.append(result)
#输出json
print(json.dumps(sql_list,default=date_handler))
```

### 优化
* 将数据存入文件中
* 增加用户交互，编辑连接数据库及sql语句

### python2 连接mysql
```bash
yum install python-devel  
yum | pip install  MySQL-python

import MySQLdb
```
### 参考资料
[datetime.date is not JSON serializable问题](https://stackoverflow.com/questions/23285558/datetime-date2014-4-25-is-not-json-serializable-in-django)  