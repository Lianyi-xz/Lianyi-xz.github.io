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
### Next主题修改css
```css
vim themes/next/source/css_common_custom/custom.styl
// Custom styles.
.post {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 25px;
  box-shadow: 0 0 5px rgba(202, 203, 204, .5);
  -webkit-box-shadow: 0 0 5px rgba(202, 203, 203, .5);
  -moz-box-shadow: 0 0 5px rgba(202, 203, 204, .5);
  -o-box-shadow: 0 0 5px rgba(202, 203, 204, .5);
  -ms-box-shadow: 0 0 5px rgba(202, 203, 204, .5);
 }
  // 站点描述
.site-description {
    font-size: 16px;

}
  // 作者名
.site-author-name {
    font-family: 'Comic Sans MS', sans-serif;
    font-size: 20px;
}

// 文章之间的分割线
.posts-expand .post-eof {
    margin: 40px auto 20px;
    background: white;
}
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