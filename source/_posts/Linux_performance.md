title: Linux 性能分析
tags: 系统
categories: 运维
date: 2018-04-13 10:38:00
---
### 系统分析
#### CPU性能分析工具
```bash
#报告CPU状态
mpstat 
# 查看CPU硬件
lscpu
dmidecode
```
#### 内存性能分析工具
```bash
free
/proc/meminfo
vmstat
```
<!-- more -->
#### 磁盘性能分析工具
```bash
iostat
# yum install iotop
iotop
sar
  -d  #查看磁盘I/O
  -r  #查看内存状态
#查找过去某时刻系统进程数最高的时间点与进程数
sar -f /var/log/sa/sa22 -q | sort -nr -k 3 | more
```

### 软件分析
#### 1dd
查看程序运行所需共享库的工具   
ldd是shell脚本，调用id-linux.so模块  
```bash
ldd /usr/bin/mysql
```
#### strace和ltrace
系统调用时内核态给用户态提供的一个系统接口  
使用该接口可从用户态切换到内核态工作  
strace和ltrace分别用来跟踪进程的系统调用和库函数调用  
##### strace
```bash
#安装
yum install strace
#查看脚本运行过程中系统调用的全过程
strace ./xxx.py
#统计多少系统调用
strace -c ./xxx.py
#根据call排序
strace -c -S calls ./xxx.py
#只看一种系统调用
strace -c -e open ./xxx.py
```
##### ltrace
```bash
#安装
yum install ltrace
#跟踪库函数调用
ltrace -cf grep root /etc/passwd
#跟踪进程的库函数调用
ltrace -p pid
```
#### ipcs
多个进程可能需要调用同一个内存内容  
例如管道：前一个进程输入放入内存，后一个命令读取内存  
三种进程间通信方法  
* semaphores: 信号量
* message queues: 消息队列
* share memory regions: 共享内存段
```bash
#查看进程通信情况
ipcs
#查看系统最大共享内存
ipcs -l -m
#配置共享内存
#kernel.shmall的单位是page
systemctl -w kernel.shmall=262144
#获取共享内存的key
ipcs -m
#清除共享内存
ipcrm -M key
```
#### systemtap
内核态进程跟踪程序  
主要用于寻找程序的性能瓶颈  

### 内存相关
#### 内存泄漏
程序运行中不能正常回收不用的内存，导致内存增长很高  
内存分析工具:Valgrind
#### 虚拟内存、物理内存与页缺失
Paging是内存的最小单位，默认一页是4KB  
虚拟内存：进程申请的内存
物理内存：实际分配给进程的内存
```bash
#查看进程的内存
#VSZ：虚拟内存
#RSS：物理内存
ps -aux | head -1
```
页缺失  
* 主页缺失  
  进程请求数据不在物理内存中，从磁盘或交换分区换到内存中
* 次页缺失  
  第一次物理内存被使用时，物理内存中没有分配
```bash
# pidof java:查询java进程的pid号
#查看页缺失情况
#minflt：次页缺失 majflt：主页缺失
ps o pid,comm,minflt,majflt `pidof java`
```
#### Out of Memory
若发生次页缺失时，系统无法释放物理内存，系统将杀掉进程来释放内存  
OOM会选择占用内存最多的进程开始kill内存，易kill掉关键进程
```bash
#发生oom时，让kernel panic
#若发生OOM Killer，需评估是狗需增加内存
echo 1 > /proc/sys/vm/panic_on_oom
```
#### Overcommit
```bash
#控制内存的申请
cat /proc/sys/vm/overcommit_memory
#0：默认模式，可能发生OOM
#1：完全响应内存申请，不管资源剩余
#2：不允许进程申请超多系统设置大小的内存空间
```
#### cache和buffer
buffer：磁盘文件的索引缓存  
cache：文件内容缓存

### 磁盘相关
#### HDD磁盘调度算法
```bash
#调度算法
#noop(无操作等待算法)：不干预I/O请求，适用于SAN的场景
#anticipatory(预期算法)：将I/O请求放入队列合并成顺序I/O再完成请求，适用于持续大量顺序I/O场景
#deadline(最后期限)：将I/O请求放入队列不处理，等I/O足够多合并一个I/O请求，适用于虚拟化的物理机和数据库服务器
#cfq(完全公平队列)：对每个进程的I/O请求公平处理，适用于随机读取，比如文件服务器
#修改调度算法
echo cfq > /sys/block/sda/queue/scheduler
```
#### 文件系统的日志
日志写入方式  
* ordered：默认方式，文件系统性能和数据安全性相对均衡
* writeback：较好的磁盘性能，数据安全性无法保证
* journal：数据安全，性能最差

### 系统资源限制
早期用ulimit限制资源使用，后来引入cgroup加强限制进程的资源使用  
#### ulimit
```bash
#查看ulimit配置文件
cat /etc/security/limits.conf 
#查看ulimit 设置情况
ulimit -a
#设置虚拟内存
ulimit -v  1048576
```

#### cgroup
新的资源限制方式

### 参考资料
[系统级性能分析工具--Systemtap](https://blog.csdn.net/u011630575/article/details/71215479)  
[systemtap官网](https://sourceware.org/systemtap/documentation.html)  
[Valgrind的用法](https://blog.csdn.net/u010318270/article/details/70864772)  