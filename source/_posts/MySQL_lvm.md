title: MySQL 数据备份与还原(LVM)
tags: MySQL
categories: DataBase
date: 2018-03-12 14:30:00
---
>逻辑卷快照，对数据库加读锁然后拍摄快照
数据文件和事务日志要在同一个逻辑卷上

### 创建快照
```bash
#刷新表，缓存内容写入表中
flush tables with read lock
flush logs
#保存二进制文件信息
MySQL -e 'show master status\G' >/backup/master-`date+%F`.info
#创建快照卷
#对/dev/myvg/mydata逻辑卷  创建 名为mydata-snap的50M大小的只读卷
#根据备份时间内数据变化大小决定快照大小，一般取二倍 
lvcreate -L 50M -s -p r -n mydata-snap /dev/myvg/mydata
#释放锁
unlock tables;
commit;
```
<!-- more -->

### 使用快照
```bash
#挂载快照卷 到/mnt
mount /dev/myvg/mydata-snap /mnt -o ro
#进行数据的完全备份
cp -a ./* /backup/
#删除快照
umount /mnt
lvremove --force /dev/myvg/mydata-snap
#删除没用的二进制文件
rm -rf master-bin.*
```