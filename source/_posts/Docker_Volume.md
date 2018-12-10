title: Docker Volume
tags: Docker
categories: 容器
date: 2018-12-10 11:34:00
---
###	Volume
* 数据卷可以在容器之间共享和重用
* 对数据卷的更新，不会影响镜像

#### Volume类型
* 受管理的data Volume，挂载位置由docker后台自动创建
* 绑定挂载的Volume,挂载位置由用户指定

<!-- more -->
#### data Volume
* 通过 -v 参数 定义容器中数据卷的名称
* Dockerfile 中添加VOLUME 参数

```bash
#创建一个容器，挂载volume
docker run -d -v volume_name:container_dir image
docker run -d -v mysql:/var/lib/mysql --name mysql1 -e MYSQL_ALLOW_EMPTY_PASSWORD= true mysql
#查看所有volume
docker volume ls
#查看某volume
docker volume inspect volume_name
#删除volume
docker volume rm volume_name

#编写DockerFile
vim DockerFile
  ……
  VOLUME ["/var/lib/mysql"]
```

#### 挂载主机目录
* 通过 -v 参数定义，本地目录使用绝对路径，若不存在则自动创建
* :ro 指定只读，默认读写

```bash
#挂载文件夹
docker run -d -v os_dir:container_dir image
docker run -d -v /home/docker-nginx:/usr/share/nginx/html -p 80:80 --name web nginx
#挂载主机文件
docker run -it  -v ~/.bash_history:/.bash_history  image /bin/bash
```

#### 第三方存储方案
* 基于plugin

[docker volume plugin](https://docs.docker.com/engine/extend/legacy_plugins/#volume-plugins)

#### 数据卷容器
* 用于在容器之间共享持续更新的数据
* 删除了挂载的容器，数据卷并不会被自动删除
* -volumes-from挂载dbdata容器中的数据卷

```bash
#创建一个数据卷

#创建容器，挂载数据卷
docker run -d --name db1 --volumes-from dbdata  image
```

