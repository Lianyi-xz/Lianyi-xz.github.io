title: Shell sed命令
tags: Shell
categories: Linux
date: 2018-02-09 13:39:00
---
>sed本身是一个管道命令，可以分析standard input,还可以将数据进行替换、删除、新增、选取特定行等

### sed语法
```bash
#sed后跟的动作需要以两个单引号括住
sed -nefr 'command' [input-file]...
  -n                   #只列出经过sed特殊处理的行
  -e                   #在命令行模式上进行sed的动作编辑
  -f                   #将sed的动作写在一个文件内
  -r                   #支持扩展性正则表达式的语法
  -i                   #直接修改读取的文件内容，而不是屏幕输出             
```
<!-- more -->
### command说明
```bash
n1,n2 function
#command需要以两个单引号括住
#n1,n2 可不存在，代表动作所执行的所在行数       

#function参数
 a                    #新增，a后面跟的字符串会在新的下一行出现，
 c                    #替换，c后面跟的字符串可以替换n1-n2之间的行
 d                    #删除，一般不接参数
 i                    #插入，i后面跟的字符串会在新的上一行出现，
 p                    #打印，将某个选择的数据打印出来，通常与sed -n 一起运行
 s                    #替换，可搭配正则表达式  eg: 1,20s/old/new/g
```

### 实例
```bash
#匹配catalina.out文件中指定字符串，并将匹配行输出到catalina.log
sed -n '{/stop/p;/destory/p;/failed/p;/expection/p}' catalina.out >catalina.log

#列出文件内容，并将2-5行删除
nl /etc/passwd |sed '2,5d'

#替换指定字符串
sed 's/要被替换的字符串/新字符串/g'

#多行合并成一行 eg 九行合并成一行
sed 'N;N;N;N;N;N;N;N;s/\n/\t/g' os_status.txt
 ```
### 参考资料
[Sed学习笔记](http://www.kuqin.com/docs/sed.html)