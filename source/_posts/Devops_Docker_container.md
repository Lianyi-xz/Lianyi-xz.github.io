title: Docker Container (容器)
tags: Docker
categories: 运维
---

### 运行容器
```bash
#基于镜像运行容器
 docker run -t -i ubuntu:14.04 /bin/bash
    #-t   分配一个伪终端并与容器绑定  
    #-i    让容器标准输入保持打开
    #-d   在后台运行容器并打印容器ID
    #--name  为容器自定义命名
    #--rm      容器终止后立刻删除，--rm与-d参数不能同时使用
    #容器是一个服务 运行/bin/bash有将其做虚拟机使用的悬疑。。。 
 
#查看运行容器
docker ps

#查看终止状态容器
docker ps -a

#停止容器
docker stop [CONTAINER ID]

#启动已终止容器
docker start  [CONTAINER ID]

#重启容器
docker restart
```
<!-- more -->

### 进入容器
```bash
#attach命令
#当多个窗口同时attach到一个容器的时候，所有窗口都会同步显示
  docker attach [CONTAINER ID/NAMES]
  
#nsenter命令
#在util-linux包2.23版本后包含，若无需安装
#nsenter 可以访问另一个进程的名字空间，需root权限
  PID=$(docker inspect --format "{{ .State.Pid }}" [CONTAINER ID])
  nsenter --target $PID --mount --uts --ipc --net --pid
```

### 删除容器
```bash
#删除在运行的容器，可以添-f参数
docker rm [CONTAINER ID]
```

### 其它相关命令
```bash
#守护态运行
  #启动时添加 -d 参数

#查看容器名字
  docker inspect -f "{{ .Name }}" [CONTAINER ID]
  
#获取容器的输出信息
  docker logs [docker names]
  
```