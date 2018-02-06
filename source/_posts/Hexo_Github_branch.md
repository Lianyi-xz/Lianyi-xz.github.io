title: Hexo 跨主机写作
tags: Hexo
categories: other
date: 2018-02-05
---
> 创建github 分支，用以保存博客原文件

### 创建hexo分支
```bash
#创建hexo文件夹
mkdir d/hexo
cd d/hexo
#下载git文件
git clone https://github.com/Lianyi-xz/Lianyi-xz.github.io.git
#创建hexo分支
git checkout -b hexo
#提交到 hexo分支
git push --set-upstream origin hexo
```
<!-- more -->
### 将hexo设置为默认分支
![](https://ws1.sinaimg.cn/large/006Xrlj6gy1fo5dmap5zfj30t60bh3zn.jpg)

### 迁移博客原文件
* 删除 d/hexo/Lianyi-xz.github.io 中文件
* 将博客原文件复制到 d/hexo/Lianyi-xz.github.io 中
* 将themes目录以内中的主题的.git目录删除

### 提交hexo分支
```bash
git add .
git commit -m "source blog"
git push
```

###  部署hexo
```bash
#下载原文件
git clone https://github.com/Lianyi-xz/Lianyi-xz.github.io.git
#安装hexo
npm install hexo --save
npm install hexo-cli -g
npm install hexo-deployer-git --save
npm install hexo-generator-sitemap --save
npm install hexo-generator-baidu-sitemap --save
# 生成静态文件
hexo g
# 本地运行博客
hexo server
#博客内容上传到github
hexo g -d
# 运行提交hexo分支内容 来提交修改的hexo原文件
```

### 出现问题
```bash
#next主题自带git，删除.git文件仍然无法 git add
#解决
cd themes
git rm --cached next -f
```