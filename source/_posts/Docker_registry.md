title: Docker Registry(私有仓库)
tags: Docker
categories: 容器
date: 2018-01-30
---
> Registry:官方提供用于构建私有镜像仓库的工具  

### Registry 基本配置
```bash
  docker run -d
    -e REGISTRY_HTTP_ADDR =0.0.0.0:5001        #registry侦听容器内的5001端口
    -p 5001:5001                               #主机端口:容器内端口     
    --name                                     #设置容器名称
    --restart=always                           #为registry配置重新启动策略
    -v /mnt/registry:/var/lib/refistry         #主机目录:容器目录  设置目录挂载
    registry:2                                                                                                                                                                                                             registry镜像名
```
<!-- more -->

### 运行 Registry
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
```

### 参考资料
[官方文档](https://docs.docker.com/registry/)  
[开启https](https://docs.docker.com/registry/deploying/#get-a-certificate)  
[基本认证](https://docs.docker.com/registry/deploying/#native-basic-auth)  
[使用Compose文件部署registry](https://docs.docker.com/registry/deploying/#deploy-your-registry-using-a-compose-file)