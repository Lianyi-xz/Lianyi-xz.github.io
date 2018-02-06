title: Django 控制器(C)
tags: Django
categories: Python
date: 2018-01-15
---
### import 模块
```python
# 当前文件夹 models.py文件中导入Question数据表
from .models import Question

#使用模板简写 和404问题
from django.shortcuts import render,get_object_or_404
```
<!-- more -->
### 编辑控制器
```python
def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = { 'latest_question_list':latest_question_list}
    #使用模板简写
    return render(request,'polls/index.html',context)
    #使用模板
    #template = loader.get_template('polls/index.html')
    #return HttpResponse(template.reder(context,request))
    
def detail(request,question_id):
    #404 问题
    # try:
    #     question = Question.objects.get(pk=question_id)
    # except Question.DoesNotExist:
    #     raise Http404("Question does not exist")

    #440简写
    question = get_object_or_404(Question,pk=question_id)
    context = {'question':question}
    return render(request,'polls/detail.html',context)
```
