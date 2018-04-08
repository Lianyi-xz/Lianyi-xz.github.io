title: MySQL 修改Root密码
tags: MySQL
categories: DataBase
date: 2018-03-13 14:30:00
---
### 已知ROOT密码
```bash
#shell环境下
mysqladmin -u root -p password "新密码"
#mysql终端下 更新mysql库user表的数据
Update mysql.user set password=password('新密码') where user='root';
flush privileges;
#mysql终端下 修改root用户的授权权限
grant all on *.* to root@'localhost' identified by '新密码';
```
<!-- more -->
### 未知Root密码
```bash
#关闭数据库
service mysqld stop
Systemctl stop mysql.service
#修改my.cnf
vim /etc/my.cnf
skip-grant-tables
#启动数据库
Systemctl start mysql.service
#修改用户密码
update mysql.user set authentication_string=password('123456') where user='root' and host='localhost';
flush privileges;
#修改my.cnf
vim /etc/my.cnf
#skip-grant-tables
#启动数据库
Systemctl start mysql.service
#修改root密码
alter user 'root'@'localhost' identified by '123456'; 
```
