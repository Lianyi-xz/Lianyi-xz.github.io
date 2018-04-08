title: Jenkins部署
tags: Jenkins
categories: 自动化
date: 2018-02-1
---
> 经果四天的研究，我成功变成了智障  有缘再看吧

### docker 运行Jenkins
```dockerfile
docker run \
  --rm \
  -u root \
  -p 8080:8080 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$HOME":/home \
  jenkinsci/blueocean
```
### 参考资料
[官方文档](https://jenkins.io/doc/tutorials/build-a-java-app-with-maven/)