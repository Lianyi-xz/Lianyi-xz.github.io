title: Ansible 杂项
tags: Ansible
categories: 自动化
date: 2018-03-19 17:04:00
---
### 主机内置变量
```bash
ansible_ssh_host               #连接目标主机的地址
ansible_ssh_port               #连接目标主机ssh端口
ansible_ssh_user               #连接目标主机默认用户
ansible_ssh_pass               #连接目标主机默认用户密码
ansible_sudo_pass              #sudo密码
ansible_sudo_exe               #sudo命令路径
ansible_connection             #目标主机连接类型，可以使local、ssh和paramiko
ansible_ssh_private_key_file   #连接目标主机的ssh私钥
ansible_*_interpreter          #指定采用非Python的其他脚本语言
```
### 变量赋值
* Inventory文件中使用"="号为变量赋值
* playbook和包含变量设置的配置文件中，使用冒号":"为变量赋值
<!-- more -->
### playbook参数
```bash
#限定执行范围
  --limit          #指定所执行的主机/组
  --list-hosts     #查看执行的主机/组信息

#用户与权限设置
  --remote-user    #指定执行用户
  --ask-sudo-pass  #交互式的输入密码
  --sudo           #强制所有play都使用sudo用户
  --sudo-user      #指定sudo可以执行那个用户的权限

#其他选项
  --inventory=PATH #指定inventory文件，默认文件是/etc/ansible/hosts
  - v|vvvv         #显示详细信息
  --extra-vars vars #定义playbook中使用变量   “key=value,key=value”
  -f num           #指定并发执行任务数
  -c type          #指定连接远程主机方式
  --check          #检查模式，不真正执行 
```
