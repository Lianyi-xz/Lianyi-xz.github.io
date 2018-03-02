title: Linux 网络配置
tags: OS
categories: Linux
date: 2018-03-02 09:12:00
---
### 网卡命名规则

#### centos6:顺序命名方案
eth0、etho1...

#### centos7:dmidecode采集命名方案
>dmidecode命令：获取主板信息实现网卡名字唯一化

#### 命名格式(enXnnn)

| en     | X | nnn |
| :---:   | :-----:   | :---: |
| ethernet以太网       | 网卡类型     |   MAC地址+主板信息计算出唯一的序列号(数字)    |


<!-- more -->
#### 网卡常见类型
* o:主板板载网卡
* p:独立网卡,PCI网卡
* s:热插拔网卡，USB之类，扩展槽的索引号

### 临时修改ip地址
```bash
#临时修改ip地址
ifconfig  网卡名称 ip netmask 子网掩码
#临时删除ip地址
ifconfig 网卡名称 del ip
```
### 永久修改ip地址
* nmtui 文本框方式修改
* 修改网卡配置文件

#### 临时添加静态路由
```bash
ip route add 0.0.0.0/0 via 172.16.2.253 dev eth0
```
#### 永久添加静态路由
```bash
vim /etc/sysconfig/network-scripts/route-网卡名称

0.0.0.0/0 via 172.16.2.253 dev eth0
```
#### 网络相关配置信息
```bash
#网络进程
systemctl status NetworkManager
#网卡配置文件
/etc/sysconfig/network-scripts/
#dns
/etc/resolv.conf
#host
/etc/hosts
#主机名
/etc/hostname
```