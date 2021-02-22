---
title: Linux lvm扩展
tags: 系统
categories: 技术
date: 2021-02-19 19:39:00
---

> 虚拟机新增磁盘空间时遇到问题，未解决。新建虚拟机扩磁盘无此问题。

#### 基础环境
1. redhat 7.6
1. 社区版蓝鲸


#### 方法一：增加现有磁盘容量
```bash
#动态修改磁盘
parted /dev/sda
    p   #查看分区信息
    h   #查看帮助列表
    resizepart 5 100GB #将第五分区扩到100GB

# 修改pv大小
pvresize /dev/sda5
#查看free PE size
vgdisplay
#查看 lv信息
lvs
#扩PE到lv中
lvresize -l +12799 /dev/VolGroup/lv_root
```
 
<!-- more -->
#### 方法二：新增磁盘
```bash
#磁盘分区
fdisk /dev/sdb
    n   #新建分区 
    p   #主分区
    1   #序号1 默认扇区
    wq  #保存退出

#创建pv
pvcreate /dev/sdb1
#扩展vg
vgextend VolGroup /dev/sdb1
#查看free PE size
vgdisplay
#查看 lv信息
lvs
#扩PE到lv中
lvresize -l +12799 /dev/VolGroup/lv_root
```
#### 出现问题
```bash
#调节文件系统
[root@localhost ~]#  resize2fs /dev/VolGroup/lv_root
resize2fs 1.42.9 (28-Dec-2013)
Filesystem at /dev/VolGroup/lv_root is mounted on /; on-line resizing required
old_desc_blocks = 6, new_desc_blocks = 12
resize2fs: Permission denied to resize filesystem

#查看报错内容
[root@localhost ~]# strace  resize2fs /dev/VolGroup/lv_root
……
open("/", O_RDONLY)                     = 4
#ioctl 报错 没有操作权限
ioctl(4, _IOC(_IOC_WRITE, 0x66, 0x10, 0x08), 0x7ffd885dc4e0) = -1 EPERM (Operation not permitted)   
write(2, "resize2fs", 9resize2fs)                = 9
write(2, ": ", 2: )                       = 2
write(2, "Permission denied to resize file"..., 38Permission denied to resize filesystem) = 38
……
```

#### 参考资料
[“resize2fs: Permission denied to resize filesystem”](https://cloud.tencent.com/developer/article/1520045)  
[blockdev](https://ipcmen.com/blockdev)  

