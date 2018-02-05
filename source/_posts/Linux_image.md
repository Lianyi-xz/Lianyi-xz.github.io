title: Linux 中ASCII显示图片
tags: OS
categories: Linux
---
> 在ubuntu中实现，且并没有什么实用价值的小技能

### 安装ImageMagick
```shell
sudo  apt-get install imagemagick
```
### 安装aview
```shell
sudo apt-get install aview
```

### 执行转换命令
```shell
#psb.jpg 为需要转换的图片
asciiview psb.jpg -driver curses
```
<!-- more -->
### 效果展示
![](https://ws1.sinaimg.cn/large/006Xrlj6gy1flbrpat9goj30sq0ezqbq.jpg)
