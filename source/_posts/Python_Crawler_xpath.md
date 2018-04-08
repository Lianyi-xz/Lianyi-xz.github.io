title: 爬虫：xpath 提取数据
tags: 爬虫
categories: Python
date: 2018-01-25
---
### lxml 安装
```bash
pip install lxml
```
### xpath引用
```bash
from lxml import etree
```
<!-- more -->

### XPath表达式
```bash
#XPath基本语法
  /    #从根节点选取
  //   #选择任意位置的某个节点
  |    #选取若干个路径
  .    #选取当前节点
  ..   #选取当前节点的父节点
  @    #选取属性

/text()  #提取文本内容
/@xxxx   #提取属性内容
//td                                #选择所有的td元素
//div[@calss="mine"]                #选择所有具有class=mine属性的div元素
<html>.xpath("/html/head/title")    #选择html中head标签的title元素
```
### Chrome 获取xpath
1. 打开Chrome浏览器
1. 进入开发者工具
1. 右键相应标签-Copy-Copy XPath


### 参考资料
[我的脚本](https://github.com/Lianyi-xz/amap-Python/blob/master/nj/crawl.py)