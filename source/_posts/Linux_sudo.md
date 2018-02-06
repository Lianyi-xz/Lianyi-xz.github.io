title: Linux sudo详解
tags: OS
categories: Linux
date: 2018-01-29
---
> 使得用户以其他用户的身份通过主机执行命令

### 简介
```bash
#默认保存权限5分钟
#配置文件
/etc/sudoers

#语法
#谁   在那个主机=(以谁的身份)  执行什么命令
who   which_hosts=(runas)      commands  
eg：
 xx   ALL=(root)  /usr/sbin/useradd,/usr/sbin/usermod
sudo
  -k   #不保存权限
  -l   #列出当前用户可以使用的所有的sudo类命令
```
<!-- more -->

### 别名
```bash
#别名必须全部而且只能使用大写英文字母
#可使用！ 取反

#用户别名
who:User_Alias
User_Alias USERADMIN=
    #用户的用户名
    #组名，使用%引导
    #还可以包含其它已经定义的用户别名

#主机别名
which_hosts:Host_Alias
    #主机名
    #ip
    #网络地址
    #其他主机别名
    
#运行用户别名
 runas:Runas_Alias
    #用户名
    #%组名
    #其他Runas别名
    
#命令别名
command:Cmnd_Alias
    #命令路径
    #目录(此目录内的所有命令)
    #其他事先定义过的命令别名
```

> 已经看不懂了.....