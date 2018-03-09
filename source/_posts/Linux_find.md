title: Linux find命令
tags: OS
categories: Linux
date: 2018-03-09 11:04:00
---
### 文件查找
* whereis    
* locate     非实时，模糊匹配，根据全系统文件数据库进行
* find       实时，精确，速度慢

<!-- more -->
### find用法详解
```bash
#命令格式
  find [path] [option] [action] 
#option
#与时间有关的参数
  -atime  查找在指定时间曾被存取过的文件或目录
  -ctime  查找在指定时间之时被更改的文件或目录
  -mtime  
    n     在n天之前的一天内被更改的文件或目录
    +n    n天之前被更改的文件或目录
    -n    n天之内被更改的文件或目录
#与用户或用户组有关的参数
  -uid n
  -gid n
  -user name
  -group name
  -nouser      寻找文件的所有者不存在/etc/passwd的人
  -nogroup     寻找文件的所有用户组不存在/etc/group中的文件
#与文件权限及名称有关的参数
  -name  filename   查找文件名为filename的文件
  -iname filename   不区分大小写
  -regex            根据正则查找
  -type TYPE        根据文件类型查找
    f     文件
    d     目录 
    c、b  设备文件
    l     连接文件
    p     FIFO
    s     socket
  -size [+|-] SIZE   根据尺寸查找 [+|-] kMG  大于|小于 nkMG的文件
  -perm
    mode             权限等于mode的文件
    +mode            权限包含任一mode的文件
    -mode            权限必须全部包括mode的文件
#其它参数
  -exec command      -exec后跟命令处理查找到的结果
  -print             将结果输出到屏幕
```

### 实例
```bash
#查找/var目录下属主为root且属组为mail的所有文件
find /var -user root -group mail

#查找/usr目录下不属于root，bin，或student的文件
find /usr -not -user root -a -not -user bin -a -not -user student
find /usr -not \(  -user root -o -user bin -o -user student \)

#查找/etc目录下最近一周内内容修改过且不属于root及student用户的文件
find /etc -mtine 7 -not -user root -a  -not -user student 
find /etc -mtine 7 -not \( -user root -o  -user student \)

#查找当前子同上没有属主或属组且最近1天内曾被访问过的文件，并将其属主属组修改为root
find /  \( -nouser -o -nogroup \) -a -atime -1 -exec chown root:root {} \;

#查找/etc目录下大于1M的文件，并将其文件名写入/tmp/etc.largefiles文件
find /etc -size +1M >> /tmp/etc.largefiles

#查找/etc目录下所有用户都没有写权限的文件，显示出其详细信息
find /etc -not -perm /222 -ls
```
### 参考资料
[鸟哥的linux私房菜](http://linux.vbird.org/linux_basic/0220filemanager.php#file_find_file)  