title: Docker Network
tags: Docker
categories: 容器
date: 2018-12-10 11:32:00
---

### Docker网络
单机
* Birdge Network:链接到默认bridge网络的容器可以通过ip地址相互通信
* Host Network:主机的网络堆栈，主机与容器之间无隔离
* None Network: 特定容器的网络栈，缺少网络接口

多机  
* Overlay

<!-- more -->
#### Linux 命名空间(Network Namespace)
>  一个命名空间 就是一个虚拟局域网

```bash
#查看网卡信息
ip a
#查看当前命名空间
ip netns list
#创建一个虚拟命令空间
ip netns add name_1
#删除一个虚拟命名空间
ip netns delete name_1
#查看一个虚拟命令空间 网卡信息
ip netns exec name_1 ip a
#进入虚拟命名空间内部
ip netns exec name_1 bash
#激活虚拟命令空间内部的环回口
ip netns exec name_1 ip link set dev lo up

#创建两个 相通的 网卡
ip link add veth-test1 type veth peer name veth-test2
#将网卡 挂载到相应的命名空间中
sudo ip link set veth-test1 netns test1
sudo ip link set veth-test2 netns test2
#为网卡配置ip地址
sudo ip netns exec test1 ip addr add 192.168.1.1/24 dev veth-test1
sudo ip netns exec test2 ip addr add 192.168.1.2/24 dev veth-test2
#开启网卡
sudo ip netns exec test1 ip link set dev veth-test1 up
sudo ip netns exec test2 ip link set dev veth-test2 up
#test1 ping test2
sud0 ip netns exec test1 ping 192.168.1.2s
```
#### Docker Network 常用命令
```bash
#查看现有网络
docker network ls
#查看某网络详细信息
docker network inspect network_id
#创建bridge网络
 docker network create --subnet=192.168.0.0/16 --driver bridge network_id
#容器断开网络
docker network disconnect network_id  container_id
#删除网络
docker network rm network_id

#禁用默认网桥
#将以下内容添加到daemon.json,仅适用Docker守护进程在Linux主机上运行，高级选项。
  "bridge":"none",
  "iptables":"false"
                      
```

#### Docker Bridge详解
```bash
#创建容器
docker run -d --name test1  busybox /bin/sh -c "while true; do sleep 3 600; done"
docker run -d --name test2  busybox /bin/sh -c "while true; do sleep 3 600; done"
#创建网络 bridge1
docker network create -d bridge --subnet 172.25.0.0/16 bridge1
#容器2连接到网络
docker network connect bridge1 test2
docker network inspect bridge1
#创建指定网络和IP的容器
docker run --network=bridge1 --ip=172.25.3.3 -d --name test3  busybox /bin/sh -c "while true; do sleep 3 600; done"
```
#### 容器之间的link
```bash
#通常不使用该方法
#创建一个容器
docker run -d --name test1  busybox /bin/sh -c "while true; do sleep 3 600; done"
#创建另一个容器 link到该容器
docker run -d --name test2 --link test1 busybox /bin/sh -c "while true; do sleep 3 600; done"
#test2容器可通过ip 和容器名访问test1
#test1容器只能通过ip访问test2
```
#### 容器的端口映射
```bash
#启动容器时使用-P -p参数指定端口映射
  -P:随机映射49000~49900 的端口到内部容器开放的网络端口
  -p:指定主机端口与 容器端口
  -p 8001-8010：8001-8010      -p参数可以用范围

#映射格式
#映射所有接口地址
  hostPort:containerPort
#映射到指定地址的指定端口
  ip:hostPort:containerPort               #主机ip:主机端口:容器端口
#映射到指定地址的任意端口
  ip::containerPort

#查看映射端口配置
  docker port container
```
#### 容器网络之host 和none
```bash
#host: 容器直接使用主机地址
docker run  --network=host -d --name test1  busybox 
#none：容器不使用网络
docker run  --network=none -d --name test1  busybox 
```
 
#### 同机器多容器应用的部署
```bash
#web+redis
vim app.py
  from flask import Flask
  from redis import Redis
  import os
  import socket

  app = Flask(__name__)
  redis = Redis(host=os.environ.get('REDIS_HOST', '127.0.0.1'), port=6379)

  @app.route('/')
  def hello():
      redis.incr('hits')
      return 'Hello Container World! I have been seen %s times and my hostname is %s.\n' % (redis.get('hits'),socket.gethostname())

  if __name__ == "__main__":
      app.run(host="0.0.0.0", port=5000, debug=True)

vim Dockerfile
  FROM python:2.7
  LABEL maintaner="xx@xx.com" 
  COPY . /app
  WORKDIR /app
  RUN pip install flask redis
  EXPOSE 5000
  CMD [ "python", "app.py" ]
#创建flask镜像
docker build -t flask-redis .
#启动Redis容器
docker run -d --name redis redis
#启动flask容器
docker run -d --link redis --name flask-redis -e REDIS_HOST=redis flask-redis
#测试
curl 127.0.0.1:5000
curl 172.17.0.3:5000
```
#### 多机容器通信(overlay和etcd)
* overlay网络需要有效的键值存储服务(Consul、Etcd、ZooKeeper分布式存储)
* swarm模式下运行的管理节点上创建overlay网络，无需外部键值存储

