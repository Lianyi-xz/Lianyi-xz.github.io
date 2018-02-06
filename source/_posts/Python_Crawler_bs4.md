title: 爬虫：Beautiful Soup库-提取数据
tags: 爬虫
categories: Python
date: 2018-01-25
---
### beautifulsoup安装
```bash
  pip install beautifulsoup4
```
### beautifulsoup引用
```bash
  from bs4 import BeautifulSoup
  import bs4
```
### Beatiful Soup类基本元素 
```bash
  Tag                #标签             <tag> 整个html文件
  Name               #标签的名字        <tag>.name
  Attributes         #标签属性          <tag>.attrs   数组形式
  NavigableString    #标签内容          <tag>.string
  Comment            #标签内容注释部分   <tag>.string
```
<!-- more -->
### Html内容遍历方法
```bash
 #上行遍历
    .parent            #父节点标签
    .parents           #节点先辈标签的迭代类型
 #下行遍历
    .contents          #子节点列表
    .children          #子节点的迭代类型
    .deseendants       #子孙节点的迭代类型
 #平行遍历(同一个父节点)
    .next_sibling      #下一个平行节点
    .previous_sibling  #上一个平行节点
    .next_siblings     #所有后续平行节点
    .previous_siblings #所有前续平行节点
```
### find_all方法
```bash
<tag>(..)  eq  <tag>.find_all(..)
soup(..)   eq  soup.find_all(..)

.find_all(name,attrs,recursive,string,**kwargs) 
  name：     #对标签名称的检索字符串
  attrs:     #对标签属性值的检索字符串，可标注属性检索
  recursive: #是否针对所有子孙节点搜索，默认True
  string:     #对标签内容进行检索
  
soup.find_all(id="link2")
soup.find_all("a", class_="sister")
soup.find_all("a", attrs={"class": "sister"})
```
### 参考文档
[我的脚本](https://github.com/Lianyi-xz/Crawler-learn/tree/master/bs4)  
[Beautiful Soup 4.2.0](https://www.crummy.com/software/BeautifulSoup/bs4/doc/index.zh.html)