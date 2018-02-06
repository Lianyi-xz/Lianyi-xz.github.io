title: 爬虫：request库获取页面
tags: 爬虫
categories: Python
date: 2018-01-25
---
### requests安装
```bash
  pip install requests
```
### Requests
> Requests：对html操作

```bash
#Requests七个主要方法
  request()         #构造一个请求
  get()             #获取html网页
  head()            #获取html头信息
  post()            #向html提交post请求  增
  put()             #提交put请求         改(改所有字段)
  patch()           #提交局部修改请求     改
  delete()          #提交删除请求
 
#Requests库异常
  ConnectionError           
  HTTPError
  URLRequired               #url缺失
  TooManyRedirects          #最大重定向次数
  ConnectTimeout            #链接超时
  Timeout                   #请求超时
  
#获取一个网页
  r = requests.get(url)
  requests.get(url,params=None,**kwargs)
```
<!-- more -->
### Response
> Response：html返回内容

```bash
#Response对象的属性
  r.status_code              #http请求返回状态
  r.text                     #http响应内容的字符串形式
  r.encoding                 #http的头部猜测(charset)的响应内容编码方式
  r.apparent_encoding        #http内容中分析的响应内容编码方式
  r.content                  #http响应的二进制形式
  
#Response异常
  r.raise_for_status()    #判断r.status_code是否为200，否 返回异常
  
```

### **kwargs控制访问参数
```bash
  params           #字典或字节序列，作为参数添加到url中
  data             #字典、字节序列或文件对象,作为Request的内容
  json             #json格式的数据，作为Request内容
  headers          #字典，http定制头     hd = {'user-agent':'Chrome/10  '} Mozilla/5.0
  cookies          #字典或CookieJar,Request中的cookie
  auth             #元祖，支持HTTP认证功能
  files            #字典，传输文件         fs = {'file':open('data.xls','rb')}
  timeout          #设置超时时间，单位为秒
  proxies          #字典，设定访问代理服务器，可增加登录认证
  allow_redirects  #True/False 是否允许重定向
  stream           #是否立即下载内容 默认Ture
  verify           #ssl证书开关，默认True
  cert             #本地ssl证书路径
```


### 参考文档
[我的脚本](https://github.com/Lianyi-xz/Crawler-learn/tree/master/request)
[中文requests](http://cn.python-requests.org/zh_CN/latest/ )  
[英文requests](http://docs.python-requests.org/en/master/user/quickstart/#json-response-content)