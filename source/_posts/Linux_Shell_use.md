title: Shell 小技巧
tags: Shell
categories: Linux
date: 2019-06-13 18:10:00
---
> 我使用过的 Shell 小套路

#### 按行读取文件内容
```bash
 #key-value
	while read line; do
		key=${line%=*}
		value=${line#*=}
	done < ./config.sh
```
<!-- more -->
#### 导入配置文件
```bash
source ./config.ini
```

#### 获取默认变量
```bash
#获取第一个变量
$1
#获取第二到最后一个变量
${@:2}
```

#### 截取变量字符串
```bash
#获取第一个/ 之前的字符
${file%%/*}
#获取第一个/ 之后的字符
${file#*/}
#获取最后一个/ 之前的字符
${file%/*}
#获取最后一个/ 之后的字符
${file##*/}
```
#### 判断变量子串
```bash
if [[ $(echo $tag | grep "release") == "" ]];then exit 0;fi
#从第0个位置数7个字符
if [[ ${tag:0:7} -ne 'release' ]];then exit 0;fi
```