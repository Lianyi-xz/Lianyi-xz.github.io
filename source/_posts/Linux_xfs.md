title: Linux 文件系统(xfs)备份与恢复
tags: OS
categories: Linux
date: 2018-03-02 12:47:00
---
>centos7默认文件系统(xfs)  
centos6默认文件系统(ext4)

### XFS简介
* 每个单个文件系统最大支持8eb  
* 单个文件支持16tb  
* 提供备份和恢复工具
<!-- more -->
### 文件系统的备份和恢复
* XFS不需要先卸载在备份  
* 对使用中的XFS仍可保证一致性
* 备份和恢复过程中可中断后继续
* 高性能多线程备份操作

#### 备份简介(xfsdump)
* 按inode顺序备份XFS文件系统
* 需要root权限
* 备份下来的数据只能让 xfsrestore 解析
* 不支持没有挂载的文件系统备份

| 备份级别 | 备份方式 |
| :---:   | :-------: |
| 0     |   完全备份    |
| 1-9   |   增量备份    |

#### 全备份
```bash
#备份整个分区
xfsdump -f 备份存放位置 需要备份的文件系统
#免交互备份
xfsdump -f 备份存放位置  需要备份的文件系统 -L 备份会话标签 -M  设备标签
#备份分区中的目录
xfsdump -f 备份存放位置  -s 需要备份的文件相对路径 文件系统 -L 备份会话标签 -M  设备标签
#查看备份消息
xfsdump -I
#备份消息存放位置
var/lib/xfsdump/inventory
#删除备份
rm -rf 备份存放位置
```
#### 增量备份
* 无重复备份数据，备份时间短
* 恢复相对麻烦，需全备份和所有增量备份数据
* 等级1：根据全备份做增量备份
* 等级n：更具增量备份n-1做增量备份

```bash
#先进行全备份
xfsdump -f /opt/test-full /sdb1 -L test-full -M media0
#第一次增量备份
xfsdump -l 1 -f /opt/test-back1 /sdb1 -L test-full -M media0
-l level 备份等级
#再增量备份 则为 level 2 等级
xfsdump -l 2 -f /opt/test-back2 /sdb1 -L test-full -M media0
```
#### 数据恢复
```bash
#全备份 分区恢复
xfsrestore -f 备份存放位置 恢复后数据地址
#全备份 目录恢复
xfsrestore -f 备份存放位置 [-s 恢复文件的相对路径] 恢复后数据地址

#增量备份 恢复
#先恢复完全备份
#恢复最后一次增量备份
 xfsrestore -f /opt/test-full /sdb1/
 xfsrestore -f /opt/test-back1 /sdb1/   
 xfsrestore -f /opt/test-back2 /sdb1/
```

