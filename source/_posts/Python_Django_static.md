title: Django 静态文件
tags: Django
categories: Python
date: 2018-01-25
---

### 创建静态文件
```bash
#创建 css、js、图片文件夹
 mkdir projecct_name/app_name/static/app_name/css/
 mkdir projecct_name/app_name/static/app_name/js/
 mkdir projecct_name/app_name/static/app_name/images/
```
<!-- more -->

### 编辑静态文件
```css
edit projecct_name/app_name/static/app_name/css/style.css
li  a  { 
    color : green ; 
}
body  { 
    background : white  url （"../images/background.gif"） no-repeat  right  bottom ; 
}
```

### 使用静态文件
```djangotemplate
edit projecct_name/app_name/templates/app_name/index.html

{#加载静态文件#}
{% load static %}
<link rel="stylesheet" type="text/css" href="{% static 'polls/css/style.css' %}" />
<img src="{% static 'polls/images/one.jpg' %}" alt="静态图片" >
```