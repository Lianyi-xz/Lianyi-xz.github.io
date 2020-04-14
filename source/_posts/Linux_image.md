title: Linux 中ASCII显示图片
tags: 系统
categories: 运维
date: 2018-01-10
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
<!-- more -->
### 执行转换命令
```shell
#psb.jpg 为需要转换的图片
asciiview psb.jpg -driver curses
```

### 效果展示
![](../images/Linux_image_01.jpg)
