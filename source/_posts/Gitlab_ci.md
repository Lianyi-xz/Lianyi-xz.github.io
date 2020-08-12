---
title: Gitlab CI
tags: 服务
categories: 技术
date: 2019-01-30  17:21:00
---
### 安装和部署gitlab runner
```bash
# 安装gitlab
# 安装gitlb-ci
 sudo wget -O /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64
 sudo chmod +x /usr/local/bin/gitlab-runner
 sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash
 sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner
 sudo gitlab-runner start
```
<!-- more -->

### 注册gitlab runner
```bash
#注册gitlab ci
gitlab-runner register
  #输入gitlab 的url
  #输入gitlab的token ，将runner注册到项目中
  #输入runner描述
  #输入tag1，tag2……
  #？
  #runner是否单独为该项目服务
  # 选择注册方式 eg:shell
#注销gitlab-runner
gitlab-runner list
 gitlab-runner unregister -url http://gitlab.example.com.cn/ --token 2418b9431538bca7db6e451a79df69
```

### 常用配置参数
* script:  Runner执行的shell脚本
* image：使用docker镜像:image:name
* services：使用 docker services 镜像：services:name
* before_script：
* after_script：
* stages：阶段
* stage：job阶段
* only/except: 创建job的限制
* tag: runner标签
* when：工作时间 when:manual  when:delayed
* allow_failure：允许失败

### 管道API
```bash
#获取所有管道
curl --header "PRIVATE-TOKEN: H6VbQp8cJryYXVmTzj-3" "http://gitlab.example.com.cn/api/v4/projects/91/pipelines" 
curl --header "PRIVATE-TOKEN: H6VbQp8cJryYXVmTzj-3" "http://gitlab.example.com.cn/api/v4/projects/91/pipelines?status=success" |python -m json.tool

#获取一个管道
#创建一个新管道
curl --request POST --header "PRIVATE-TOKEN: H6VbQp8cJryYXVmTzj-3" "http://gitlab.example.com.cn/api/v4/projects/91/pipeline?ref=master" |python -m json.tool

#管道运行
curl --request POST --header "PRIVATE-TOKEN:  H6VbQp8cJryYXVmTzj-3" "http://gitlab.example.com.cn/api/v4/projects/91/pipelines/91/retry"
```
### 我的脚本
```bash
#上传docker镜像
vim .gitlab-ci.ymlvariables:
    MAVEN_OPTS: '-Dmaven.repo.local=.m2/repository -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=WARN -Dorg.slf4j.simpleLogger.showDateTime=true -Djava.awt.headless=true'
    MAVEN_CLI_OPTS: '--batch-mode --errors --fail-at-end --show-version -DinstallAtEnd=true -DdeployAtEnd=true'

cache:
    paths:
        - .m2/repository

stages:
    - build:project
    - build:image
    
    
build:project:
    stage: build:project
    tags:
        - share-runner
    script:
        - mvn clean package -Dmaven.test.skip=true
    only:
        - release
    artifacts:
      name:  "${CI_JOB_NAME}_${CI_COMMIT_REF_NAME}"
      paths:
        - target/*.jar
      expire_in: 1 hours

build:image:
    stage: build:image
    tags:
        - share-runner
    script:
        - docker info
        - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
        - docker build --pull -t "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA" .
        - docker push "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA"
        - docker rmi "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA"
    only:
        - release

vim Dockerfile
FROM java:8-jdk-alpine
ENV PARAMS=""
ENV TZ=PRC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ADD target/manage.jar app.jar
ENTRYPOINT ["sh","-c","java $PARAMS -jar /app.jar"]


```
### 参考文档
[gitlab document ](https://docs.gitlab.com/ee/ci/quick_start/)