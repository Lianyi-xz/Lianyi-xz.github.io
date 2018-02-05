title: Docker Swarm 实验
tags: Docker
categories: 运维
---

### 基本环境
  * manager：10.10.0.132
  * work1：10.10.0.133
  * work2：10.10.0.134
  
### 创建swarm
```bash
  docker swarm init --advertise-addr 10.10.0.132      #初始化Docker引擎集群
  docker info                                         #查看swarm状态
  docker node ls                                      #查看swarm相关节点
  docker swarm ca --rotate                            #生成新的CA证书和密钥
```
<!-- more -->

### swarm中添加节点
```bash
  docker swarm join-token worker                      #检索worker的添加命令
  docker swarm join-token  --rotate worker            #生成新的worker令牌
  docker swarm join-token manager                     #检索manager的添加命令
  docker node promote <node name>                     #工作节点提升为管理节点
  docker node demote   <node name>                    #管理节点降级为工作节点
  docker swarm join \                                 #添加工作节点到swarm
       --token SWMTKN-1-34lurdcnbjpbxszzi47gw2l8hbjdzy7vjzcxe38ay776pbe8lj-9ao0aojs37006socamuioe3ht  \
      10.10.0.132:2377
```

### 查看节点信息
```bash
  docker node inspect node_id
  docker node inspect --pretty node_id
  docker swarm leave                                     #离开swarm
```

### 部署应用服务
```bash
  docker service create \ 
   --replicas 1 \              #在一个容器上运行服务           
   --name hello \              #服务名称
   centos  \                   #服务所使用镜像，不加标签 默认使用 laster镜像，服务运行节点需存在镜像
   ping 10.10.0.134            #容器运行的服务 
```

### 查看swarm运行服务
```bash
  docker service inspect service_name                    #查看服务详细信息
  docker service inspect --pretty service_name
  docker service ps service_name                         #查看服务在那些节点运行
```

### 修改服务运行容器数量
```bash
  docker service scale <SERVICE-ID>=<NUMBER-OF-TASKS>
```

### 删除服务
```bash
  docker service rm service_name
```

### 服务更新
```bash
  docker service update <SERVICE-ID>
```

### 服务滚动更新(创建服务时添加)
```bash
  --update-delay 10s               配置更新服务任务或任务组之间的时间延迟
  --update-parallelism             配置调度程序同时更新的最大服务任务数。
```

### 排空一个节点
```bash
  docker node update --availability drain <NODE-ID>
```

### 发布服务端口
```bash
  docker service create --name ser_name  --publish published=主机端口,target=容器端口  image
```

### 发布现有服务端口
```bash
  docker service update  --publish-add published=主机端口,target=容器端口 service_name
```

### 查看服务发布端口
```bash
  docker service inspect --format="{{json .Endpoint.Spec.Ports}}"  service_name
```

### 仅发布udp端口
```bash
  --publish published=53,target=53,protocol=udp
  -p 53:53/udp
```

