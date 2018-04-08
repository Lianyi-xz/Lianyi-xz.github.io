title: MySQL 数据备份与还原(select语句)
tags: MySQL
categories: DataBase
date: 2018-03-12 14:30:00
---
>常用于单表备份

```bash
#备份表数据
select * into outfile '/path/to/somefile.txt'  from table_name  [where clause]

#恢复数据时一定要关闭二进制日志 0：关闭 1：开启
sql_log_bin=0
#还原表数据
 load data infile '/path/to/somefile.txt' into table table_name
```