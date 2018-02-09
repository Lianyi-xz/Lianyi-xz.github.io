title: Shell 判断式
tags: Shell
categories: Linux
date: 2018-02-09 14:50:00
---
### 判断符号 []
* 中括号[ ] 内的每一个组件都需要有空格键来分隔
* 中括号[ ] 内的变量，最好都以双引号括号起来
* 中括号[ ] 内的常量，最好都以单或双引号括号起来
<!-- more -->

```bash
#数字测试  
-ne           #比较两个参数是否不相等
-lt           #参数1是否小于参数2
-le           #参数1是否小于等于参数2
-gt           #参数1是否大于参数2
-ge           #参数1是否大于等于参数2
#其它测试
-f "somefile" #判断是否是一个文件
-x "/bin/ls"  #判断/bin/ls是否存在并有可执行权限
-n "$var"     #判断$var变量是否有值
"$a" = "$b"   #判断$a和$b是否相等
-r file       #用户可读为真
-w file       #用户可写为真
-x file       #用户可执行为真
-d file       #文件为目录为真
-c file       #文件为字符特殊文件为真
-b file       #文件为块特殊文件为真
-s file       #文件大小非0时为真
-t file       #当文件描述符(默认为1)指定的设备为终端时为真 
```
### 测试命令 test
```bash
#文件判断
#test -e file
  -e         #文件名是否存在
  -f         #文件名是否存在且为文件
  -d         #文件名是否存在且为目录
  -rwxugks   #文件名是否存在且具有 读/写/执行权限  SUID/SGID/Sticky bit 属性 空白文件

#文件比较
#test file1 -nt -ot -ef file2
  -nt        #file1 比 file2 新  
  -ot        #file1 比 file2 旧
  -ef        #file1 比 file2 相等

#数值比较
#test n1 -eq n2
  -eq         #n1 和 n2 相等
  -ne         #n1 和 n2 不等
  -gt         #n1 和 大于
  -lt         #n1 和 小于
  -ge         #n1 和 大于等于
  -le         #n1 和 小于等于    

#字符串判断          
#test -z str
  -z          #字符串为空返回true
  -n          #字符串为空返回false

#字符串比较
#test str1 == str2
  ==          #字符串相等返回true
  !=          #字符串不等返回true 
```

### if 语句
```bash
if [ condition]; then
    #执行命令
else/elif [ condition ]; then
    #执行命令
else
    #执行命令
fi

```
### case语句
```bash
case $变量名称 in                 #关键字为case，还有变量前有$
         "第一个变量内容")        #变量内容建议用双引号括起来，关键字则为小括号
        #程序段
       ;;                        #每个类型结尾使用两个连续的分号来处理！
    *）                          #最后一个变量内容都会用*来代表所有其他值
       #不包含其他程序执行段
       exit 1
       ;;
esac
```
### 参考资料
[鸟哥的linux私房菜](http://linux.vbird.org/linux_basic/0340bashshell-scripts.php#dis)  