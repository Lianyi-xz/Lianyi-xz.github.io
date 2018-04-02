title: Ansible API
tags: Ansible
categories: 运维
date: 2018-04-02 10:04:00
---

### Ansible Python API
* 调用Ansible的模块
* 开发动态Inventory数据源
* 更好的控制playbook等功能运行

### 调用Ansible API
* 引入Ansible runner库
* 初始化runner对象，传入相关参数
* 运行runner对象的run函数

<!-- more -->
### API示例
```bash
vim ansible_api.py 
#!/usr/bin/env python
# coding=utf-8
import ansible.runner
import json
runner = ansible.runner.Runner(
       module_name='ping',                  # 模块名称
       module_args='',                      # 模块参数 
       pattern='web*',                      # 主机组
       forks=10                             # 并发量
    )
datastructure = runner.run()
data = json.dumps(datastructure,indent=4)
print data
```
### 调用Ansible2.0 API
* 定义一个结果对象
* 初始化Ansible节点对象
* 初始化结果对象
* 创建一个任务
* 运行ansible节点

### 参考资料
[Python API2.0 案例](http://docs.ansible.com/ansible/latest/dev_guide/developing_api.html#python-api-2-0)  