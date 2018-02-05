title: Linux 禁止root远程登陆
tags: OS
categories: Linux
---

### 创建新用户
```bash
useradd xx
```

### 添加用户到root组
```bash
usermod -g root xx
```
<!-- more -->
### 添加用户sudo权限
```bash
vim /etc/sudoers
 xx all all
```

### 限制ssh
```bash
vim /etc/ssh/sshd_config
#PermitRootLogin yes 取消注释改为no
```

### 重启ssh
```bash
#centos6
service sshd reload
#centos7
systemctl restart sshd.service
```