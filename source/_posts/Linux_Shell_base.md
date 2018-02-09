title: Shell 基础
tags: Shell
categories: Linux
date: 2018-01-10
---
### 变量命名规则
1. 变量与内容使用 `=`号连接，`=`两边不加空格
1. 变量名仅以英文和数字命名，且英文开头
1. 转义字符`\ `,将特殊字符转换为一般字符
1. ${命令}为其它命令提供信息
1. ${变量}累加内容
<!-- more -->

### 变量
```bash
#查看环境变量
  env
#查看所有变量
  set
#查看所支持的语系
  locale
#以树状图显示进程之间的关系
  pstree
#声明变量类型
  declare/typeset -a 数组 -i 整数 -x 环境变量 -r只读
```

### shell script 默认变量
```bash
/path/to/scriptname opt1 opt2 opt3     
$0 脚本    文件名  $1    $2     $3脚本第n个参数 
       
$#      #后接参数的个数
$@      #代表"$1"、"$2"、"$3"、"$4" 每个变量是独立的
$*      #代表"$1c$2c$3c$4" ,c为分割字符，默认是空格键。
$$      #当前shell进程的id  即pid
$?      #上个命令的退出状态，或函数的返回值
```

### 调试和追踪
```bash
sh -nvx  xxx.sh
  -n     #不执行script，仅查询语法的问题
  -v     #在执行script之前，先将script的内容输出到屏幕上
  -x     #将使用到的script内容显示到屏幕上
```

### 参考资料
[Shell 数组](https://www.cnblogs.com/Joke-Shi/p/5705856.html)
