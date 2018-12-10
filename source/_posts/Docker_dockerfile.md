title: Docker DockerFile
tags: Docker
categories: 容器
date: 2018-12-10 11:12:00
---

###	Dockerfile
####	Dockerfile案例
```bash
#简单Dockerfile
vim Dockerfile
  FROM ubuntu
  RUN cd /home && mkdir folder

docker build -t ubuntu-folder .

#传递参数
vim Dockerfile
  FROM ubuntu
  RUN apt-get update && apt-get isntall -y stress
  # entrypoint：运行命令  cmd：接收容器运行时的输入
  ENTRYPOINT ["/usr/bin/stress"]
  CMD [] 
#构建镜像
docker build -t ubuntu-stress .
#创建容器，  --vm 1 --verbose 传递给cmd后作为 /usr/bin/stress的参数
docker run -it ubuntu -stress  --vm 1 --verbose     
```
<!-- more -->
#### Dockerfile 语法梳理及最佳实践
 https://docs.docker.com/engine/reference/builder/  
 https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/  
 https://github.com/docker-library
```bash
#Docker镜像,以scratch为基础镜像，意味着不以任何镜像为基础
#尽量使用官方的景象作为基础镜像
FROM   <image>
FROM scratch
FROM centos
FROM ubuntu:1404

#指定维护者信息
LABEL maintainer="email"
LABEL version="x.x"
LABEL description="this is description"

#定义环境变量    定义当前时区
ENV <key> <value>
ENV LANG C.UTF-8
ENV PATH /usr/local/bin:$PATH
#设置常量
ENV MYSQL_VERSION 5.6

#RUN 下命令都可在shell中运行
#每一个RUN命令都会生成新的一层，复杂的RUN 使用反斜线换行避免无用分层
RUN <command>
RUN ["executable","param1","param2"]
#引用常量
RUN apt-get install -y mysql-server = "${MYSQL_VERSION}" \
	&& rm -rf /var/lib/apt/lists/*    
#WORKDIR
#进入工作目录，若不存在则自动创建
#尽量使用绝对目录
WORKDIR /root

#ADD 和COPY
#将本地文件添加到镜像中的指定目录
#ADD支持解压缩
#大部分情况COPY优于ADD使用
#添加远程文件/目录 使用curl或wget
ADD <src> <dest>
COPY <src> <dest>

#VOLUME 和 EXPOSE	
#存储和网络
#对指定端口开启端口映射 外部可使用映射端口连接到此端口
EXPOSE <port> [<port>...]

#RUN CMD ENTRYPOINT
#RUN: 执行命令并创建新的Image Layer
#CMD:设置容器启动后默认执行的命令和参数
#ENTRYPOINT:设置容器启动时运行的命令

#Shell 格式 Exec格式
CMD echo "hello docker"
CMD ["/bin/echo","hello docker"]

#CMD
#容器启动时默认执行的命令
#如果docker run指定了其它命令，CMD命令被忽略
#如果定义了多个CMD，只有最后一个会执行

#ENTRYPOINT
#让容器以应用程序或者服务的形式运行
#不会被忽略，一定会执行
#最佳实践：写一个shell脚本 作为entrypoint

#镜像发布
#CMD 和 ENTRYPOINT
#使用exec执行，推荐
CMD ["executable","param1","param2"]
#在/bin/sh中执行
CMD command param1 param2
#给ENTRYPOINT  的默认参数     
CMD ["param1","param2"]
#启动时执行的命令
ENTRYPOINT ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisord.conf"]
```