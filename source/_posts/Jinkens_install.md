title: Jenkins部署
tags: Jenkins
categories: 自动化
date: 2018-09-17 12:28:00
---

### 安装jdk8
```bash
  yum install java-1.8.0-openjdk-devel
  yum install java-1.8.0-openjdk
``` 
### 安装git
```bash
  yum install git -y
  git config --global user.name "user.name"
  git config --global user.email "user.email"
  ssh-keygen -t rsa -C "user.email"
```
<!-- more -->
### 安装Maven
```bash
wget http://mirrors.hust.edu.cn/apache/maven/maven-3/3.5.4/binaries/apache-maven-3.5.4-bin.tar.gz 
tar xvf apache-maven-3.5.4-bin.tar.gz
mv apache-maven-3.5.4 /usr/local/maven\
vim /etc/profile
  export MAVEN_HOME=/usr/local/maven
  export PATH=$MAVEN_HOME/bin:$PATH
source /etc/profile
```
### 安装jenkins
```bash
#在网站中下载war包
  https://jenkins.io/ 
#运行jenkins
  java -jar jenkins.war 
#网页初始化  
  localhost:8080
```
### 插件管理
```bash
#系统管理-插件管理-可选插件
  #重新构建
  Rebuilder
  #安全重启jenkins
  safe restart
```

### 基础设置
#### 配置全局安全属性
  系统管理-全局安全配置-项目矩阵授权策略-安全矩阵  
  添加用户 添加所有权限-保存

#### 创建用户
  系统管理-管理用户-新建用户

#### 为新用户添加权限
 系统管理-全局安全配置-项目矩阵授权策略-安全矩阵  
 添加用户 添加部分权限(去掉administrator权限)-保存 
  
### 参考资料
[官方文档](https://jenkins.io/doc/tutorials/build-a-java-app-with-maven/)