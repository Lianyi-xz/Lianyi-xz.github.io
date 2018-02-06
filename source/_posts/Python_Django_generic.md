title: Django 通用视图
tags: Django
categories: Python
date: 2018-01-25
---
>并不能git到有什么作用

### 通用视图简介
  快捷地将数据库数据呈现在网页上
  在控制器(view.py)中编写

通用表单分为：
* TemplateView：只返回模板
* ListView：返回某model中的所有数据
* DetailView：返回每个数据的详细信息

使用步骤
* 修改url配置
* 创建通用视图类
* 基于Django的通用视图引入新的视图

<!-- more -->
### 修改url配置
```djangotemplate
edit create project_name/app_name/urls.py

from django.urls import path
from . import views
app_name = 'app_name'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),  #使用IndexView 通用视图类
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('<int:pk>/results/', views.ResultsView.as_view(), name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
```

### 修改控制器
```djangotemplate
edit create project_name/app_name/view.py

from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views import generic
from .models import Choice, Question

class IndexView(generic.ListView):
    template_name = 'app_name/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by('-pub_date')[:5]

class DetailView(generic.DetailView):
    model = Question
    template_name = 'app_name/detail.html'

class ResultsView(generic.DetailView):
    model = Question
    template_name = 'app_name/results.html'
```