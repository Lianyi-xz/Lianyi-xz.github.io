title: ELK logstash 案例
tags: ELK
categories: 日志分析
date: 2018-03-12 10:28:00
---

### 收集rsyslog日志
```bash
input {
    tcp {
        port => 514
        type => syslog
    }
    udp {
        port => 514
        type => syslog
    }
}
output {
    elasticsearch { hosts => ["localhost:9200"] }
    stdout {  }
}
```
<!-- more -->
### 参考资料
[ELK实战-Logstash：收集rsyslog日志](http://blog.csdn.net/K_Zombie/article/details/51156312)    
[logstash 官方示例](https://www.elastic.co/guide/en/logstash/current/config-examples.html)  