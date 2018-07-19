title: Linux 图片压缩
tags: OS
categories: Linux
date: 2018-07-19 11:39:00
---
### 安装ImageMagick
```bash
yum install -y ImageMagick
```
### convert命令简介
```bash
#参数 
  -resize                #改变图片尺寸 
  -quality 0-100         #降低图片质量 
  -rotate                #旋转图片
```
### 使用
```bash
#获取图片的尺寸
  identify test.png
#修改图片格式
  convert test.png test.jpg 
#批量修改图片格式
  for %f in (*.jpg) do convert "%f" "%~nf.png" 
#改变图片大小
  convert -resize 1024x768  test.jpg   test1.jpg
  convert -sample 50%x50%  test.jpg   test1.jpg
#图像顺时针旋转270度 
  convert -rotate 270 test.jpg   test2.jpg
#图像的10,80 位置采用60磅的全黑Helvetica字体写上 Hello, World! 
  convert -fill black -pointsize 60 -font helvetica -draw 'text 10,80 "Hello, World!"'  test.jpg  hello.jpg
```
<!-- more -->
### 压缩图片脚本
```bash
cat convert.sh 

#!/bin/bash
# >50k
find  /png/upload/path/ -regex '.*\(jpg\|JPG\|png\|PNG\|jpeg\)' -size +50k -exec convert -resize 350x350 -quality 60 {} {} \;

# >100k
find  /png/upload/path/ -regex '.*\(jpg\|JPG\|png\|PNG\|jpeg\)' -size +100k -exec convert -resize 300x300 -quality 60 {} {} \;
find  /png/upload/path/ -regex '.*\(jpg\|JPG\|png\|PNG\|jpeg\)' -size +100k -exec convert -resize 80%x80% -quality 60 {} {} \;

# >200k
find  /png/upload/path/ -regex '.*\(jpg\|JPG\|png\|PNG\|jpeg\)' -size +200k -exec convert -resize 250x250 -quality 60 {} {} \;
find  /png/upload/path/ -regex '.*\(jpg\|JPG\|png\|PNG\|jpeg\)' -size +200k -exec convert -resize 70%x70% -quality 60 {} {} \;

#设置定时任务
crontab -l
10 2 * * * bash /root/convert.sh
```

### 参考资料
[从60秒到1.44秒网站访问速度41倍优化历程](http://url.cn/5EU6ci1)  
[linux中convert用法](http://www.cnblogs.com/robben/p/4315123.html)  