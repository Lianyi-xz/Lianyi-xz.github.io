title: Ansible Playbook
tags: Ansible
categories: 自动化
date: 2018-03-15 14:04:00
---
### Ansible剧本
```bash
└── example                                        #项目名称
    ├── group_vars
    │   ├── command                             #组变量                             
    ├── hosts                                      #主机清单
    ├── README.MD
    ├── roles                                      #角色
    │   ├── command                             
    │   │   ├── handlers                     #服务启动/通知
    │   │   │   └── main.yml
    │   │   ├── tasks                        #安装服务
    │   │   │   └── main.yml
    │   │   └── templates                    #安装服务时替换信息
    │   │       └── xx.conf.j2
    └── site.yml
```
<!-- more -->
### site.yml
```bash
- - -
# playbook
- name: apply configuration to  nodes
  hosts: zabbix            #主机清单中组名，定义运行服务主机
  remote_user: root        #运行用户

  roles:
    - command               #运行内容
```

### 参考资料
[我的zabbix部署脚本](https://github.com/Lianyi-xz/ansible-examples/tree/master/zabbix)  
[ansible-examples](https://github.com/ansible/ansible-examples)  