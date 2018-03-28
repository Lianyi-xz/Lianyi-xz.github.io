title: Ansible 常用模块
tags: Ansible
categories: 运维
date: 2018-03-15 09:04:00
---

### service(服务管理)
>控制远程主机上的服务

```bash
#常用参数
enabled
  yes   #开机自启动
  no
state
  started #启动服务
  stopped
  restarted
  reloaded

#centtos7查看服务列表
systemctl list-unit-files
```
<!-- more -->
## yum/apt(软件管理)
>安装/卸载软件包

```bash
#常用参数
name #软件包名称
state
  present #安装
  installed 
  latest
  absent
  removed  #移除
```
### mysql_*(数据库管理)
* mysql_db：从远程主机添加或删除MySQL数据库
* mysql_replication： MySQL复制
* mysql_user：MySQL复制
* mysql_variables： MySQL全局变量

### lineinfile
> 确保某个特定的行位于文件中，或使用反向引用的正则表达式替换现有的行

### firewalld
> 管理任意端口/服务 防火墙

### setup
>获取目标系统信息

```bash
#常用变量
ansible_distribution           #系统版本相关
ansible_distribution_release
ansible_distribution_version
ansible_fqdn                   #主机名
ansible_hostname
ansible_os_family             
ansible_pkg_mgr               #包管理方式
ansible_default_ipv4.address
ansible_default_ipv6.address
```
### file
> 文件管理

### template
> 将文件模板输出到远程服务器

### copy
>  将文件复制到远程位置

### 参考资料
[Ansible模块](http://docs.ansible.com/ansible/latest/list_of_all_modules.html)  