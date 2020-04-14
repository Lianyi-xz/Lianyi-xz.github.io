title: Dockerfile JDK1.8
tags: 容器
categories: 运维
date: 2019-06-10 11:32:00
---

### 极简 Dockerfile
```bash
FROM centos:centos7.2.1511 

ENV JAVA_HOME /home/wwwroot/example/server/jdk1.8.0_161
ENV CLASSPATH $JAVA_HOME/lib/ 
ENV PATH $PATH:$JAVA_HOME/bin

RUN mkdir -p "/home/wwwroot/example/server/" 

ADD jdk-8u161-linux-x64.tar.gz /home/wwwroot/example/server/
```