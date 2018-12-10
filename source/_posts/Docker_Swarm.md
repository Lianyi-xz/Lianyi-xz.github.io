title: Docker Swarm
tags: Docker
categories: 容器
date: 2018-12-10 11:38:00
---
### swarm概念
* swarm是由多个以swarm模式运行的Docker主机组成
* Docker主机分为管理者(管理成员和委托)和工作者(运行swarm服务)
* 修改服务配置，无需重新启动服务
* 可在任何Docker主机以及swarm服务商运行独立容器
* 可以定义并运行swarm服务

<!-- more -->
##### 节点
* docker引擎参与swarm的一个实例，可视为Docker节点
* 可在单台物理计算机或云服务器上运行一个或多个节点
* 生产swarm部署通常包括分布在多台物理机和云计算机上的Docker节点
* 若将应用程序部署到swarm，需要将服务定义提交给管理节点，管理节点将称为任务的工作单元分配给工作节点
  
##### 服务和任务
* 服务是任务的定义，在管理或工作节点执行
* 创建服务时，指定使用那个容器镜像以及在运行容器中执行那些命令
* 对于复制服务模型，swarm管理器根据所需状态中设置的比例在节点之间分配指定数量的副本任务
* 对于全局服务，swarm在集群中的每个可用节点上运行一项服务任务
* 一个任务携带Docker容器和在容器内运行的命令，是swarm的原子调度单位。
* 管理器节点根绝服务规模中设置的副本数量将任务分配给工作节点，一旦任务分配给一个节点，他就不能移动到另一个节点，只能在分配的节点上运行或失败

##### 负载均衡
* swarm管理器使用入口负载均衡来暴露对swarm外部提供的服务
* swarm管理器可自动将服务分配给一个PublishedPort(30000-32767)，可配置
* 外部组件可以访问swarm中任何节点的已发布端口上的服务
* Swarm模式有一个内部的DNS组件，可以自动为swarm中的每个服务配置一个DNS条目

####	Swarm基本使用
```bash
#创建swarm集群
docker swarm init --advertise-addr  <ip|interface>[:port]
#检索添加到swarm的token
docker swarm join-token worker
docker swarm join-token manager
#修改添加到swarm的token
docker swarm join-token  --rotate worker
docker swarm join-token  --rotate manager
#添加节点到swarm
docker swarm join  --token TOKEN  <ip|interface>[:port]
#工作节点提升为管理节点
docker node promote <node name>
#管理节点降级为工作节点
docker node demote   <node name>
#生成新的CA证书和密钥
docker swarm ca --rotate 

#创建service
docker service create --help
docker service create --name ser_name \ 	#service名称
	--network demo \ 	#连接网络
	--mount type=volume,source=mydata,destination=/data/mydata \	#挂载volumes
	--update-delay 10s \	#配置更新服务任务或任务组之间的时间延迟
	--update-parallelism \	#配置调度程序同时更新的最大服务任务数
	--publish published=os_port,target=ser_port  \	#发布服务端口
	images
#service扩展(创建5个service，分布在各个节点上)
doker service scale service_name=5
#服务滚动更新(创建服务时添加)
	--update-delay 10s               配置更新服务任务或任务组之间的时间延迟
	--update-parallelism             配置调度程序同时更新的最大服务任务数。
#发布服务端口
docker service create --name ser_name  --publish published=主机端口,target=容器端口  image
#发布现有服务端口
docker service update  --publish-add published=主机端口,target=容器端口 service_name
#查看服务发布端口
docker service inspect --format="{{json .Endpoint.Spec.Ports}}"  service_name
#仅发布udp端口
	--publish published=53,target=53,protocol=udp
	-p 53:53/udp
#服务更新
docker service update <SERVICE-ID>

#查看帮助信息
docker swarm --help
#查看swarm状态
docker info
#查看swarm节点
docker node ls
#查看节点信息
docker node inspect node_id
docker node inspect --pretty node_id
#查看所有service
docker service ls
#查看service详细情况
docker service ps service_name
#查看service在那些节点运行
docker service ps service_name      
#查看服务详细信息
docker service inspect service_name                       
docker service inspect --pretty service_name

#删除服务
docker service rm service_name
#排空一个节点
docker node update --availability drain <NODE-ID>
#离开swarm
docker swarm leave
```
#### 搭建三节点swarm集群
```bash
#概况
  manager：192.168.205.14
  work1：192.168.205.15
  work2：192.168.205.16
#初始化Docker引擎集群,初始化节点为manager节点
  docker swarm init --advertise-addr 192.168.205.14  
                         
#swarm中添加节点
  docker swarm join --token SWMTKN-1-0o1d3nqta7gu95d0z1lfxeswvviu9y2cbtajpkcqnpztsrx4j8-0vih2anv0sjn5bka5shqj4fvy 192.168.205.14:2377
```

#### Service的创建维护和水平扩展
* swarm创建的service会部署到各个节点中

```bash
#查看创建方法
docker service create --help

#创建service
docker service create --name service_name images
#service扩展(创建5个service，分布在各个节点上)
doker service scale service_name=5
```

