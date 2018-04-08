title: ELK 报错问题 
tags: ELK 
categories: 日志分析 
date: 2018-02-06 13:27:00
---
### elasticsearch启动失败
```bash
#查看日志
tail -fn 50 /usr/local/elasticsearch/log/elasticsearch.log
#报错内容
[1]: max file descriptors [4096] for elasticsearch process is too low, increase to at least [65536]
[2]: max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
#解决方法
vim /etc/security/limits.conf
*        hard    nofile           65536
*        soft    nofile           65536
vim /etc/sysctl.conf 
vm.max_map_count=262144
#执行命令
sysctl -p
#临时设置sysctl
sysctl -w vm.max_map_count=262144
```
