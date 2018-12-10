title: Docker Registry(私有仓库)
tags: Docker
categories: 容器
date: 2018-11-08
---
> Registry:官方提供用于构建私有镜像仓库的工具  

### 镜像发布
#### Dockerhub
```bash
#发布到dockerhub中
#先注册，需翻墙
docker login

#查找官方仓库中的镜像
docker search  
#上传docker image
docker push  [OPTIONS] NAME[:TAG]
#下载docker image
docker pull  [OPTIONS] NAME[:TAG]

#上传dockfile
#Create-Create Automated Build -Link Accounts-连接到代码库

```
#### 本地库
 ```bash
#下载registry镜像
  docker pull registry.docker-cn.com/library/registry:2
  docker tag registry.docker-cn.com/library/registry:2 registry:2  标记镜像 
#启动registry镜像
  docker run -d -p 5000:5000 --name registry registry:2
#标记镜像，指向本地registry
  docker tag lianyi/ubuntu:v1.0 localhost:5000/ubuntu:v1.0
#推送镜像到本地registry
  docker push localhost:5000/ubuntu:v1.0
#删除本地缓存 images
  docker image rm localhost:5000/ubuntu:v1.0
#关闭本地registry 并删除所有数据
  docker stop registry && docker rm -v registry

#基本配置
  docker run -d
    -e REGISTRY_HTTP_ADDR =0.0.0.0:5001        #registry侦听容器内的5001端口
    -p 5001:5001                                                #主机端口:容器内端口     
    --name                                                         #设置容器名称
    --restart=always                                           #为registry配置重新启动策略
    -v /mnt/registry:/var/lib/refistry                      #主机目录:容器目录  设置目录挂载
    registry:2                                                      #registry镜像名
```


### 参考资料
[官方文档](https://docs.docker.com/registry/)   
[Docker —— 从入门到实践](https://doc.yonyoucloud.com/doc/docker_practice/repository/config.html)  
[Registry配置清单](https://docs.docker.com/registry/configuration/#override-specific-configuration-options)  
[Registry 设置TLS证书](https://docs.docker.com/registry/deploying/#get-a-certificate)  
[Registry自签名证书](https://docs.docker.com/registry/insecure/#deploy-a-plain-http-registry)  
[Registry 基本身份认证](https://docs.docker.com/registry/deploying/#native-basic-auth)  
[Compose 设置Registry](https://docs.docker.com/registry/deploying/#deploy-your-registry-using-a-compose-file)  