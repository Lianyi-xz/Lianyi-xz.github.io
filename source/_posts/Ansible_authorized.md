title: Ansible 添加ssh授权
tags: Ansible
categories: 自动化
date: 2018-03-19 17:04:00
---
### 生成ssh
```bash
ssh-keygen -t rsa -b 2048 -P '' -f /root/.ssh/id_rsa
```

### 添加主机
```bash
vim hosts
[centos]
10.10.0.129  ansible_ssh_pass=123456
10.10.0.135  ansible_ssh_pass=123456
```
<!-- more -->
### 配置playbook
```yaml
- -- 
- hosts: centos     #执行脚本的主机
  gather_facts: no   #不采集目标系统

  tasks:

  - name: ANSIBLE_HOST_KEY_CHECKING   #不检查key
    command: export ANSIBLE_HOST_KEY_CHECKING=False

  - name: install ssh key
    authorized_key:
      user: root
      state: present
      key: "{{ lookup('file', '/root/.ssh/id_rsa.pub') }}"
```

### 运行
```bash
ansible-playbook -i hosts main.yml 
```
### 参考资料
[我的脚本](https://github.com/Lianyi-xz/ansible-examples/tree/master/auto-key)  
[authorized_key模块](http://docs.ansible.com/ansible/latest/authorized_key_module.html)