title: ELK 初探
tags: ELK
categories: 运维
date: 2018-02-06 10:28:00
---
### ELK简介
ELK:集中式WEB日志收集平台  
ELK=ElasticSearch+Logstash+Kiabana
1. Kiabana：提供web界面
1. Logstash：开源日志收集、过滤工具,需要jdk环境
1. ElasticSearch：开源分布式搜索引擎,需要jdk环境,以普通用户启动


<!-- more -->

### 实验环境
* pc: centos 7
* ip: 192.168.1.130
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
#运行logstash
./usr/local/logstash/bin/logstash -f /usr/local/logstash/config/etc/logstash.conf
```
### 编写日志收集信息
```bash
#写规则收集日志  //根据实际需抓取日志编写
vim /usr/local/logstash/config/etc/logstash.conf
input {  
 stdin { }  #从标准输入读数据
}
output {
 stdout {  
 codec => rubydebug{}  #输出到stdout
 }    
 elasticsearch { 
 hosts => "192.168.1.130" }
}
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

### 参考资料
[ELK 软件包](https://www.elastic.co/cn/products)  
[JDK软件包](http://www.oracle.com/technetwork/java/javase/downloads/index.html)  
[腾讯课堂-构建企业级ELK实时日志分析平台](https://ke.qq.com/webcourse/index.html#course_id=173130&term_id=100202788&taid=1794239767946314&vid=i1423mgr003)