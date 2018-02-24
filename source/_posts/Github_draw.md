title: 伪造Github 提交记录 
tags: github
categories: git
date: 2018-02-22  14:01:00
---

{% cq %} 大半年没有提交过代码， github上极其空荡  
想着伪造时间 来充实一下github页面
结果发现已经有类似的git项目
故直接拿了用了
{% endcq %}

### 核心代码
```bash
GIT_AUTHOR_DATE=2017-11-25T12:00:00 GIT_COMMITTER_DATE=2017-11-25T12:00:00 git commit --allow-empty -m "gitfiti" > /dev/null
```
<!-- more -->
### 实现效果
![](https://ws1.sinaimg.cn/large/006Xrlj6gy1fop7b9r5npj30kl05v0sr.jpg)
### 参考资料
[Github恶搞项目](https://github.com/gelstudios/gitfiti)  
[Github恶搞教程](http://www.cnblogs.com/honoka/p/4865622.html)