---
title: Shell 小技巧
tags: 系统
categories: 技术
date: 2019-07-05 18:10:00
---
> 我使用过的 Shell 小技巧，不定期更新

#### 按行读取文件内容
```bash
 #key-value
	while read line; do
		key=${line%=*}
		value=${line#*=}
	done < ./config.sh

# while循环中调用ssh命令时，重定向给while命令的数据，会被ssh命令读走了，导致循环出问题
	while read line; do
		ip=${line%=*}
		data=${line#*=}
		ssh -q -n $ip "echo $data"
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
#### 查询调用指定ip的服务
```bash
for i in `netstat -anp | grep  ip |awk -F ' ' '{print $7}' | sort -rn | uniq |awk -F/ '{print $1}'`
do
	pwdi=`pwdx $i |awk '{print $2}' `
	cd $pwdi/bin 
	echo `pwd`
	#查看是否为tomcat
	ls |grep run.sh
	#查看是否为其他项目
	ls |grep catalina.sh
done
```

#### 通过中间主机建立ssh
```bash
ssh -t B ssh C
```

####  sshpass
```bash
#scp 不填写密码
sshpass -p password scp root@ip:/os/path/* /os/path
#互信不输入密码
sshpass -p password  ssh-copy-id root@ip
```

#### 网络命令
```bash
#抓包
tcpdump -i eth0 port 53 -s0 -vvv
#发送一个数据包
nc -vtzw 5 ip port
#临时监听TCP端口
nc -l port
```

#### 文件中插入字符块
```bash
cat <<'EOF'>>  /usr/local/nginx/conf/conf.d/nginx_upstream.conf
# 使用 该方式不会丢掉变量
EOF

cat /usr/local/nginx/conf/conf.d/nginx_upstream.conf
```

#### 压缩并加密文件
```bash
# 加密日志 不保留原gz文件
find -L /usr/local/$appname/logs -type f  -name "*gz" |xargs -i zip -m -rP passwd  {}.zip  {}
```