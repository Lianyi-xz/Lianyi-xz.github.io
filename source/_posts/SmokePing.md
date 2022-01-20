---
title: SmokePing 部署实践
tags: 服务
categories: 技术
date: 2018-04-08 10:49:00
---
### SmokePing简介
* 使用perl开发
* Smokeping 是一款用于网络性能监测的监控软件  
* 用于查看网络状况，如延时，丢包率，是否BGP多线等
* rrdtool制图方式，图形化地展示网络的时延情况，可网络的即时通信情况

### 安装依赖环境
```bash
yum install  bind-utils  wqy*  perl perl-core  perl-Net-Telnet perl-Net-DNS \
perl-LDAP perl-libwww-perl perl-RadiusPerl perl-IO-Socket-SSL \
perl-Socket6 perl-CGI-SpeedyCGI perl-FCGI perl-CGI-SpeedCGI \
perl-Time-HiRes perl-ExtUtils-MakeMaker perl-RRD-Simple \
perl-CGI perl-Net-OpenSSH  perl-Sys-Syslog  \
curl fping echoping   gcc make  wget libxml2-devel \
libpng-devel glib pango pango-devel freetype freetype-devel fontconfig \
cairo cairo-devel libart_lgpl libart_lgpl-devel mod_fastcgi screen 
```
<!-- more -->
### 安装 RRDtool 
```bash
yum install rrdtool perl-rrdtool
```
### 安装 FPing 
```bash
cd /usr/local/src
wget http://www.fping.org/dist/fping-4.0.tar.gz
tar xvf fping-4.0.tar.gz
cd fping-4.0
./configure --prefix=/usr/local/fping
make install 
```
### 安装 apache
```bash
yum install httpd httpd-devel
```
### 安装 smokeping
```bash
cd /usr/local/src/ 
wget https://oss.oetiker.ch/smokeping/pub/smokeping-2.7.1.tar.gz
tar xvf smokeping-2.7.1.tar.gz 
cd smokeping-2.7.1/
./configure --prefix=/usr/local/smokeping
gmake install
```
### 配置 smokeping 相关文件
```bash
#创建文件夹
cd /usr/local/smokeping/
mkdir cache data var
touch /var/log/smokeping.log
chown apache.apache cache/ data/ var/ /var/log/smokeping.log
cd /usr/local/smokeping/htdocs/
cp smokeping.fcgi.dist smokeping.fcgi
cp /usr/local/smokeping/etc/config.dist /usr/local/smokeping/etc/config

# 修改 /usr/local/smokeping/etc/config 文件
vim /usr/local/smokeping/etc/config
# 修改 cgiurl
sed -i 's#some.url#10.10.0.1#' /usr/local/smokeping/etc/config
# 默认检测时间 300 秒修改 60 秒
sed -i 's#300#60#g' /usr/local/smokeping/etc/config        
# 默认 60 秒 ping 20 次，修改为 60 秒 ping 60 次
sed -i 's#pings    = 20#pings    = 60#' /usr/local/smokeping/etc/config
#修改fping位置
binary = /usr/local/fping/sbin/fping
# 在 presentation 后添加 utf-8 中文字符集           
*** Presentation ***
charset = utf-8
# 修改密码文件权限
chmod 600 /usr/local/smokeping/etc/smokeping_secrets.dist

# 启动smokeping
/usr/local/smokeping/bin/smokeping
```
### 配置apache
```bash
#设置密码登陆
htpasswd -c /usr/local/smokeping/htdocs/htpasswd admin
#修改配置文件
vim /etc/httpd/conf/httpd.conf

#DocumentRoot "/var/www/html" 下添加如下内容
Alias /cache "/usr/local/smokeping/cache/"
Alias /css "/usr/local/smokeping/htdocs/css/"
Alias /js "/usr/local/smokeping/htdocs/js/"
Alias /cropper "/usr/local/smokeping/htdocs/cropper/"
Alias /smokeping "/usr/local/smokeping/htdocs/smokeping.fcgi"

<Directory "/usr/local/smokeping">
    AllowOverride None
    Options All
    AddHandler cgi-script .fcgi .cgi
    Order allow,deny
    Allow from all
    AuthName "Smokeping"
    AuthType Basic
    AuthUserFile /usr/local/smokeping/htdocs/htpasswd
    Require valid-user
    DirectoryIndex smokeping.fcgi
</Directory>

#启动httpd
systemctl start httpd
```
### 安全设置
```bash
#开启80端口
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --reload
#关闭selinux
setenforce 0
```
### 添加监控节点
```bash
# + 是第一层，++ 是第二层，+++ 是第三层
# 必须重启 smokeping 程序，配置才会生效 

vim /usr/local/smokeping/etc/config
+ Other
menu = 三大网络监控
title = 监控统计

++ CT

menu = 电信网络监控
title = 电信网络监控列表
host = /Other/CT/CT-BJ /Other/CT/CT-TJ

+++ CT-BJ

menu = 北京电信
title = 北京电信
alerts = someloss
host = 202.96.199.133

+++ CT-TJ

menu = 天津电信
title = 天津电信
alerts = someloss
host = 219.150.32.132

# 启动smokeping
/usr/local/smokeping/bin/smokeping
```

### 参考资料
[SmokePing 部署实践](http://jaminzhang.github.io/monitoring/smokeping-deploy-practice/#top15)  
[smokeping_install](https://oss.oetiker.ch/smokeping/doc/smokeping_install.en.html)  
[smokeping package](https://oss.oetiker.ch/smokeping/pub/)