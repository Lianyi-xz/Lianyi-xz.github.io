title: Django 模型(M)
tags: Django
categories: Python
---
### 部分字段类型
```bash
#递增整数：AutoField
#布尔值：BooleanField
#字符串类型：CharField
#文本类型：TextField
#日期类型：DateField
#时间类型：DateTimeField
#数值型：IntegerField
#浮点数类型：FloatField
#Email型：EmailField
#文件上传：FileField   #必须有的参数： upload_to
#图片类型：ImageField
#外键：ForeignKey  
```
[字段类型参考文档](http://blog.51cto.com/kevinhao/1699014)
<!-- more -->
### 创建模型
```python
from django.db import models

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

```

### 修改模型默认提示信息
```python
class Question(models.Model):
    def __str__(self):
        return self.question_text
```

### 添加自定义方法
```python
import datatime
from django.utils import timezone
class Question(models.Model):
  def was_published_recently(self):
    return self.pub_date >=timezone.now()-datatime.timedelta(days=1)

```

### 单独迁移app_name应用
```python
python manage.py makemigrations app_name
```
  
### 查看迁移内容
```python
  python manage.py sqlmigrate app_name 0001  
```
  
### 执行迁移操作
```python
  python manage.py migrate
```
  
