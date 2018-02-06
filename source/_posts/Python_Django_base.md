title: Django 基本操作
tags: Django
categories: Python
date: 2018-01-15
---

### 创建Django
```shell
#查看django版本
python -m django --version

#创建新项目
 django-admin startproject project_name 

#开发环境运行
  python manage.py runserver [ip:port]

#创建应用
  python manage.py startapp app_name 

#创建管理网站用户
  python manage.py createsuperuser
```
<!-- more -->
### Django 项目默认文件
```bash
project_name/              #项目的容器，可重命名
    manage.py              #命令行程序，可与项目交互
    project_name/          #项目包，需要用来导入任何内容的python包名(eg:project_name.urls)
        __init__.py        #空的文件，该目录应该被认为是一个Python包
        settings.py        #项目的设置/配置
        urls.py            #URL声明
        wsgi.py            #WSGI兼容的Web服务器为您的项目提供服务的入口点

```

### Django 应用默认文件
```bash
app_name/
    __init__.py
    admin.py
    apps.py               
    migrations/           #模型迁移文件，用于创建或撤销数据表
        __init__.py
    models.py             #模型，存放程序数据表 M
    tests.py
    views.py              #控制器，管理页面内容 C
```

### 激活Django应用
```bash
edit peoject_name/project_name/settings.py

INSTALLED_APPS  =  [
    'app_name.apps.AppNameConfig'，         #AppNameConfig为app_name/apps.py中定义的类名
    'django.contrib.admin'，          
    'django.contrib.auth'，
    'django.contrib.contenttypes'，         #内容类型框架
    'django.contrib.sessions'，
    'django.contrib.messages'，             #消息框架
    'django.contrib.staticfiles'，          #管理静态文件的框架
]
```