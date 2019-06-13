title: Gitlab搭建手册
tags: git
categories: 版本控制
date: 2019-01-22  14:01:00
---
>公司代码仓库由gogs迁移到gitlab,但服务器中已存在ng，故直接使用当前ng


#### 安装nginx
```bash
#准备环境
yum -y install pcre-devel gcc zlib-devel openssl openssl-devel
#编译安装nginx
wget http://nginx.org/download/nginx-1.10.3.tar.gz
tar xvf nginx-1.10.3.tar.gz
mkdir -p /home/wwwroot/server/nginx
cd nginx-1.10.3
./configure --prefix=/home/wwwroot/server/nginx --with-http_gzip_static_module --with-http_stub_status_module --with-http_ssl_module --with-http_v2_module --with-ipv6

make
make install
```
<!-- more -->
#### 安装gitlab
```bash
yum install -y curl policycoreutils-python openssh-server
#新版本gitlab汉化不完全
wget https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/gitlab-ce-10.5.8-ce.0.el7.x86_64.rpm
rpm -ivh gitlab-ce-10.5.8-ce.0.el7.x86_64.rpm
```
#### 配置nginx
```bash
vim nginx.conf
  include /home/wwwroot/server/nginx/conf/hosts/*.conf;
vim conf/gitlab.example.com.conf

upstream gitlab {
  server unix://var/opt/gitlab/gitlab-rails/sockets/gitlab.socket;
}

server {
  listen *:80;
 #改为实际使用域名
  server_name gitlab.example.com;   

  server_tokens off; 
  root /opt/gitlab/embedded/service/gitlab-rails/public;

  # Increase this if you want to upload large attachments
  # Or if you want to accept large git objects over http
  client_max_body_size 250m;

  # individual nginx logs for this gitlab vhost
  access_log  /var/log/gitlab/nginx/gitlab_access.log;
  error_log   /var/log/gitlab/nginx/gitlab_error.log;

  location / {
    allow 116.226.249.108;
    allow 211.144.201.213;
    deny all;




    try_files $uri $uri/index.html $uri.html @gitlab;
  }

  location @gitlab {

    proxy_read_timeout 300; # Some requests take more than 30 seconds.
    proxy_connect_timeout 300; # Some requests take more than 30 seconds.
    proxy_redirect     off;

    proxy_set_header   X-Forwarded-Proto $scheme;
    proxy_set_header   Host              $http_host;
    proxy_set_header   X-Real-IP         $remote_addr;
    proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header   X-Frame-Options   SAMEORIGIN;

    proxy_pass http://gitlab;
  }

  location ~ ^/(assets)/  {
    root /opt/gitlab/embedded/service/gitlab-rails/public;
    # gzip_static on; # to serve pre-gzipped version
    expires max;
    add_header Cache-Control public;
  }

  error_page 502 /502.html;
}

```
#### gitlab.rb
```bash
#域名设置
external_url 'http://gitlab.example.com'
#email设置
gitlab_rails['gitlab_email_enabled'] = true
gitlab_rails['gitlab_email_from'] = 'dev@xxx.com'
gitlab_rails['gitlab_email_display_name'] = 'SA'
gitlab_rails['gitlab_email_reply_to'] = 'dev@xxx.com'
gitlab_rails['gitlab_email_subject_suffix'] = ''
gitlab_rails['trusted_proxies'] = ['127.0.0.1']
#数据路径设置
git_data_dirs({
   "default" => {
     "path" => "/home/wwwroot/server/gitlab"
    }
 })
#图片路径设置
gitlab_rails['uploads_directory'] = "/home/wwwroot/server/gitlab/uploads"
#域名smtp设置
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.exmail.qq.com"
gitlab_rails['smtp_port'] = 465
gitlab_rails['smtp_user_name'] = "dev@xxx.com"
#密码为客户端专有密码
gitlab_rails['smtp_password'] = "hZTPeR8aHKK5687K"
gitlab_rails['smtp_domain'] = "xxx.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = true

#修改 gitlab备份路径
gitlab_rails['manage_backup_path'] = true
gitlab_rails['backup_path'] = '/home/wwwroot/back_up/gitlab'
#备份文件保存时间 单位秒
# gitlab_rails['backup_keep_time'] = 864000  
#关闭nginx
nginx['enable'] = false

```
#### gitlab 汉化
```bash
#下载项目包
wget https://gitlab.com/xhang/gitlab/-/archive/10-5-stable-zh/gitlab-10-5-stable-zh.tar.gz
#替换项目
tar xvf gitlab-10-5-stable-zh.tar.gz
\cp -rf gitlab-10-5-stable-zh/* /opt/gitlab/embedded/service/gitlab-rails/
#配置gitlab
gitlab-ctl reconfigure
```
#### 启动gitlab
```bash
#为nginx 添加访问gitlab socket文件权限
 chmod -R o+x /var/opt/gitlab/gitlab-rails
#创建日志路径
mkdir /var/log/gitlab/nginx/
#开启端口
#配置gitlab
gitlab-ctl reconfigure
#停止gitlab
gitlab-ctl stop
#开启gitlab
gitlab-ctl start

#测试发送邮件
gitlab-rails console

#进入控制台，然后发送邮件
Notify.test_email('dev@xxx.com', '邮件标题', '邮件正文').deliver_now
```
> 数据恢复和数据迁移要求gitlab版本相同

#### gitlab 数据备份与恢复
```bash
#备份
gitlab-rake gitlab:backup:create
#定时备份
0 2 * * * /opt/gitlab/bin/gitlab-rake gitlab:backup:create
###备份文件
1548380281_2019_01_25_11.7.0_gitlab_backup.tar

#恢复
#停止gitlab服务
gitlab-ctl stop unicorn
gitlab-ctl stop sidekiq
#从1548380281上恢复
cd /home/wwwroot/backup/gitlab/
cp 1548380281_2019_01_25_11.7.0_gitlab_backup.tar 1548380281_gitlab_backup.tar
chown git.git 1548380281_gitlab_backup.tar
gitlab-rake gitlab:backup:restore BACKUP=1548380281

#启动gitlab
gitlab-ctl start
```
#### gitlab 数据迁移
```bash
#停止gitlab服务
gitlab-ctl stop unicorn
gitlab-ctl stop sidekiq

#将当前数据文件转移到其他路径下
\cp -rp /var/opt/gitlab/git-data/repositories/ /home/gitlab-data/

#编辑gitlab.rb 文件
vim /etc/gitlab/gitlab.rb
git_data_dirs({
   "default" => {
     "path" => "/home/wwwroot/server/gitlab"
    }
 })
#更新gitlab配置
 gitlab-ctl reconfigure 
```