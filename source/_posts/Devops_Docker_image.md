title: Docker Image (镜像)
tags: Docker
categories: 运维
---

### 获取镜像
```bash
docker pull [选项] [Docker Registry地址]<仓库名>:<标签>

#Registry地址 <域名/IP>[:端口号]  默认地址是Docker Hub
#仓库名 <用户名>/<软件名>  对于Docker Hub 不给出仓库名默认为Library(官网镜像)
#docker pull registry.docker-cn.com/library/ubuntu:14.04
```
<!-- more -->

### 列出镜像
```bash
#列出顶级镜像
docker images

#列出中间镜像
docker images -a 

#列出部分镜像
docker images 仓库名 标签

# 虚悬镜像
#仓库名和标签均为<none>的镜像
#删除虚悬镜像
docker rmi $(docker images -q -f dangling=true)
```
### 创建镜像
利用DockerFile创建镜像

### 存入和载出镜像
利用仓库来存入和载出镜像

### 删除本地镜像
```bash
#删除镜像之前使用 docker rm 删除依赖该镜像的所有容器
docker rmi   镜像名:标签
```