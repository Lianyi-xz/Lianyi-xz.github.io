title: MySQL 数据更新
tags: MySQL
categories: MySQL
date: 2018-03-12 12:28:00
---
>若数据存在则更新，不存在则插入

### 索引
```bash
#判断数据是否存在的字段添加unique索引
#创建表时添加索引
create table table_name(
   ...
   unique index index_name(colunm_name [ASC|DESC])
#现有表添加索引
create unique index index_name on table_name(column_name [ASC|DESC]) 
#删除索引
drop index index_name on table_name
```
<!-- more -->
### SQL
```bash
#duplicate key update 
#若数据的主键/ UNIQUE KEY 在表中存在，则执行duplicate key update 后操作
insert into table_name(col1,col2) value(value1,value2) \ 
            on duplicate key update col1=value1,col2=value2
```