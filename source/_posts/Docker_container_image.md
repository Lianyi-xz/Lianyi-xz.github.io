title: Docker Container and Image
tags: Docker
categories: 容器
date: 2018-12-10 11:00:00
---
### 底层技术支持
* Namespaces:做隔离pid,net,ipc,mnt,uts
* Control groups:做资源限制
* Union file systems:Container和image的分层

<!-- more -->
### 镜像Image
#### 镜像简介
* 文件和meta data的集合(root filesystem)
* 分层式(layer)，每一层都可以修改生成新的image
* 不同的image可以共享相同的layer
* Image本身是read-only的
* Base Image:只包含rootfs的基础镜像

#### 获取镜像
```bash
#下载镜像
#Registry地址 <域名/IP>[:端口号]  默认地址是Docker Hub
  docker pull [选项] [Docker Registry地址]<仓库名>:<标签>
  docker pull registry.docker-cn.com/library/ubuntu:14.04

#DockerFile创建镜像

```
#### Base Image制作
```bash
#安装gcc
yum install -y gcc glibc-static
#创建c程序文件
vim hello.c
#include<stdio.h>
int main()
{
  printf("hello docker\n");
}
#编译c程序文件
gcc -static hello.c -o hello
#创建Dockerfile
vi Dockefile
FROM scratch
ADD hello /
CMD ["/hello"]
#build镜像
docker build -t demo/hello-world .
#运行容器
docker run demo/hello-world
```
#### 常用镜像操作
```bash
#上传镜像   将镜像上传到仓库中，许注册
  docker push 
#列出镜像
  docker images
#查看镜像分层
  docker history Repository:Tag
#查看中间层镜像
  docker images -a
#查看部分镜像
  docker images 仓库名 标签 --filter -f  过滤器参数
  docker images -f since/before=mongo:3.2   在mongo3.2镜像之后/之前建立的镜像
#以特定格式显示
  docker images -q
  docker images --format "{{.ID}}: {{.Repository}}"
  docker images --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"
#虚悬镜像
  仓库名和标签均为<none>的镜像
  由于新旧镜像同名，旧镜像名称被取消
  docker rmi $(docker images -q -f dangling=true)   删除虚悬镜像

#查看镜像各层的依赖关系
  https://github.com/justone/dockviz
#移除本地镜像
#删除镜像之前使用 docker rm 删除依赖该镜像的所有容器
  docker rmi   镜像名：标签
```

### 容器
#### 常用容器操作

```bash
#运行容器
  docker run -t -i ubuntu:14.04 /bin/bash
    -t          #分配一个伪终端并与容器绑定  
    -i          #让容器标准输入保持打开
    -d         #在后台运行容器并打印容器ID 守护态运行
    -e         #添加环境变量
    -p         #选择开放端口
    --name  #为容器自定义命名
    --rm      #容器终止后立刻删除，--rm与-d参数不能同时使用
#查看当前容器
  docker container ls
  docker ps 
#获取容器的输出信息
  docker logs [docker names]基于镜像新建容器并启动
#查看所有容器ID
  docker ps -qa
#查看容器名字
  docker inspect -f "{{ .Name }}" 容器ID
#终止容器
  docker stop [CONTAINER ID]
#查看终止状态的容器
  docker ps -a
  docker container ls
#启动已终止容器
    docker start  [CONTAINER ID]
#重启容器
  docker restart
#删除容器
#删除在运行的容器，可以添-f参数
  docker rm 容器
  docker rm $(docker ps -qa)
  docker rm $(docker container ls -f "status=exited" -q)
```
#### 构建Docker镜像
```bash
#容器修改后 通过commit 生成 新的镜像
#不推荐
  docker commit container [repository[:tag]] [flags]

#Dockerfile
  docker image build
```
#### 进入容器

```bash
#exec
  docker exec -it containerid /bin/bash
#attach命令
#当多个窗口同时attach到一个容器的时候，所有窗口都会同步显示
  docker attach [CONTAINER ID/NAMES]
#nsenter命令
#在util-linux包2.23版本后包含，若无需安装
#nsenter 可以访问另一个进程的名字空间，需root权限
  PID=$(docker inspect --format "{{ .State.Pid }}" [CONTAINER ID])
  nsenter --target $PID --mount --uts --ipc --net --pid
```

