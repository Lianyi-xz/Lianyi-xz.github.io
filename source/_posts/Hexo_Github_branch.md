title: Hexo 跨主机写作
tags: Hexo
categories: other
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

### 将hexo设置为默认分支
![](https://ws1.sinaimg.cn/large/006Xrlj6gy1fo5dmap5zfj30t60bh3zn.jpg)

### 迁移博客原文件
* 删除 d/hexo/Lianyi-xz.github.io 中文件
* 将博客原文件复制到 d/hexo/Lianyi-xz.github.io 中