#### Swarm集群部署wordpress
```bash
#创建overlay网络
docker network create -d overlay demo
#创建mysql
docker service create --name mysql \
    --env MYSQL_ROOT_PASSWD=root \
    --env MYSQL_DATABASE=wordpress \
    --network demo \
    --mount type=volume,source=mysql-data,destination=/var/lib/mysql \
    mysql
#创建wordpress
docker service create --name wordpress \
    -p 80:80 \
    --env WORDPRESS_DB_PASSWORD=root \
    --env WORDPRESS_DB_HOST=mysql \
    --netowork demo \
    wordpress
```

#### 集群服务间通信之RouingMesh
* swarm中所有service都会分配一个VIP(虚拟ip)
* Internal:Container和Container之间的访问通过overlay网络(通过VIP)
* Ingress：如果服务有绑定接口，则此服务可以通过任意swarm节点的相应接口访问

#### RoutingMesh之Ingress Network负载均衡
* 外部访问的负载均衡
* 服务端口被暴露到各个swarm节点
* 内部通过IPVS进行负载均衡
* host --(default_gwbridge)--> Ingress-sbox --(IPVS)--> Ingress Network --(vxfan turnner with vni)--> Ingress Network ----> Container-sbox

```bash
#查看service运行情况
docker service ps ser_name
#查看逻辑网桥接口
brctl show
#查看gwbridge网络详情
docker network inspect docker_gwbridge
#查看docker网络
sudo ls /var/run/docker/netns
#进入ingress_sbox
sudo nsenter --net=/var/run/docker/netns/ingress_sbox
#查看ingress_sbox网卡信息
ip a

```
#### DockerStack部署wordpress
* 编写DockerCompose 文件添加deploy参数，使用docker stack命令部署
* 只能用于Swarm 集群
* 只能使用images 不能使用DockerFile

```bash
#编写DockerCompose文件
#部署wordpres
docker stack deploy wordpress --compose-file=docker-compose.yml
#查看当前 stack
docker stack ls
#查看某stack详细信息
docker stack ps NAME
#关闭stack
docker stack rm NAME
#stack中services扩展
docker stack scale wordpress_web=5
```
[Docker Compose 部署文档](https://docs.docker.com/compose/compose-file/#deploy)  

#### DockerSecret管理和使用
* 用户名密码
* SSH Key
* TLS认证
* 任何不像让别人看到的数据

##### Secret Management
* 存在Swarm Manager节点Raft database中
* Secret可以assign给一个service，这个Service就能看到这个Secret
* 在container内部Secret看起来像文件，但实际是在内存中

##### 创建Secret
```bash
#文件创建secret
vim secret_file_name
  Aa123456
#创建secret
docker secret create secret_name secret_file_name
#标准输入创建secret
echo "Aa123456"  | docker secret create  secret_name -

#查看服务器上secret
docker secret ls
#查看secret 详细信息
docker inspect 
#删除secret文件
docker secret rm secret_file_name
```
##### 使用Secret
```bash
#创建service并使用secret,可传入多个secret
docker service create --name client --secret secret_name busybox sh -C "while ture,do sleep 3600; done"
#查看容器信息
docker ps
#进入容器中
docker exec -it container_name sh
#查看secret文件
cat /run/secrets/secret_name
```

#### DockerSecret在Stack中的使用
```bash
version: '3'

services:

  web:
    image: wordpress
    ports:
      - 8080:80
    secrets:
      - my-pw
    environment:
      WORDPRESS_DB_HOST: mysql
      WORDPRESS_DB_PASSWORD_FILE: /run/secrets/my-pw
    networks:
      - my-network
    depends_on:
      - mysql
    deploy:
      mode: replicated
      replicas: 3
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      update_config:
        parallelism: 1
        delay: 10s

  mysql:
    image: mysql
    secrets:
      - my-pw
    environment:
      MYSQL_ROOT_PASSWORD_FILE: /run/secrets/my-pw
      MYSQL_DATABASE: wordpress
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - my-network
    deploy:
      mode: global
      placement:
        constraints:
          - node.role == manager

volumes:
  mysql-data:

networks:
  my-network:
    driver: overlay
#如果secret没有创建则需要创建secrets(不推荐)。
# secrets:
#   my-pw:
#    file: ./password
```
#### Service更新
* 运行中更新
* 生产环境更新

```bash
#创建overlay网络
docker network create -d overlay demo
#创建一个service
docker service create --name web \
	--publish 8080:5000 \
	--network demo \
	python-flash-demo:1.0
#扩展多个service，更新时确保总要有service提供服务
docker service scale web=2
#查看更新service 帮助 
docker service update --help
#更新image,两个service会依次更新
docker service update --image python-flash-demo:2.0 web
#端口更新
docker service update --publish-rm 8080:5000 --publish-add 8088:5000 web
#stack更新
#deploy中添加update_config参数
#先stack deploy 在修改compose文件，最后stack deploy实现更新
```