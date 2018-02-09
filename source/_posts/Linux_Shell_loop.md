title: Shell 循环语句
tags: Shell
categories: Linux
date: 2018-02-09 15:50:00
---
### while循环
```bash
#condition成立就进行循环
while [ condition ]      #中括号内的状态就是判断式
do                       #do 是循环的开始
    程序段落
done                     #done是循环的结束
```
<!-- more -->
### untill循环
```bash
#condition不成立就进行循环
untill [ condition ]     
do  
    程序段落
done      
```
### for循环
```bash
for var in con1 con2 con3...
do
      程序段
done

for do done 的数值处理
for (( 初始值；限制值；执行步长 ))
do
      程序段
done

for i in {1..10}
do
   echo $i
done
```
