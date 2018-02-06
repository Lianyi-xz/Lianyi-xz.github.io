title: Linux firewalld设置
tags: 防火墙
categories: Linux
date: 2018-01-10
---
### firewalld 基本使用
```bash
#启动 
systemctl start firewalld
#停止
systemctl disable firewalld
#查看状态 
systemctl status firewalld 
#重启
systemctl restart firewalld
#禁用 
systemctl stop firewalld
#开机启动
systemctl enable firewalld
#开机禁用
systemctl disable firewalld
#是否开机启动
systemctl is-enabled firewalld
```
<!-- more -->
### 配置firewalld-cmd
```bash
#查看版本
firewall-cmd --version
#查看帮助
firewall-cmd --help
#显示状态
firewall-cmd --state
#查看所有打开的端口
firewall-cmd --zone=public --list-ports
#更新防火墙规则
firewall-cmd --reload
#查看区域信息
firewall-cmd --get-active-zones
#查看指定接口所属区域
firewall-cmd --get-zone-of-interface=eth0
#拒绝所有
firewall-cmd --panic-on
#取消拒绝状态
firewall-cmd --panic-off
#查看是否拒绝
firewall-cmd --query-panic
```
### 端口
```bash
#添加  （--permanent永久生效，没有此参数重启后失效）
firewall-cmd --zone=public --add-port=80/tcp --permanent    
#重新载入
firewall-cmd --reload
#查看
firewall-cmd --zone= public --query-port=80/tcp
#删除
firewall-cmd --zone= public --remove-port=80/tcp --permanent
```
### 服务
```bash
#添加
firewall-cmd --add-service=ftp --zone=public  --permanent
#删除
firewall-cmd --remove-service=ftp --zone=public
#查看服务是否被允许
firewall-cmd --query-service=http --zone=public
```

### 富规则
```bash
#查看
firewall-cmd --list-rich-rules
#添加
 #禁止特定端口访问ssh/22
  firewall-cmd --permanent --zone=public --add-rich-rule="rule family=ipv4 source address='x.x.x.x/24' service name='ssh' drop"
  or
  firewall-cmd --permanent --zone=public --add-rich-rule="rule family='ipv4' source address='x.x.x.x/24' service name='ssh' reject"
  firewall-cmd --permanent --zone=public --add-rich-rule="rule family='ipv4' source address='x.x.x.x/24' port port=22 protocol=tcp reject"
 #允许ip访问 ssh
  firewall-cmd --permanent --zone=public --add-rich-rule="rule family=ipv4 source address='x.x.x.x/24' port port=22 protocol=tcp accept"
#删除
firewall-cmd --remove-rich-rule 'rule family=ipv4 source address=x.x.x.x/24 service name=ftp accept'
```
