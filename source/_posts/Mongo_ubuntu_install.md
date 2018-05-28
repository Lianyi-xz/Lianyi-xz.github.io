title: Ubuntu安装MongoDB 3.4.15
tags: Mongo
categories: DataBase
date: 2018-05-28 17:30:00
---
### 安装Mongo

#### 导入包管理器公钥
```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
```
#### 创建Mongo 源文件
```bash
echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
```
#### 更新源数据库
```bash
sudo apt-get update
```
#### 安装MongoDB
```bash
sudo apt-get install -y mongodb-org
```

<!-- more -->

### 关闭Huge Page
Mongo 推荐关闭 Huge Page
1. 安装软件包
```bash
sudo apt install sysfsutils
```
1. 修改默认设置
```bash
vim /etc/sysfs.conf
  kernel/mm/transparent_hugepage/enabled = never
  kernel/mm/transparent_hugepage/defrag = never
```

### 参考资料
[ubuntu16.04通过apt-get方式安装MongoDB](https://www.cnblogs.com/hupeng1234/p/7000499.html)  
[sys-kernel-mm-transparent-hugepage](https://askubuntu.com/questions/597372/how-do-i-modify-sys-kernel-mm-transparent-hugepage-enabled)  
