title: Django 连接mysql
tags: [Django,MySQL]
categories: Python
---
>仅适用于python3

### 安装mysqlclient
```bash
  pip install mysqlclient
```

### 管理mysql 
```sql
 create database app_name CHARACTER SET UTF8;
 grant all privileges on app_name.* to 'db_user'@'192.168.0.49'identified by 'db_passwd' with grant;
 FLUSH PRIVILEGES;
```
<!-- more -->

### 修改setting.py文件
```bash
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'polls',       
        'HOST':'192.168.1.91',        #数据库所在地址，需提供外部访问权限
        'PORT':'3306',
        'USER':'db_user',
        'PASSWORD':'db_passwd',
    }
}
```