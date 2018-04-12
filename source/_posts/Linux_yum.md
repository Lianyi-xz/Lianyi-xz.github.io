title: Linux 创建Yum仓库
tags: OS
categories: Linux
date: 2018-04-12 10:04:00
---
### 一般步骤
* 安装Apache服务
* 共享安装介质内容
* 客户机配置repo文件
<!-- more -->
### 安装Apache服务
```bash
#安装httpd
yum install httpd
#启动httpd
systemctl start httpd
#开启80端口
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --reload
```

### 共享安装介质
```bash
#查看挂载光盘位置
mount
#建立软连接
cd /var/www/html
ln -s /run/media/root/CentOS\ 7\ x86_64/ cd
#查看软连接
ls -l
#出现问题
#由于安装介质挂载在/run/media/root目录
#所以要给该目录添加755权限
```
![](https://ws1.sinaimg.cn/large/006Xrlj6gy1fq9og6hendj30ii0epab1.jpg)

### 修改客户端yum源
```bash
#查找yum源位置
locate yum.repos.d
cd /etc/yum.repos.d/
vim MyYum.repo
[MyYum]
name=MyYum
baseurl=http://10.10.0.2/cd
gpgcheck=1
gpgkey=http://10.10.0.2/cd/RPM-GPG-KEY-CentOS-7

#建立yum元数据缓存
yum clean all && yum makecache
#安装服务
yum install httpd
```
![](https://ws1.sinaimg.cn/large/006Xrlj6gy1fq9orv1nrrj30tc07hwfk.jpg)

