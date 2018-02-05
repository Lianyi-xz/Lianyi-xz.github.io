title: Linux 文件与目录
tags: OS
categories: Linux
---
### 目录简单使用
#### linux路径
* 相对路径(basename)：从某一非根目录开始的路径
* 绝对路径(dirname)：从根目录开始的路径

#### 处理目录
* cd：切换目录
* pwd： 显示当前目录
* mkdir： 新建目录
* rmdir： 删除目录
* ls：查看当前目录下的文件
<!-- more -->
### 文件简单使用
#### 文件类型
* d：目录
* l：连接文件 linkfile
* b：设备文件里面的可供存储的接口设备
* c：设备文件里的串行端口
#### 文件查看
* cat：查看文件全部内容
* more：分屏向后查看文件内容
* less：分屏前后翻查看文件内容
* head：从头查看数行文件内容
* tail：从后查看数行文件内容
#### 文本处理
* cut：选取命令,设置分隔符进行剪切
* join：拼接
* sed：管道命令 按行处理
* awk：分析
* sort：排序 
* uniq：显示重复
* grep：查找
* diff：比较文件之间不同