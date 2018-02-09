title: Shell awk命令
tags: Shell
categories: Linux
date: 2018-02-09 14:12:00
---
### awk与sed比较
* sed常作用于一整行的出来，awk倾向于将一行分为数个字段来处理
* awk主要是处理每一行的字段内的数据，而默认的字段的分隔符为空格键或tab键
   
### awk语法
```bash
awk [-F|-f|-v] 'BEGIN{} //{command1; command2} END{}' file
  -F           #指定分隔符
  -f           #调用脚本
  -v           #定义变量 var=value
  '  '         #引用代码块
  BEGIN        #初始化代码块，对每一行进行处理之前，初始化代码，主要是引用全局变量，设置FS分隔符
  //           #匹配代码块，可以是字符串或正则表达式
  {}           #命令代码块，包含一条或多条命令
  ;            #多条命令使用分号分隔
  END          #结尾代码块，对每一行进行处理后执行的代码块，主要进行最终计算或输出结尾摘要信息
```
<!-- more -->
### 逻辑运算符
```bash
 >
 <
 >=
 <=
 ==
 !=
```
### 匹配代码块
```bash
  //             #纯字符匹配   
  !//            #纯字符不匹配   
  ~//            #字段值匹配    
  !~//           #字段值不匹配   
  ~/a1|a2/       #字段值匹配a1或a2 
```
### 格式化输出
```bash
#以netstat命令为例
netstat -anp|awk '{printf "%-8s %-8s %-10s\n",$1,$2,$3}' 
  printf        #表示格式输出
  %             #格式化输出分隔符
  -8            #长度为8个字符
  s             #表示字符串类型
```

### awk内置变量
```bash
#变量名称      代表意义
   $1             #每行第一个字段
   NF             #字段数量变量
   NR             #每行的记录号，多文件记录递增
   FNR            #与NR类似，不过多文件记录不递增，每个文件都从1开始
   \t             #制表符
   \n             #换行符
   FS             #BEGIN时定义分隔符
   RS             #输入的记录分隔符， 默认为换行符(即文本是按一行一行输入)
   ~              #匹配，与==相比不是精确比较
   !~             #不匹配，不精确比较
   ==             #等于，必须全部相等，精确比较
   !=             #不等于，精确比较
   &&　           #逻辑与
   ||             #逻辑或
   +              #匹配时表示1个或1个以上
   /[0-9][0-9]+/  #两个或两个以上数字
   /[0-9][0-9]*/  #一个或一个以上数字
   FILENAME       #文件名
   OFS            #输出字段分隔符， 默认也是空格，可以改为制表符等
   ORS            #输出的记录分隔符，默认为换行符,即处理结果也是一行一行输出到屏幕
   -F'[:#/]'      #定义三个分隔符 
```
### 实例
```bash
##aa
#不显示第一行
route -n|awk 'NR!=1{print}' 

#输出不匹配mysql的行
awk '!/mysql/{print $0}' /etc/passwd

#区间匹配 
awk -F: '/mail/,/mysql/{print}' /etc/passwd 

#if语句
awk -F: '{if($1~/mail/) {print $1} else {print $2}}' /etc/passwd 
#if语句简单写法
cat catalina.out| grep 'request end'|awk '$11>90{print $1" "$2"\t"$3"\t"$11}'

#条件表达式
awk '$11 >1000 { print $1" "$2"\t"$3"\t"$11}'

#逻辑运算符：&&　|| 
#逻辑与 &&：  $1匹配mail，并且$3>8 
awk -F: '$1~/mail/ && $3>8 {print }' /etc/passwd       

#数值运算
#第三个字段加10打印 
awk -F: '/mysql|mail/{print $3+10}' /etc/passwd
#减法
awk -F: '/mysql/{print $3-$4}' /etc/passwd

#输出字段1,3,6，以制表符作为分隔符
awk  -F: '{print $1,$3,$6}' OFS="\t" /etc/passwd

#获取带指定关键字的最后一行
tail -n 200 catalina.out |grep 'request end' |awk 'END{ print $1" "$2}'

#统计当前目录下不同用户的文件数量
ls -l|awk 'NR!=1 && !/^d/{sum[$3]++} END \
   {for (i in sum) printf "%-6s %-5s %-3s \n",i," ",sum[i]}'
```
### 参考资料
[Awk学习笔记](http://www.kuqin.com/docs/awk.html)  
[使用awk进行文本处理](http://www.cnblogs.com/luchen927/archive/2012/01/20/2325359.html)  
[awk学习](http://blog.chinaunix.net/uid-23302288-id-3785105.html)  
[鸟哥的linux私房菜](http://linux.vbird.org/linux_basic/0330regularex.php#awk)