title: ELK logstash配置语法
tags: ELK
categories: 日志分析
date: 2018-03-12 09:28:00
---
>logstash:收集并处理日志

### 基本语法组成
```bash
#
input {
  #输入
}
filter{
  #过滤匹配
}
output{
 #输出
}
```
<!-- more -->
### input 输入配置
#### file(文件读取)
```bash
input {
  file{
    path => ["/var/log/access.log","/var/log/message"]   #监听文件路径
    type => "system_log"                                 #定义事件类型
    start_position => "beginning"                        #检查时间戳
    }
}
#参数说明
exclude ：排除掉不想被监听的文件
stat_interval ：检查被监听文件状态间隔时间，默认1秒。
start_position ：默认从结束位置开始读取文件数据，若从开始位置读取，改成"beginning"
```
#### codec(定义编码类型)
> 直接读取json格式的日志格式，可以省略掉 filter/grok 配置

```bash
#以nginx 为例
#nginx配置文件
logformat json '{"@timestamp":"$time_iso8601",'
               '"@version":"1",'
               '"host":"$server_addr",'
               '"client":"$remote_addr",'
               '"size":$body_bytes_sent,'
               '"responsetime":$request_time,'      #$request_time没有双引号表明该值为int类型
               '"domain":"$host",'
               '"url":"$uri",'
               '"status":"$status"}';
access_log /var/log/nginx/access.log_json json;
#logstash文件
input {
    file {
        path => "/var/log/nginx/access.log_json""
        codec => "json"
    }
}
```
### filter过滤器配置
#### grok(定义数据格式)
```bash
#获取日志信息
2015-05-07-16:03:04|10.4.29.158|120.131.74.116|WEB|11299073| \
http://quxue.renren.com/shareApp?isappinstalled=0&userId=11299073&from=groupmessage| \
/shareApp|null|Mozilla/5.0 (iPhone; CPU iPhone OS 8_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12D508 MicroMessenger/6.1.5 NetType/WIFI|duringTime|98||

filter {
  #根据日志的格式，用正则表达式进行匹配
  grok{
    match => { "message" => "%{DATA:timestamp}\|%{IP:serverIp}\|%{IP:clientIp}\|
     %{DATA:logSource}\|%{DATA:userId}\|%{DATA:reqUrl}\|%{DATA:reqUri}\|
     %{DATA:refer}\|%{DATA:device}\|%{DATA:textDuring}\|%{DATA:duringTime:int}\|\|"}
  }
}
```
#### date(时间处理)
> logstash的时间戳

```bash
  date {  #将grok中的timestamp数据转换格式
    match => [ "timestamp", "yyyy-MM-dd-HH:mm:ss" ]
    locale => "cn"
  }
```
#### geoip(客户端ip)
>指定客户端IP，logstash会自动去抓取该IP的相关位置信息
只存有公共网络上的 IP 信息

```bash
  geoip {
    source => "clientIp"
    database => "/etc/logstash/GeoLiteCity.dat"       #需去官网下载ip库放到本地
  }
```
#### useragent(客户端设备)
```bash
  #定义客户端设备是哪一个字段
  useragent {
    source => "device"
    target => "userDevice"
  }
```
#### mutate(修改字段内容)
```bash
  #需要进行转换的字段，这里是将访问的时间转成int，再传给Elasticsearch
  mutate {
    convert => ["duringTime", "integer"]
  }
```
### output输出配置
>将过滤后的数据输出到elasticsearch

```bash
output {
  #将输出保存到elasticsearch，如果没有匹配到时间就不保存，因为日志里的网址参数有些带有换行
  if [timestamp] =~ /^\d{4}-\d{2}-\d{2}/ {
        elasticsearch { host => localhost }
  }

#输出到stdout
#stdout { codec => rubydebug }

#定义访问数据的用户名和密码
#user => username
#password => passwd
}
```
### 参考资料
[ELK日志管理之——logstash配置语法](http://blog.csdn.net/u010917843/article/details/49950913)  
[logstash日志分析的配置和使用](http://blog.csdn.net/gebitan505/article/details/70336282)  
[Logstash过滤器--mutate](http://blog.csdn.net/cromma/article/details/52919742)  
[ELK日志处理之使用Grok解析日志](http://blog.csdn.net/napoay/article/details/62885899)  
[Grok正则表达式库](https://github.com/logstash-plugins/logstash-patterns-core/tree/master/patterns)  