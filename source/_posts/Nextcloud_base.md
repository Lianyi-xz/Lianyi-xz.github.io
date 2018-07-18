title: CentOS 7 中安装 Nextcloud
tags: Nextcloud
categories: Linux
date: 2018-07-18 10:30:00
---

###  云存储选择
* Nextcloud、ownCloud、Seafile为目前比较流行的开源的文件云存储平台
* Nextcloud是ownCloud原开发团队打造的号称是“下一代”存储
* Seafile 安全稳定，社区版功能较少
* Nextcloud 好看

### 系统环境
* CentOS 7.5 
* MariaDB
* Nginx
* PHP 7.0
* Nextcloud 13.0.4

### 安装 PHP 7.0
```bash
#安装PHP 7.0
yum install -y epel-release
yum install -y https://centos7.iuscommunity.org/ius-release.rpm
yum install -y php70u-fpm-nginx php70u php70u-gd php70u-mysqlnd \
php70u-mbstring php70u-mcrypt php70u-pear php70u-xml php70u-pdo \
php70u-json php70u-pecl-apcu php70u-pecl-apcu-devel php70u-opcache
```
<!-- more -->
### 配置 PHP.ini 
```bash
#添加 字节码缓存组件
vim /etc/php.ini 
	[opcache]
	opcache.enable=1
	opcache.enable_cli=1
	opcache.interned_strings_buffer=8
	opcache.max_accelerated_files=10000
	opcache.memory_consumption=128
	opcache.save_comments=1
	opcache.revalidate_freq=1

```
### 配置 PHP-FPM
```bash
#查看FPM位置
find / -name php-fpm.d
#编辑配置文件
vim /etc/php-fpm.d/www.conf
	#行 8-10 设置用户和组
	user = nginx
	group = nginx
	#行 22 设置监听端口
	listen = 127.0.0.1:9000
	#行 366-370 取消注释
	env[HOSTNAME] = $HOSTNAME
	env[PATH] = /usr/local/bin:/usr/bin:/bin
	env[TMP] = /tmp
	env[TMPDIR] = /tmp
	env[TEMP] = /tmp
#确认路径
printenv PATH
#启动PHP-FPM
systemctl start php-fpm
systemctl enable php-fpm 

```

### 安装 MariaDB
```bash
#安装 MariaDB
yum -y install mariadb mariadb-server
#启动 MariaDB
systemctl start mariadb
systemctl enable mariadb
#初始化 MariaDB
mysql_secure_installation
#创建数据库和用户
mysql -u root -p
create database nextcloud;
create user nextuser identified by '123456';
grant all privileges on nextcloud.* to nextuser identified by '123456';
flush privileges;
exit
```

### 安装 Nextcloud
```bash
#下载 Nextcloud
wget https://download.nextcloud.com/server/releases/nextcloud-13.0.4.zip
unzip nextcloud-13.0.4.zip
cp -r nextcloud /var/www
cd /var/www
#创建文件储存文件夹
mkdir -p /var/www/nextcloud/data
chown -R nginx:nginx nextcloud/
```

### 创建 SSL 证书
```bash
#可以自己生成证书，也可以申请SSL证书
mkdir /etc/ssl/nginx
cd /etc/ssl/nginx
openssl req -new -x509 -days 365 -nodes -out /etc/ssl/nginx/nextcloud.crt -keyout /etc/ssl/nginx/nextcloud.key
```
### 配置 SELinux
```bash
#官方配置 参考SELinux 配置
semanage fcontext -a -t httpd_sys_rw_content_t '/var/www/html/nextcloud/data(/.*)?'
#根据实际root路径修改的配置
semanage fcontext -a -t httpd_sys_rw_content_t '/var/www/nextcloud/data(/.*)?'
semanage fcontext -a -t httpd_sys_rw_content_t '/var/www/nextcloud/config(/.*)?'
semanage fcontext -a -t httpd_sys_rw_content_t '/var/www/nextcloud/apps(/.*)?'
semanage fcontext -a -t httpd_sys_rw_content_t '/var/www/nextcloud/.htaccess'
semanage fcontext -a -t httpd_sys_rw_content_t '/var/www/nextcloud/.user.ini'

restorecon -Rv '/var/www/nextcloud/'
#打开防防火墙端口
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload
```
### 配置 Nginx
```bash
#安装 Nginx
yum -y install nginx
#编写Nextcloud 配置文件
cd /etc/nginx/conf.d/
#Nextcloud提供nginx配置文件 
#点击参考文档 Nginx 设置 查看
#需要修改server_name，root，ssl_certificate和 ssl_certificate_key 
vim nextcloud.conf
  ...
#启动 Nginx
systemctl start nginx
systemctl enable nginx
```
### 登录 Nextcloud 
登陆页面
![登陆页面](http://wx3.sinaimg.cn/mw690/0060lm7Tly1ftdtl03358j316y0rodxz.jpg)  
主页面
![主页面](http://wx3.sinaimg.cn/mw690/0060lm7Tly1ftdtmruz34j31110ghgml.jpg)
### 遇到问题
#### 登录失败
```bash
#查看日志
tail -f /var/www/nextcloud/data/nextcloud.log 
	{
	    "reqId":"CpC0cdyAzDB1F6cHU784",
	    "level":3,
	    "time":"2018-07-17T11:00:50+00:00",
	    "remoteAddr":"192.168.83.1",
	    "user":"--",
	    "app":"PHP",
	    "method":"GET",
	    "url":"/login",
	    "message":"session_write_close(): Failed to write session data (files). Please verify that the current setting of session.save_path is correct (/var/lib/php/fpm/session) at /var/www/nextcloud/lib/private/Session/Internal.php#175",
	    "userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.15 Safari/537.36",
	    "version":"13.0.4.0"
	}

#日志显示无法写入session
#给nginx用户 /var/lib/php/fpm文件夹权限
cd /var/lib/php
chown root:nginx fpm 
#创建session文件夹 并赋予nginx用户权限
cd fpm
mkdir session 
chown -R nginx:nginx session/
#重启服务
systemctl restart nginx 
systemctl restart php-fpm  
```
### 关于PHP 7.0
> 官方推荐使用 SCL 安装PHP，但在使用php-fpm时出错，未能解决故最终使用传统方案

```bash
#安装SCL(Software Collections)
yum install centos-release-scl
#安装PHP 7.0
yum install rh-php70 rh-php70-php rh-php70-php-gd rh-php70-php-mbstring rh-php70-php-fpm
yum install rh-php70-php-mysqlnd
#查看安装
scl enable rh-php70 bash
php -v
```
### 参考资料
[Nextcloud 13 管理手册](https://docs.nextcloud.com/server/13/admin_manual/installation/index.html)  
[SCL软件库简介](https://blog.csdn.net/supergao222/article/details/78308197)  
[Nextcloud 下载页面](https://nextcloud.com/install/#instructions-server)  
[Nginx 设置](https://docs.nextcloud.com/server/13/admin_manual/installation/nginx.html)  
[快马加鞭使用 certbot 为你的网站免费上 https](https://laravel-china.org/articles/5266/the-use-of-certbot-at-top-speed-for-your-website-for-free-on-https)  
[SELinux配置](https://docs.nextcloud.com/server/13/admin_manual/installation/selinux_configuration.html)  