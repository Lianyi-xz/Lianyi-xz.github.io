title: Docker 镜像加速器
tags: Docker
categories: 运维
date: 2018-01-30
---
### 常用加速器
```bash
#Docker 官方的中国镜像加速器
https://registry.docker-cn.com
#中国科技大学的镜像加速器
https://docker.mirrors.ustc.edu.cn/
#其它（需登陆）
https://cr.console.aliyun.com/#/accelerator #阿里云加速器
https://www.daocloud.io/mirror#accelerator-doc #DaoCloud加速器
```
<!-- more -->
### Ubuntu 14.04 配置加速器（或其它使用 Upstart 的系统）
1. 
```shell
#编辑配置文件
sudo vim /etc/default/docker

#添加加速器地址
DOCKER_OPTS="--registry-mirror=https://registry.docker-cn.com"

#重启 Docker 引擎
sudo service docker restart

#查看配置
sudo ps -ef | grep dockerd
```


### Ubuntu 16.04 或 CentOS 7 配置加速器（或其它使用 Systemd 的系统）
```shell
#编辑配置文件
sudo vi /etc/systemd/system/multi-user.target.wants/docker.service

#添加加速器地址
ExecStart=/usr/bin/dockerd --registry-mirror=https://registry.docker-cn.com

#重新加载配置并启动服务
sudo systemctl daemon-reload
sudo systemctl restart docker

#查看配置
sudo ps -ef | grep dockerd
```


### 参考资料
[Docker问答录](https://blog.lab99.org/post/docker-2016-07-14-faq.html#ubuntu-14-04-pei-zhi-jia-su-qi-huo-qi-ta-shi-yong-upstart-de-xi-tong "Docker问答录")