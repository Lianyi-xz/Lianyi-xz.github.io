title: Django 模板(V)
tags: Django
categories: Python
date: 2018-01-15
---

### 创建模板文件夹
```bash
mkdir projecct_name/app_name/templates/app_name
```

### 模板基本操作
```bash
#编辑应用首页模板
edit projecct_name/app_name/templates/app_name/index.html
#嵌入代码
{% code %}
#嵌入变量
{{ var }}
#嵌入 url, url_name 为设置url.path时填写的name内容
{% url 'app_name:url_name' var%}  
```
<!-- more -->
### if语句 
```python
{% if a %}
  {{ a }}
{% else %}
  <p> empty</p>
{% endif %}
```

### 静态文件
```djangotemplate
edit projecct_name/app_name/templates/app_name/index.html

{#加载静态文件#}
{% load static %}
<link rel="stylesheet" type="text/css" href="{% static 'polls/css/style.css' %}" />
<img src="{% static 'polls/images/one.jpg' %}" alt="静态图片" >
```


