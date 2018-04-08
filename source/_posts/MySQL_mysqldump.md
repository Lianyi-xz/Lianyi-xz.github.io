title: MySQL 数据备份与还原(mysqldump)
tags: MySQL
categories: DataBase
date: 2018-03-12 14:28:00
---
### 创建备份用户
```bash
create user 'backuper'@'localhost' identified by 'Aa123456';
grant select,reload,process,show databases,super,lock tables,replication client,show view,event on *.* to 'backuper'@'localhost';
flush privileges;
```
<!-- more -->
### mysqldump备份
```bash
#备份数据库 或数控中的某些表
mysqldump -u username -p dbname table1 table2...>BackupName.sql  
#备份多个数据库 
mysqldump -u username -p --databases dbname1 dbname2...>BackupName.sql 
#备份所有数据库
mysqldump -u username -p --all-databases>BackupName.sql   
```
### mysql还原
```bash
#命令行
mysql -u root -p [dbname]<backup.sql        
#mysql终端
source backup.sql
```
