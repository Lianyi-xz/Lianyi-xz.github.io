---
title: Hexo 更新
tags: 服务
categories: 技术
date: 2021-10-29
---
>  年更博主更新后发现网站白屏，所有html文件为空。排查后发现问题出在新版本npm和Hexo不匹配，经过简单调研后我做出了一个 ~~违背祖宗~~ 艰难的的决定：更新Hexo版本

##### 更新Hexo
> 更新后发现 分页器出现问题，页面编译正常
```bash
#查看需要更新版本
npm outdated
#修改package.json
#更新 模块
npm update
#编译
hexo clean
hexo g
```
<!-- more -->

###### 新package.json
```bash
{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "hexo": {
    "version": "5.4.0"
  },
  "dependencies": {
    "hexo": "^5.3.0",
    "hexo-deployer-git": "^2.1.0",
    "hexo-generator-archive": "^1.0.0",
    "hexo-generator-baidu-sitemap": "^0.1.2",
    "hexo-generator-category": "^1.0.0",
    "hexo-generator-feed": "^1.2.2",
    "hexo-generator-index-pin-top": "^0.2.2",
    "hexo-generator-searchdb": "^1.0.8",
    "hexo-generator-sitemap": "^1.2.0",
    "hexo-generator-tag": "^1.0.0",
    "hexo-neat": "^1.0.4",
    "hexo-renderer-ejs": "^1.0.0",
    "hexo-renderer-marked": "^3.3.0",
    "hexo-renderer-stylus": "^2.0.1",
    "hexo-renderer-swig": "^1.1.0",
    "hexo-server": "^2.0.0",
    "hexo-tag-aplayer": "^3.0.4",
    "hexo-wordcount": "^3.0.2"
  }
}
```


#### 参考文档
[VuePass](https://vuepress.vuejs.org/zh/guide/#features)  
[hexo 升级到微信5.3.0](https://www.jianshu.com/p/8d2e2b206e4e)  
[npm更新模块并同步到package.json中](https://www.cnblogs.com/dxxzst/p/10006268.html)  
[解决Hexo博客模板hexo-theme-next的翻页按钮不正常显示问题)](https://www.cnblogs.com/xiejava/p/12456273.html)