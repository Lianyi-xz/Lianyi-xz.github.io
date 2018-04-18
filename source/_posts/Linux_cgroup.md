title: Linux Cgroup
tags: OS
categories: Linux
date: 2018-04-13 15:38:00
---
### 简介
Cgroup：linux资源限制方式  
Cgroup中控制资源的系统成为controller  
​​​可​​​更​​​具​​​体​​​地​​​控​​​制​​​对​​​系​​​统​​​资​​​源​​​的​​​分​​​配​​​、​​​优​​​先​​​顺​​​序​​​、​​​拒​​​绝​​​、​​​管​​​理​​​和​​​监​​​控​​​  
可​​​更​​​好​​​地​​​根​​​据​​​任​​​务​​​和​​​用​​​户​​​分​​​配​​​硬​​​件​​​资​​​源​​​，提​​​高​​​总​​​体​​​效​​​率​​​    
### 安装Cgroup
```bash
#安装cgroup
yum install libcgroup-tools libcgroup
#查看cgroup配置文件
ls /etc/ |grep cg
#查看cgroup配置
find / -name  cgroup |grep -v proc
#查看cgroup挂载情况
lssubsys -am
mount -t cgroup
#手动挂载cgroup
mkdir cgroup
mount -t tmpfs cgroup_root ./cgroup
mkdir cgroup/cpuset
mount -t cgroup -ocpuset cpuset ./cgroup/cpuset/
...
```
<!-- more -->
### 编写限制规则
```bash
#查看磁盘设备号
ll /dev/sda
#限制规则语法查看
man cgconfig.conf 
vim /etc/cgconfig.conf
#限制磁盘I/O
vim /etc/cgconfig.conf
group diskio {
  blkio {
    #限制8:0磁盘最大读取速率为1MB，写入速录为20KB
    blkio.throttle.read_bps_device="8:0 1048576";
    blkio.throttle.write_bps_device="8:0 20480";
  }
}
#添加应用规则
vim /etc/cgrules.conf 
*:/bin/dd       blkio           diskio
#启动cgroup
systemctl restart  cgconfig
systemctl restart  cgred
```
### 测试
```bash
dd if=/dev/sda of=/dev/null
#将进程pid添加到磁盘限制任务中
echo pid > /sys/fs/cgroup/blkio/diskio/tasks
#查看io状况
iotop
```

### 参考资料
[云栖社区-cgroup](https://yq.aliyun.com/articles/519235)   
[Docker基础技术：Linux CGroup实践](https://bbs.aliyun.com/detail/338165.html)