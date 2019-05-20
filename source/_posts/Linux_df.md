title:  df -h 不可中断解决
tags: OS
categories: Linux
date: 2019-02-10
---

### 状况
登陆服务器使用`df -h` 命令后无法终止，且`Ctrl+C`无法退出  
`kill -9  pid` 无法杀死进程
### 查看当前状态
```bash
#查看进程
ps -aux |grep df
#进程状态为D：不可中断的睡眠
root      9356  0.0  0.0 108236   636 ?        D     2018   0:00 df -h
#kill -9 
```
<!-- more -->
### 问题解决
```bash
#查看当前进程运行状态
strace df
#状态详情
……
stat("/sys/kernel/config", {st_mode=S_IFDIR|0755, st_size=0, ...}) = 0
stat("/", {st_mode=S_IFDIR|0755, st_size=4096, ...}) = 0
stat("/proc/sys/fs/binfmt_misc", 
#发现卡在了stat("/proc/sys/fs/binfmt_misc"
#查询后重新挂载该文件
systemctl restart proc-sys-fs-binfmt_misc.automount
#end

```