title: Docker CE 安装
tags: Docker
categories: 运维
---
> 安装步骤仅为参考，疑问请参考官方文档

### 系统要求
* Zesty 17.04
* Xenial 16.04 (LTS)
* Trusty 14.04 (LTS)

### 卸载旧版本Docker
```shell
sudo apt-get remove docker <!-- more -->docker-engine docker.io
```

### 更换默认存储驱动程序
Docker默认使用`overlay2`，官方建议替换为`aufs`，在此未作配置修改。


### 安装Docker CE
```shell
#更新包索引
sudo apt-get update

#安装软件包,以允许apt通过HTTPS使用存储库
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

#添加Docker的官方GPG密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

#设置软件源信息
sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"

#更新并安装Docker CE
sudo apt-get -y update
sudo apt-get -y install docker-ce
```

### 安装指定版本的Docker CE 
```shell
#查找Docker-CE的版本
apt-cache madison docker-ce

#安装指定版本的Docker CE
sudo apt-get -y install docker-ce=[VERSION]
```

### docker授权
```shell
#将操作 docker 用户，加入 docker 组，为该用户赋予操作 docker 的权限
sudo usermod -aG docker $USER
```

### 参考文档
[Docker Guides](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#install-from-a-package "Docker Guides")  
[Aliyun Docker CE 镜像源站](https://yq.aliyun.com/articles/110806 "Docker CE 镜像源站")  
[Docker Guides AUFS storage](https://docs.docker.com/engine/userguide/storagedriver/aufs-driver/ "Docker Guides AUFS storage")