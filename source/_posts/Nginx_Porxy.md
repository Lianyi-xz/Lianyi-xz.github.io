---
title: Nginx 代理配置
tags: 服务
categories: 技术
date: 2019-04-11 17:28:00
---
> 开发需求将流量转到网关。使用重定向实现后，开发反馈 访问接口数翻倍，最终使用重定向实现  
302重定向会导致POST 请求转成GET请求，推荐使用307

### 301、302、307、proxy
* 301：永久重定向
* 302：临时重定向
* 307：临时重定向，不修改请求方法
* proxy：代理
<!-- more -->

### 具体实现
```bash
upstream GW{
  server  127.0.0.1:8889 max_fails=3 fail_timeout=50s;
}
server {
        listen       80;
        listen       443 ssl;
        server_name  dev.xxx.com;

        ssl_certificate /home/xxx.com.crt;
        ssl_certificate_key /home/xxx.com.key;


        ssl_session_timeout 10m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers AESGCM:ALL:!DH:!EXPORT:!RC4:+HIGH:!MEDIUM:!LOW:!aNULL:!eNULL;
        ssl_prefer_server_ciphers on;

        location ^~ /gw/ {
                if ($request_method = 'OPTIONS') {
                        return 200;
                }
                access_log logs/dev.log;
                proxy_pass http://GW;
                proxy_set_header Host $http_host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        location  / {
                access_log logs/dev.log;
                if ($request_method = 'OPTIONS') {
                        return 200;
                }
                if ($request_method != 'OPTIONS') {
#                        return  307 https://dev.xxx.com/gw$request_uri;
                         proxy_pass http://GW/gw$request_uri;
                }
        }
}
```