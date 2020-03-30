title: First Blog
tags: Hexo
categories: other
date: 2018-01-08
---
### 前提条件
* 安装 [git](https://git-scm.com/downloads)
* 安装 [node.js](https://nodejs.org/en/)

### win10安装Hexo
```shell
#git bash
npm install hexo-cli -g
npm install hexo-generator-sitemap --save
npm install hexo-generator-baidu-sitemap --save
hexo -v
```
<!-- more -->
### Hexo设置
```shell
#hexo初始化
hexo init Blog
git clone --branch v5.1.2 https://github.com/iissnan/hexo-theme-next themes/next
```

### git设置
``` bash
deploy:
  type: git
  repo:
    github: git@github.com:Lianyi-xz/Lianyi-xz.github.io.git
    coding: git@git.coding.net:lianyizhiwai/lianyizhiwai.coding.me.git
  branch: master
```
### 常用命令
```bash
#本地运行博客
hexo server
#博客部署到github 和coding仓库
hexo clean
hexo g
hexo d
#源码保存到github仓库
git add .
git commit -m "source update"
git push
```
### 跨主机写作
1. 创建hexo分支
1. 将hexo设置为默认分支
1. 部署hexo

### 参考资料
[NexT主题文档](http://theme-next.iissnan.com/getting-started.html)  
[NexT第三方服务](http://theme-next.iissnan.com/third-party-services.html#algolia-search)  
[分类和标签](https://hexo.io/zh-cn/docs/front-matter.html#分类和标签)  
[底部动画](https://leaferx.online/2017/01/30/Bottomheart/)  
[NexT个性化](http://blog.csdn.net/qq_33699981/article/details/72716951)  
[hexo+github](https://www.jianshu.com/p/189fd945f38f)  
[hexo neat压缩](https://segmentfault.com/a/1190000008082288)  
[coding blog](https://coding.net/pages/)  
[Blog SEO](https://www.jianshu.com/p/86557c34b671)  
[Blog SEO](http://blog.csdn.net/sunshine940326/article/details/70936988)