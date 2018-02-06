title: ELK日志平台 简介
tags: ELK
categories: 运维
date: 2018-02-06 10:28:00
---
### ELK简介
ELK:集中式WEB日志收集平台  
ELK=ElasticSearch+Logstash+Kiabana
1. ElasticSearch：开源分布式搜索引擎
1. Logstash：开源日志收集、过滤工具
1. Kiabana：提供web界面
<!-- more -->

### 实验环境
* ElasticSearch只能以普通用户启动
* ElasticSearch和Logstash需要jdk环境
* elasticsearch-6.1.1.tar.gz
* logstash-6.1.1.tar.gz
* kibana-6.1.1-linux-x86_64.tar.gz

### 配置elasticsearch
```bash
#解压软件包
tar xzf elasticsearch-6.1.1.tar.gz
mv elasticsearch-6.1.1 /usr/local/elasticsearch
#创建普通用户
adduser elk
chown -R elk.elk /usr/local/elasticsearch/
#修改配置文件
vim /usr/local/elasticsearch/config/elasticsearch.yml
  network.host: 0.0.0.0   #监听主机
  http.port: 9200         #http端口
vim /usr/local/elasticsearch/config/jvm.options
  -Xms1g                  #设置jvm内存虚拟机堆栈的大小
  -Xmx1g
#启动elasticsearch
/usr/local/elasticsearch/bin/elasticsearch -d
#查询是否启动
ps -ef |grep ela
netstat -tnpl |grep 9200
http://192.168.1.130:9200/
```

### 配置logstash
```bash
#解压软件包
tar xzf logstash-6.1.1.tar.gz
mv logstash-6.1.1 /usr/local/logstash
#修改配置文件
vim /usr/local/logstash/config/jvm.options
  -Xms1g                  #设置jvm内存虚拟机堆栈的大小
  -Xmx1g
#写规则收集日志
vim /usr/local/logstash/config/etc/logstash.conf
input {
 stdin { }
}
output {
 stdout {
 codec => rubydebug{}
 }
 elasticsearch { 
 hosts => "192.168.1.130" }
}
#运行logstash
./usr/local/logstash/bin/logstash -f /usr/local/logstash/config/etc/logstash.conf
```
### 配置kibana
```bash
#解压软件包
tar xzf kibana-6.1.1-linux-x86_64.tar.gz 
mv kibana-6.1.1-linux-x86_64 /usr/local/kibana
#修改配置文件
vim /usr/local/kibana/config/kibana.yml
server.host: "0.0.0.0"             #设置服务主机
elasticsearch.url: "http://192.168.1.130:9200"   #es主机地址，若同一台主机，可不改
#启动kibana
cd /usr/local/kibana/bin/
nohup ./kibana &
#查询是否启动
http://192.168.1.130:5601/
```

### kibana获取监控数据
* 打开网页：http://192.168.1.130:5601/
* Management-Index Patterns-Create Index Pattern
* 输入可以匹配到logstash的Index pattern-next
* 根据@timestamp过滤数据-Create index pattern
* Discover-选择创建的Index Pattern

### 参考文档
[ELK 软件包](https://www.elastic.co/cn/products)  
[JDK软件包](http://www.oracle.com/technetwork/java/javase/downloads/index.html)