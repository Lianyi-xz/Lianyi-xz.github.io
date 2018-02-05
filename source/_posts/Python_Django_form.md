title: Django 表单
tags: Django
categories: Python
---

> 简单的表单案例

### 视图部分

```djangotemplate
edit projecct_name/app_name/templates/app_name/detail.html

{#method="post" 修改数据#}
<form action="{% url 'polls:vote' question.id %}" method="post">
    {#防止跨站点请求伪造#}
    {% csrf_token %}
    {% for choice in question.choice_set.all %}
        {#forloop.counter表示for标签已经经过了多少次循环 #}
        <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}" />
        <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label>
        <br />
    {% endfor %}
    {# 将选中单选项的 value值以post的方式传递给 'polls:vote'#}
    <input type="submit" value="Vote" />
</form>
```
<!-- more -->
### 控制器部分
```djangotemplate
#导入 Question,Choice 模型
from .models import Question,Choice
from django.http import HttpResponseRedirect,HttpResponse
from django.urls import reverse
#使用模板简写 import 内容
from django.shortcuts import render,get_object_or_404

def vote(request,question_id):
    question = get_object_or_404(Question,pk=question_id)
    try:
        #request.POST ：通过密钥访问提交的数据
        # request.POST['choice']以字符串形式返回所选选项的ID
        #在与question外键关联的choice中获取某条的choice
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError,Choice.DoesNotExist):
        context = {'question':question,'error_message':"you didn't select a choice."}
        return render(request,'polls/detail.html',context)
    else:
        #该条choice 的votes字段+1 并保存
        selected_choice.votes += 1
        selected_choice.save()
        #y用户被重定向的rul
        return HttpResponseRedirect(reverse('polls:results',args=(question.id,)))

```
### 模型部分
