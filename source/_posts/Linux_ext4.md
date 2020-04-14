title: Centos6 文件(ext4)恢复
tags: 系统
categories: 运维
date: 2018-03-08 19:04:00
---
>ext4文件系统上恢复删除文件(extundelete)  
ext3文件系统上恢复删除文件(ext3grep)

### linux 文件系统简介
 
| super block | inode | block |
| :---:   | :-------: | :-------: |
| 记录inode和block信息 | 记录某文件权限、属性、block号码 | 记录某文件实际数据 |
<!-- more -->
```bash
#查看文件
ls -i  a.txt
#查看文件inode号
ls -i a.txt
#查看inode中包含的内容
stat a.txt
```
### extundelete简介
* extundelete通过inode来获得当前文件系统下所有文件的信息（包括存在的和已经删除的文件)
* extundelete使用inode信息结合日志去查询该inode所在的block位置，包括直接块，间接块等信息
* extundelete使用dd命令将这些信息备份出来，从而恢复数据文件
* extundelete在恢复文件的时候不能自动创建空文件和目录
* 文件误删除后第一时间卸载或以只读的方式挂载

### 安装extundelete
```bash
#安装依赖包
yum install e2fsprogs-devel
#解压压缩包
tar jxvf extundelete-0.2.4.tar.bz2 
#安装 extundelete
cd extundelete-0.2.4
 ./configure --prefix=/usr/local/extundelete 
 make  -j 4 
 make install 
 #验证
 cd /usr/local/extundelete/bin   
./extundelete -v  
 #添加环境变量
 vim /etc/profile 
 export PATH=/usr/local/extundelete/bin:$PATH 
 source /etc/profile
```

### 安装 psmisc
```bash
#安装
yum install psmisc
#强制卸载被占用的分区
fuser -k 挂载点
```

### extundelete用法详解
```bash
#命令格式：
  extundelete [options] [action] device-file
#option
  --version, -[vV]，显示软件版本号。
  --help，显示软件帮助信息。
  --superblock，显示超级块信息。
  --journal，显示日志信息。
  --after dtime，时间参数，表示在某段时间之后被删的文件或目录。
  --before dtime，时间参数，表示在某段时间之前被删的文件或目录
#action
  --inode ino，显示某节点“ino”的信息，ext4文件系统的分区根目录的inode值为2，xfs分区根目录的inode值为64。 
  --block blk，显示数据块“blk”的信息。
  --restore-inode ino[,ino,...]，恢复命令参数，表示恢复节点“ino”的文件，恢复的文件会自动放在当前目录下的RESTORED_FILES文件夹中，使用节点编号作为扩展名。
  --restore-file 'path'，恢复命令参数，表示将恢复指定路径的文件，并把恢复的文件放在当前目录下的RECOVERED_FILES目录中。
  --restore-files 'path'，恢复命令参数，表示将恢复在路径中已列出的所有文件。
  --restore-all，恢复命令参数，表示将尝试恢复所有目录和文件。
  -j journal，表示从已经命名的文件中读取扩展日志。
  -b blocknumber，表示使用之前备份的超级块来打开文件系统，一般用于查看现有超级块是不是当前所要的文件。
  -B blocksize，表示使用数据块大小来打开文件系统，一般用于查看已经知道大小的文件。
```

### extundlete恢复数据
```bash
#查看分区信息
df -T
  /dev/sda4     ext4      41152832 13145604  25893744  34% /home
#卸载分区
umount /home/   #如果卸载失败，就用命令"fuser -k /home"结束使用此分区的进程树
#进入存放恢复数据目录
cd /test
#通过inode查看被删除文件名称
extundelete /dev/sda4 --inode 2
  lost+found                11
  passwd                    12             Deleted
  hosts                     13             Deleted
  a                         7313           Deleted
#通过inode恢复
extundelete /dev/sda4 --restore-inode 12
  /test/RECOVERED_FILES/file.12    #文件恢复为
#通过文件名恢复
extundelete /dev/sda4 --restore-file passwd  #文件名为已下载挂载点的相对路径
  /test/RECOVERED_FILES/passwd 
#通过目录恢复
extundelete /dev/sda4 --restore-directory a
  /test/RECOVERED_FILES/a/
#恢复所有文件
extundelete /dev/sda4 --restore-all
```

### 恢复根下文件
* 立即断电，然后把磁盘以只读方式，挂载到另一个电脑中进行恢复
* 把extundelete在虚拟机上（虚拟机系统要和服务器版本一样），提前安装好后再复制到U盘中，\
    把U盘插入服务器，恢复时，恢复的文件要保存到U盘中，（不要让恢复的数据写到/下，那样会覆盖之前删除的文件） 
    
### 参考资料
[鸟哥的linux私房菜](http://linux.vbird.org/linux_basic/0230filesystem.php#harddisk-inode)  
[Linux下高效数据恢复软件extundelete应用实战](http://blog.51cto.com/ixdba/1566856)  
[extundelete文档](http://extundelete.sourceforge.net/)  
[extundelete下载](https://sourceforge.net/projects/extundelete/)  