##### 创建 etcd cluster

###### etcd 配置项说明

```bash
--name			#etcd集群中的节点名，这里可以随意，可区分且不重复就行  
--listen-peer-urls		#监听的用于节点之间通信的url，可监听多个，集群内部将通过这些url进行数据交互(如选举，数据同步等)
--initial-advertise-peer-urls 		#建议用于节点之间通信的url，节点间将以该值进行通信。
--listen-client-urls		#监听的用于客户端通信的url,同样可以监听多个。
--advertise-client-urls		#建议使用的客户端通信url,该值用于etcd代理或etcd成员与etcd节点通信。
--initial-cluster-token etcd-cluster-1	#节点的token值，设置该值后集群将生成唯一id,并为每个节点也生成唯一id,当使用相同配置文件再启动一个集群时，只要该token值不一样，etcd集群就不会相互影响。
--initial-cluster		#也就是集群中所有的initial-advertise-peer-urls 的合集
--initial-cluster-state new		#新建集群的标志

```
###### 配置etcd
```bash
#docker-node1
wget https://github.com/coreos/etcd/releases/download/v3.0.12/etcd-v3.0.12-linux-amd64.tar.gz
tar zxvf etcd-v3.0.12-linux-amd64.tar.gz
cd etcd-v3.0.12-linux-amd64
nohup ./etcd --name docker-node1 --initial-advertise-peer-urls http://192.168.205.10:2380 \
  --listen-peer-urls http://192.168.205.10:2380 \
  --listen-client-urls http://192.168.205.10:2379,http://127.0.0.1:2379 \
  --advertise-client-urls http://192.168.205.10:2379 \
  --initial-cluster-token etcd-cluster \
  --initial-cluster docker-node1=http://192.168.205.10:2380,docker-node2=http://192.168.205.11:2380 \
  --initial-cluster-state new&

#docker-node2
wget https://github.com/coreos/etcd/releases/download/v3.0.12/etcd-v3.0.12-linux-amd64.tar.gz
tar zxvf etcd-v3.0.12-linux-amd64.tar.gz
cd etcd-v3.0.12-linux-amd64/
nohup ./etcd --name docker-node2 --initial-advertise-peer-urls http://192.168.205.11:2380 \
  --listen-peer-urls http://192.168.205.11:2380 \
  --listen-client-urls http://192.168.205.11:2379,http://127.0.0.1:2379 \
  --advertise-client-urls http://192.168.205.11:2379 \
  --initial-cluster-token etcd-cluster \
  --initial-cluster docker-node1=http://192.168.205.10:2380,docker-node2=http://192.168.205.11:2380 \
  --initial-cluster-state new&
```
###### 检查cluster状态
```bash
cd etcd-v3.0.12-linux-amd64/
./etcdctl cluster-health
  member 21eca106efe4caee is healthy: got healthy result from http://192.168.205.10:2379
  member 8614974c83d1cc6d is healthy: got healthy result from http://192.168.205.11:2379
  cluster is healthy
```
###### 重启docker服务
```bash
#docker-node1
sudo service docker stop
sudo /usr/bin/dockerd -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock --cluster-store=etcd://192.168.205.10:2379 --cluster-advertise=192.168.205.10:2375&

#docker-node2
sudo service docker stop
sudo /usr/bin/dockerd -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock --cluster-store=etcd://192.168.205.11:2379 --cluster-advertise=192.168.205.11:2375&
```

##### 创建overlay network

```
#docker-node1
#创建overlay网络
sudo docker network create -d overlay demo
#查看当前所有网络
sudo docker network ls
#查看overlay网络详细信息
sudo docker network inspect demo

#docker-node2
#查看当前所有网路  overlay网络会被同步创建
sudo docker network ls
```

###### 查看etcd的key-value,

```bash
cd etcd-v3.0.12-linux-amd64
#查看docker 信息
 ./etcdctl ls /docker
  /docker/network
  /docker/nodes
#查看节点信息
./etcdctl ls /docker/nodes
  /docker/nodes/192.168.205.11:2375
  /docker/nodes/192.168.205.10:2375
#查看网络信息
./etcdctl ls /docker/network/v1.0/network
  /docker/network/v1.0/network/3d430f3338a2c3496e9edeccc880f0a7affa06522b4249497ef6c4cd6571eaa9
./etcdctl get /docker/network/v1.0/network/3d430f3338a2c3496e9edeccc880f0a7affa06522b4249497ef6c4cd6571eaa9 |python -m json.tool
```
##### 创建连接demo网络的容器
```bash
#docker-node1
#创建容器，并使用overlay网络demo
sudo docker run -d --name test1 --net demo busybox sh -c "while true; do sleep 3600; done"
#查看test1 网卡信息
sudo docker exec test1 ip a

#docker-node2
#创建容器，并使用overlay网络demo
sudo docker run -d --name test2 --net demo busybox sh -c "while true; do sleep 3600; done"
#查看test2 网卡信息
sudo docker exec test2 ip a

#验证连通性。
sudo docker exec test2 sh -c "ping 10.0.0.3"
sudo docker exec test2 sh -c "ping 10.0.0.2"
```

