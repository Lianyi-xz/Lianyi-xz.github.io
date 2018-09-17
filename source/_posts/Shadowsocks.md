title: Shadowsocks代理服务器
tags: VPN
categories: Linux
date: 2018-09-17 11:28:00
---
### 简介
  http代理服务器，可用来连接INTERNET（国际互联网）和Local Area Network（局域网）
### 云服务器
  [阿里云ECS](https://www.aliyun.com/product/ecs?spm=5176.224200.selected.1.61926ed6RFeQql)  
  [搬瓦工VPS](https://bwh1.net/)  
### 安装shadowsocks
#### Centos平台
```bash
yum install python-setuptools && easy_install pip
pip install shadowsocks
```
#### Ubuntu平台
```bash
apt-get update
apt-get install python-pip
pip install shadowsocks
```
<!-- more -->
### 修改配置信息
```bash
vim /etc/shadowsocks.json
{
    "server":"0.0.0.0",                  #服务器 IP地址 (IPv4/IPv6)
    "server_port":1080,                   #服务器监听的端口
    "local_address": "127.0.0.1",
    "local_port":1080,
    "password":"Shadows_passwd",        #密码，自定义
    "timeout":300,
    "method":"aes-256-cfb",              #加密方法，可选择 “aes-256-cfb”, “rc4-md5”等等
    "fast_open": false                     #Linux 内核在3.7+，可以开启 fast_open 以降低延迟
} 
```
### 启动shadowsocks
```bash
#运行shadowsock
sssserver -c /etc/shadowsocks.json -d start
#查看shadowsocks进程命令
netstat -ntlp | grep 1080
```
 ### Ubuntu平台设置开机自启动
```bash
Vim /etc/rc.local 
ssserver -c /etc/shadowsocks.json -d start
```
### 使用方式
* 下载ShadowsocksR客户端
* 填写服务器ip、密码、端口
### 参考资料
[GitHub](https://github.com/shadowsocks/shadowsocks/tree/master)  