title: Ansible 进行项目自动部署（tomcat）
tags: Ansible
categories: 自动化
date: 2018-03-28 09:04:00
---
> 通过Ansible来安装tomcat并部署新程序

### 主机清单
* 10.10.0.1:ansible master
* 10.10.0.2:ansible agent
* 10.10.0.3:ansible agent

### 安装环境
* centos7
* java-1.8.0-openjdk
* tomcat-8.5.29

### 设置组变量
```bash
tomcat_path: /usr/local/apache-tomcat-8.5.29
tomcat_http_port: 80
tomcat_app: /usr/local/apache-tomcat-8.5.29/webapps/test
tocmat_app_index: index.jsp
```
<!-- more -->
### 安装jdk
```bash
- name: install java 1.8
  yum: name=java-1.8.0-openjdk state=present
```
### 打开防火墙端口
```bash
- name: open port 80
  firewalld: port=80/tcp permanent=true state=enabled immediate=yes
  when: "ansible_os_family == 'RedHat' and ansible_distribution_major_version == '7'"

- name: open port 8080
  firewalld: port=8080/tcp permanent=true state=enabled immediate=yes
  when: "ansible_os_family == 'RedHat' and ansible_distribution_major_version == '7'"
  notify: restart firewalld
```

### 添加tomcat启动脚本
```bash
- name: Install Tomcat init script
  copy: src=tomcat-initscript.sh dest=/etc/init.d/tomcat mode=0755
```

### 安装tomcat
```bash
- name: download tomcat
  get_url:
    url: http://mirrors.hust.edu.cn/apache/tomcat/tomcat-8/v8.5.29/bin/apache-tomcat-8.5.29.tar.gz
    dest: /tmp/apache-tomcat-8.5.29.tar.gz

- name: unzip tomcat
  unarchive:
    src: /tmp/apache-tomcat-8.5.29.tar.gz  
    dest: /usr/local/
    remote_src: yes
  notify: restart tomcat
```
### 删除旧项目
```bash
- name: remove old app
  file: 
    path: "{{ tomcat_path }}/webapps/{{ tomcat_app }}"
    state: absent
```
### 添加新项目
```bash
- name: deplay new app
  copy: src=test.war dest={{ tomcat_path }}/webapps/
```

### 替换配置文件
```bash
#根据项目实际情况替换
- name: conf change
  template:
    src: "{{ item.src }}"
    dest: "{{ item.dest }}"
  with_items:
    - {
      src: server.xml.j2,
      dest: "{{ tomcat_path }}/conf/server.xml"
      }
    - {
      src: web.xml.j2,
      dest: "{{ tomcat_path }}/conf/web.xml"
      }
  notify: restart tomcat
```
### ansible测试
![](https://ws1.sinaimg.cn/large/006Xrlj6gy1fpsavlllzvj30b1045747.jpg)  

![](https://ws1.sinaimg.cn/large/006Xrlj6gy1fpsaykxo8wj30qf09pdhh.jpg)  

![](https://ws1.sinaimg.cn/large/006Xrlj6gy1fpsaz38u0uj30b503n747.jpg)  

### 参考资料
[我的脚本-tomcat部署](https://github.com/Lianyi-xz/ansible-examples/tree/master/tomcat-install)  
[我的脚本-项目发布](https://github.com/Lianyi-xz/ansible-examples/tree/master/tomcat-deplay)
[我的zabbix部署脚本](https://github.com/Lianyi-xz/ansible-examples/tree/master/zabbix)  
[ansible-examples](https://github.com/ansible/ansible-examples)  