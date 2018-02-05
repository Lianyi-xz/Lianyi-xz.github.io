title: Django url
tags: Django
categories: Python
---
>添加应用路径前，需创建应用


### 添加应用路径
```bash
create project_name/app_name/urls.py

from django.urls import path
from . import views
urlpatterns = [
    path('', views.index, name='index'),  #path(路径route，视图view，字典参数kwargs，url命名name)
    path('<int:question_id>/',views.detail,name='detail'),
    path('<int:question_id>/results/',views.results,name='results'),
    path('<int:question_id>/vote/',views.vote,name='vote'),
]
```
<!-- more -->

### 声明应用路径
```bash
edit project_name/project_name/urls.py

from django.urls import include, path
from django.contrib import admin
urlpatterns = [
    path('app_name/', include('app_name.urls')),
    path('admin/', admin.site.urls),
]
```