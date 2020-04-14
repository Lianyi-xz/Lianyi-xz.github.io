title: Redis 集群安装
tags: 数据库
categories: 运维
date: 2019-02-11 17:28:00
---
> redis 若使用root用户启动，可对服务器进行提权
### 架构
| 主机名 | ip | port |操作系统 | 用途 | 备注 |
| :---: | :---: | :---: | :---: | :---: | :---: |
| redis01 | 172.16.1.61 | 6379,6380,6381 | centos 7  | gitlab | 192.168.116.137 | 
| redis02 | 172.16.1.62 | 6379,6380,6381 | centos 7  | gitlab | 192.168.116.148 | 
| redis03 | 172.16.1.63 | 6379,6380,6381 | centos 7  | gitlab | 192.168.116.149 | 

### 安装redis
```bash 
yum install gcc -y
wget http://download.redis.io/releases/redis-5.0.3.tar.gz
tar xzf redis-5.0.3.tar.gz
cd redis-5.0.3
mkdir /usr/local/redis
mkdir /usr/local/redis/data1
mkdir /usr/local/redis/data2
make && make  install 
```
<!-- more -->
### redis启动
```bash
#启动redis服务器端
redis-server
#关闭redis 客户端
#重启服务
service redis restart
#检查是否启动
redis-cli 
ping
```
### 设置配置文件
```bash
#复制配置文件
cp /root/redis-5.0.3/redis.conf /usr/local/bin/redis.conf
#编辑配置文件
vi /usr/local/bin/redis.conf
#设置绑定网卡
bind 172.16.1.61
#设置绑定端口
port 6379
#开启后台运行
daemonize yes
#数据目录和数据库写入目录
dir /usr/local/redis/data1/
#pid存在位置
pidfile /var/run/redis_6379.pid
#记录日志信息
logfile "/var/log/redis/redis_6379.log"
#设置redis密码
requirepass yourpassword 
#配置cluster集群
cluster-enabled yes
cluster-config-file nodes-6379.conf
cluster-node-timeout 15000
appendonly yes
 

#运行redis
redis-server /usr/local/bin/redis.conf
```

### 搭建redis cluster(数据分片)集群
```bash
#创建节点文件夹
mkdir /usr/local/redis/redisc1
mkdir /usr/local/redis/redisc2
#复制数据文件
cd /usr/local/bin/
cp * /usr/local/redis/redisc1/
cp * /usr/local/redis/redisc2/
#编辑配置文件
#启动redis
redis-server /usr/local/redis/redisc1/redisc1.conf
redis-server /usr/local/redis/redisc2/redisc2.conf
#redis 最少三个主节点三个从节点
#redis5之后无需额外安装ruby
redis-cli --cluster create 172.16.1.61:6379 172.16.1.62:6379 172.16.1.63:6379 172.16.1.61:6380 172.16.1.62:6380 172.16.1.63:6380  --cluster-replicas 1
```

### 搭建 redis sentinel(哨兵)集群
```bash

#编辑从库文件
vi  /usr/local/redis/rediss1/rediss1.conf
#配置主服务的ip和端口
replicaof 172.16.1.61 6381
#主服务器密码
masterauth <master-password>
#配置从服务默认为只读模式
replica-read-only：yes
#启动redis
redis-server /usr/local/redis/rediss1/rediss1.conf

#复制哨兵文件
cp /root/redis-5.0.3/sentinel.conf /usr/local/redis/rediss1/
#监视集群主节点
sentinel monitor mymaster 172.16.1.61 6381 2
#后台运行
daemonize yes
#启动哨兵
redis-sentinel /usr/local/redis/rediss1/sentinel.conf
```
### 出现问题
>tcl太久

```bash
wget http://downloads.sourceforge.net/tcl/

-src.tar.gz
tar xzvf tcl8.6.1-src.tar.gz
cd tcl8.6.1/unix/
./configure
make && make install
```

### 参考文档
[redis下载地址](http://redis.io/download)  
[redis集群文档](https://redis.io/topics/cluster-tutorial)  
