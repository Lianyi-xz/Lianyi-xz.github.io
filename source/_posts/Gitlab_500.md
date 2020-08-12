---
title: Gitlab 500 异常
tags: 服务
categories: 技术
date: 2020-05-12  17:21:00
---

> 生产gitlab首页无法打开，但其仍可使用，本着作死就会死的运维原则，并未对其进行处理。直到我突然意识到博客很久没更新了……

### 事前处理
1. 通知相关人员在gitlab备份期间暂停操作
1. 对gitlab进行备份
1. 备份结束，回复已可以使用
```bash
#备份命令
/opt/gitlab/bin/gitlab-rake gitlab:backup:create
```
<!-- more -->
### 故障定位

#### 查询首页相关日志

&emsp;&emsp;通过gitlab日志，查看首页报错信息
```bash
[root@gitlab /] gitlab-ctl tail

Read fragment views/groups/35-20190404022043923436000/projects/1257-20200506024431898030000/root/show/b123046d400b7ca62dcd2f85b982165e (0.1ms)
Completed 500 Internal Server Error in 265ms (ActiveRecord: 34.3ms)

ActionView::Template::Error (Object not found - failed to find pack entry (b6726fa8bf5df962cc3ece92a4053a2234ac5127)):
    2:  ......
```
&emsp;&emsp;打开gitlab 首页时发现日志报错，内容为首页渲染到群组`35-20190404022043923436000`的项目`1257-2020050602443189803000` 渲染失败报错的 
```bash
#已知情况
群组编号：???: 35-20190404022043923436000
项目编号：???: 1257-2020050602443189803000 
```
####  获取群组信息
&emsp;&emsp;通过gitlab api，获取群组信息，由于生产gitlab 版本较低，经过多次尝试后，发现仅v3接口可用
```bash
# 获取所有群组  token为个人用户私人token
[root@gitlab /] curl -H "PRIVATE-TOKEN: <token>" http://172.16.0.1/api/v3/groups
```
&emsp;&emsp;将返回json 数据复制到`https://www.json.cn/` 中发现id:`35` 对应的`native`群组，打开其他群组和native群组页面  
```bash
[root@gitlab /] gitlab-ctl tail
Read fragment views/groups/35-20190404022043923436000/projects/1257-20200506024431898030000/groups/show/b123046d400b7ca62dcd2f85b982165e (0.1ms)
Completed 500 Internal Server Error in 321ms (ActiveRecord: 18.2ms)

ActionView::Template::Error (Object not found - failed to find pack entry (b6726fa8bf5df962cc3ece92a4053a2234ac5127)):
    2:  ......
```
&emsp;&emsp;发现其他群组页面均可打开，native群组仍然报错500，由此确认id为`1257` 的项目异常导致的gitlab 异常  
```bash
#已知情况
群组编号：native: 35-20190404022043923436000
项目编号：???: 1257-2020050602443189803000 
```

#### 获取项目信息
&emsp;&emsp;尝试通过api接口获取相关信息  
```bash
[root@gitlab /]curl -H "PRIVATE-TOKEN: <token>" http://172.16.0.1/api/v3/projects/1257
{"message":"500 Internal Server Error"}
[root@gitlab /] curl -H "PRIVATE-TOKEN: <token>" http://172.16.0.1/api/v3/projects/1061
[{"id":1061,"description":"",.....}]
```
&emsp;&emsp;由于项目有异常，无法通过接口获取项目信息。猜测项目元数据应存在`Redis`或`PostgerSQL`中，通过数据库可查询`1257`为那个项目。其后发现该服务没有终端连接工具，结束。  
&emsp;&emsp;已知打开首页和群组页面报错，推断可得出打开`1257`项目页面也会报错，可通过打开所有项目页面方式找出`1257`项目。
```bash
#进入gitlab 存储库
[root@gitlab /] cd /var/opt/gitlab/git-data/gitlab-satellites/
#查询群组和项目共文件夹数量
[root@gitlab gitlab-satellites]# find ./ -name "*" -type d -maxdepth 2 |wc -l
2414
#查询群组文件夹数量
[root@gitlab gitlab-satellites]# find ./ -name "*" -type d -maxdepth 1 |wc -l
42
#2414-42=这个活不能做
```
&emsp;&emsp;经过查阅相关文档发现，不仅仅可以通过`id` 还可以通过`项目名`获取项目信息
```bash
#获取native 群组下 所有项目
[root@gitlab native] ll |awk  '{print $9}'
#编写curl脚本
vim curl.sh
#!/bin/bash
name="
project_name
"
for i in $name 
do
   curl -H "PRIVATE-TOKEN: <token>" http://172.16.0.1/api/v3/projects?search=$i > $i.txt 
done
#运行脚本
sh curl.sh
#查看报错500项目
grep "500 " *

#已知情况
群组编号：native: 35-20190404022043923436000
项目编号：tomcat-data: 1257-2020050602443189803000 
```

#### 存储库修复
```bash
[root@gitlab tomcat-data.git]# cd gitlab/repositories/<namespace>/<reponame>.git
#检查仓库一致性
[root@gitlab tomcat-data.git]# git fsck
fatal: object 13d581f3f22d589c3cd369cce29e066268a361f3 is corrupted
#删除空白文件
[root@gitlab tomcat-data.git]# find . -size 0 -delete
#检查仓库一致性
[root@gitlab tomcat-data.git]# git fsck
error: HEAD: invalid sha1 pointer b6726fa8bf5df962cc3ece92a4053a2234ac5127
error: refs/heads/master does not point to a valid object!
notice: No default references
dangling commit 632b34c07b90e704c984015ea52f6031af208771
# 发现refs/heads/master为空 且存在悬挂commit,将该commit写入master
[root@gitlab tomcat-data.git]# echo "commit 632b34c07b90e704c984015ea52f6031af208771" >refs/heads/master
```
打开项目页面成功

### 参考文档
[API Docs](https://docs.gitlab.com/ee/api/README.html)  
[git gc和fsck的用法](https://www.cnblogs.com/dylancao/p/6625431.html)  
[gitlab查看项目ID/projectId](https://www.cnblogs.com/amyzhu/p/8988519.html)  
[gitlab-repository-corrupted-showing-500-error-on-frontend](https://stackoverflow.com/questions/36546774/gitlab-repository-error-failed-to-find-pack-entry)

