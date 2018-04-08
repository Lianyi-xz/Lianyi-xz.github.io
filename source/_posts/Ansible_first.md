title: Ansible 初体验
tags: Ansible
categories: 自动化
date: 2018-03-14 09:04:00
---

### 基本环境
  * manager：10.10.0.132
  * work1：10.10.0.133
  * work2：10.10.0.134

### 添加公钥认证
```bash
#在manager主机中
ssh-keygen
#输入普通用户密码
ssh-copy-id -i /root/.ssh/id_rsa.pub zhaoran@10.10.0.133
ssh-copy-id -i /root/.ssh/id_rsa.pub zhaoran@10.10.0.134
```
<!-- more -->
### 编写主机清单
```bash
#主机清单默认为/etc/ansible/hosts
vim /etc/ansible/hosts
[test]
10.10.0.133
10.10.0.134
```
### ping工作主机
![](https://ws1.sinaimg.cn/large/006Xrlj6gy1fpc46lssp2j30f903gwei.jpg)

