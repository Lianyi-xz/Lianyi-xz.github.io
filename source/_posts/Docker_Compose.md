title: Docker Compose
tags: Docker
categories: 容器
date: 2018-12-10 11:34:00
---
### Docker Compose
* 多用于本地开发
* Services
* Netwotks
* Volumes

#### Services
* 一个Services代表一个container
* container可以来自DockerHub或DockerFile的image
* Service的启动类似docker run,可指定Network和Volume

<!-- more -->
#### Docker Compose安装
```bash
#更新curl
sudo yum update -y nss curl libcurl
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```
[Compose官方安装文档](https://docs.docker.com/compose/install/#prerequisites)
#### Docker Compose基本使用
```bash
#查看版本
docker-compose --version
#启动容器
docker-compose \
  -f docker-compose.yml  \ #选择使用的文件
  -d \ 	#后台执行
  --scale SERVICE=NUM \  #设置services数量
  up
#查看services
docker-compose ps
#关闭/开启/删除services
docker-compose stop/start/down 
#查看使用的images
docker-compose images
#进入services
docker-compose exec services_name bash
#build 文件中的Dockerfile
docker-compose -f docker-compose.yml build
```
#### Compose简单案例
```bash
vim docker-compose.yml
version: '3'

services:

  wordpress:
    image: wordpress
    ports:
      - 8080:80
    environment:
      WORDPRESS_DB_HOST: mysql
      WORDPRESS_DB_PASSWORD: root
    networks:
      - my-bridge

  mysql:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: wordpress
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - my-bridge

volumes:
  mysql-data:

networks:
  my-bridge:
    driver: bridge
#运行compose
docker-compose up
docker-compose -f docker-compose.yml up

```
#### 水平扩展和负载均衡
* 水平扩展的service不能设置ports,否则在创建第二个service时会报端口已占用错误 
* 水平扩展的service监听本地的端口，

```bash
vim docker-compose.yml
version: "3"

services:

  redis:
    image: redis

  web:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      REDIS_HOST: redis

  lb:
    image: dockercloud/haproxy
    links:
      - web
    ports:
      - 8080:80
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock

docker-compose -d --scale web=3 up
```
#### 复杂投票应用

[Docker Compose 文档](https://docs.docker.com/compose/compose-file/)  
[Docker Compose 版本](https://docs.docker.com/compose/compose-file/compose-versioning/)  
