title: Ansible 基础与安装
tags: Ansible
categories: 自动化
date: 2018-03-13 17:04:00
---
### 简介
* 无需在被控主机部署任何客户端代理
* 用YAML格式来描述配置
* 默认使用SSH协议对设备进行管理
* 支持API及自定义模块，可通过Python扩展
* 通过Playbooks定制配置、状态管理
<!-- more -->
### 组成部分
* playbooks：任务剧本，编排定义Ansible任务集的配置文件，由Ansible顺序依次执行
* inventory： Ansible管理主机的清单
* modules：   Ansible执行命令的功能模块
* plugins：   模块功能的补充，如连接类型插件、循环插件、变量插件、过滤插件等等
* API：供第三方程序调用的应用程序编程接口
* Ansible：   Ansible命令工具，组合inventory、API、modules、plugins,是核心执行工具

### Ansible安装
```bash
#pip安装
  yum install gcc glibc-devel zlib-devel rpm-build openssl_devel -y
  pip install --upgrade pip
  pip install ansible -update

#yum安装
  rpm -ivh http://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
  yum install -y ansible

#apt-get安装
  apt-add-repository -y ppa:ansible/ansible
  apt-get update
  apt-get install -y ansible

#源码安装
  yum install git -y
  git clone git://github.com/ansible/ansible.git
  cd ./ansible
  source ./hacking/env-setup

#验证安装结果
  ansible --version
```

### Ansible所有文件存放目录
```bash
#配置文件目录  
/etc/ansible   #主机信息配置、Ansible工具功能配置等。运维日常的所有配置类操作
#执行文件目录  
/usr/bin       #ansible系列命令默认存放目录
#lib库依赖目录  
/usr/lib/python2.7/site-packages/ansible
#help文档目录  
/usr/share/doc/ansible-2.3.2.0
#man文档目录
/usr/share/man/man1
```
### Ansible配置文件
```bash
#Ansible读取配置文件顺序
#  当前命令执行目录--用户家目录-/etc/ansible.cfg
vim /etc/ansible/ansible.cfg
#定义常规的连接类配置
[defaults]  
#针对sudo用户提权的配置
[privilege_escalation]  
#paramiko配置
[paramiko_connection]  
[ssh_connection]
# pipelining = False            管道加速功能，需配合requiretty使用
#连接加速相关配置
[accelerate]  
[selinux]
[color]
```

### 参考资料
[ansible文档](http://docs.ansible.com/ansible/latest/index.html)