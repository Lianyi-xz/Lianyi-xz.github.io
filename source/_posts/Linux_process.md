title: Linux 进程简介
tags: OS
categories: Linux
date: 2018-04-12 09:04:00
---
### 程序和进程
* 程序是为了完成某种任务而设计的软件
* 进程就是运行中的程序
* 一个运行着的程序，可能有多个进程

PS: Bash在实现pipeline(管道|)时会发起两个subshell(子shell)来运行|两边的命令，对于系统来说就是发起两个childprocess(子进程）

### 进程优先级
top中N1标记对应进程的优先级 取值范围-20~19，值越低优先级越高  
nice优先级，默认为0，(普通用户可调整范围:0~19)  
进程最终优先级=优先级+nice优先级  
<!-- more -->
### 赋予nice优先级
```bash
  nice -n -10 ./job.sh     #启动脚本时
  renice -10 -p pid        #运行脚本时
```
### 进程属性
```bash
  PID：        进程ID 
  PPID：       子进程和父进程的ID
  UID：        启动进程的用户ID
  GID：        归属的组
```

### 进程状态
```bash
  D        不可中断的睡眠
  R        运行
  S        休眠
  T        停止
  Z        僵尸
```

### 进程管理
#### 查看当前进程
```bash
PS
  l 长格式输出
  u 按用户名和启动时间的顺序来显示进程
  j 用任务格式来显示进程
  f 用树形格式来显示进程
  a 显示所有用户的所有进程（包括其它用户）
  x 显示无控制终端的进程
  r 显示运行中的进程
  ww 避免详细参数被截断
```
#### 查看进程文件位置
```bash
  ls -al /proc/{pid}
  pwdx pid
```
#### 杀掉进程
```bash
#查看kill信号代码
kill -l  
  1   重启
  9   强行杀掉
  15 正常结束
```

#### 查看线程
```bash
  ps -T pid
  pstree -p pid
  ps xH |grep pid |wc -l
  pstack pid
  cat /proc/{pid}/status
```
#### 查看线程列表
```bash
ps -mp {pid} -o THREAD,tid,time  
```

