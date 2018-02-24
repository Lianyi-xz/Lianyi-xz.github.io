title: Webhooks进行网站的自动化部署
tags: [github,hexo]
categories: git
date: 2018-02-24 12:48:00
---

>提交代码后，服务器自动git pull 代码

### 实现原理
* github中添加webhook,当代码提交时对服务器发送post请求
* 服务器收到post请求后调用脚本
* 执行git pull脚本

<!-- more -->

### 添加webhook
![](https://ws1.sinaimg.cn/large/006Xrlj6gy1forg5tde4oj30s90c3t9u.jpg)
### php编写post请求
```bash
#大佬在忙，还没帮我写
```
### git pull 脚本
```bash
LOG_FILE="/var/log/blog_deploy.log"

date >> "$LOG_FILE"
echo "Start deployment" >>"$LOG_FILE"
cd /var/www/
echo "pulling source code..." >> "$LOG_FILE"
git checkout origin master
git pull origin master
echo "Finished." >>"$LOG_FILE"
echo >> $LOG_FILE
```

### 参考资料
[使用Github的Webhooks进行网站的自动化部署](http://blog.csdn.net/auv1107/article/details/51999592)  