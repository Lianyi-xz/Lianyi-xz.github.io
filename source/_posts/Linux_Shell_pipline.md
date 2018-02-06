title: Shell 重定向与管道
tags: Shell
categories: Linux
date: 2018-01-10
---

### 数据重定向
>标准输入stdin：代码为0，使用<或<<  
 准输出stdout：代码为1，使用>或>>  
 标准错误输出stderr：代码为2，使用2>或2>>  
\>输出到一个已存在的文件中，那个文件就会被覆盖掉  
\>>输出到一个已存在的文件中，数据会在文件最下方累加进去  
#### 案例
find /home -name .bashrc 2> /dev/null     stderr被丢弃  
find /home -name .bashrc &> /dev/null    所有输出被丢弃  

命令执行的判断依据 ` ； && ||`
<!-- more -->
### 管道命令
 >仅处理经由前面一个命令传来的正确信息

* 选取命令cut，grep
```bash
cut -dfc
  -d    后跟分割符号
  -f     依据-d的分割字符将遗传信息分割成数段，-f取出第几段  -f 3  -f 3,5
  -c     以字符的单位取出固定字符区间    12-   12-20

grep -acinv '查找字符串' filename
  -a   将二进制文件以txt文件的方式查找 
  -c   计算找到'查找字符串'的次数
  -i    忽略大小写
  -n   输出行号
  -v   反向选择，输出没有'查找字符串'内容的行
```
* 排序命令 sort、wc、uniq
```bash
sort -fbMnrtuk [file or stdin]
  -f      忽略大小写差异
  -b     忽略最前端空格
  -M    以月份来排序
  -n     使用纯数字进行排序，默认以文字类型来排序
  -r      反向排序
  -u     uniq 相同的数据仅出现一行代表
  -t      分隔符，默认是用Tab键来分隔
  -k     以那个区间[field]来进行排序的意思

wc  -lwm
  -l        仅列出行
  -w      仅列出多少字
  -m     多少字符

uniq -ic
  -i       忽略大小写
  -c      进行计数
```
   
* 双向重定向 tee
```bash
tee
  同时将数据流送与文件与屏幕
```
* 字符转换命令 tr、col、join、paste、expand
```bash
tr -ds set1 ...
  -d      删除信息中set1这个字符串
  -s       替换掉重复的字符       

col -xb
  -x      将tab键转化成对等的空格键
  -b      在文字中有/时，仅保留/最后接的字符

join -ti12 file1 file2
  -t      默认以空格符分隔数据，并对比第一个字段的数据，若两个文件相同，则将两条数据连成一行
  -i       忽略大小写差异
  -1      代表第一个文件要用那个字段来分析
  -2      代表第二个文件要用那个字段来分析

paste -d file1 file2  直接将两行贴在一起，中间用tab隔开
  -d       分隔符号，默认tab
  -         若file写成-，表示来自stdin 的数据

expand -t file
  -t         将tab转化成空格键，一般 一个tab可用8个空格键替换，也可以自定义一个tab代表多少字符
```
* 切割命令 split
```bash
split -bl file PREFIX
  -b        跟准备切割成的文件大小，可加单位，例如b,k,m等等
  -l         以行数来切割
  PREFIX    代表前导符，可作为切割文件的前导文字
```
* 参数代换 xargs
```bash
很多命令不支持管道命令，因此可以通过xargs 来提供该命令引用stdin只用
xargs -0pen  command
  -0        输入的stdin中的特殊字符转化为一般字符
  -p        在执行每个命令的参数时，都会询问用户的意思     
  -e        end of file的意思
  -n        次数，每次command命令执行，要使用几个参数的意思
  echo '--help' | xargs cat
```
* 减号 -
```bash
    在管道中前一个命令的stdout可以作为这次的stdin，该stdin与stdout可以利用减号 - 来替代
```
 