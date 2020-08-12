---
title: Github 常用命令
tags: 服务
categories: 技术
date: 2018-02-05
---
> 依据他人文档整理

### 专有名词
```bash
Workspace: 工作区
Index/Stage: 暂存区
Repository: 仓库区或本地仓库
Remote: 远程仓库
```

### 初始化
```bash
#当前目录/新建目录 初始化
git init [project-name]
#下载项目
git clone [url]
```
<!-- more -->
### 配置文件
```bash
#Git的设置文件为.gitconfig，可在用户主目录（全局配置）可以在项目目录（项目配置）。
# 显示当前的Git配置
git config --list
# 编辑Git配置文件
git config -e [--global]
# 设置提交代码时的用户信息
git config [--global] user.name "[name]"
git config [--global] user.email "[email address]"
```
### 增加/删除变化
```bash
#增加文件/目录到暂存区
git add [file] | [dir]
#增加所有变化到暂存区
git add .
#删除工作区文件，并且将这次删除放入暂存区
git rm [file1] [file2]
#改名文件，并且将这个改名放入暂存区
git mv [file-original] [file-renamed
```
### 代码提交
```bash
#提交暂存区到仓库区
git commit -m [message]
#提交工作区自上次commit之后的变化，直接到仓库区
git commit -a
# 提交时显示所有diff信息
git commit -v
```

### 分支
```bash
#列出分支  默认本地分支  -r 远程分支 -a 本地和远程分支
git branch 
#新建分支，但留在当前分支
git branch [branch-name]
#新建分支，切换到新分支
git checkout -b [branch]
#切换到指定分支 -f 强制切换
git checkout [branch-name]
#切换上一个分支
git checkout -
#合并指定分支到当前分支
git merge [branch]
#删除分支
git branch -d [branch-name]
#删除远程分支
git push origin --delete[branch-name]
git branch -dr [remote/branch]
```

### 标签
```bash
#列出所有标签
git tag
#新建一个tag在指定commit
git tag [tag] [commit]
#删除本地tag
git tag -d [tag]
#删除远程tag
git pushorigin :refs/tags/[tagName]
#查看tag信息
git show [tag]
```
### 远程同步
```bash
# 取回远程仓库的变化，并与本地分支合并
git pull [remote] [branch]
# 上传本地指定分支到远程仓库
git push[remote] [branch]
# 推送所有分支到远程仓库
git push[remote] --all
# 下载远程仓库的所有变动
# 强行推送当前分支到远程仓库，即使有冲突
git push[remote] --force
git fetch [remote]
# 显示所有远程仓库
git remote -v
# 显示某个远程仓库的信息
git remote show [remote]
# 增加一个新的远程仓库，并命名
git remote add [shortname] [url]
```

### 查看信息
```bash
#显示有变更的文件
git status
# 显示当前分支的版本历史
git log
# 显示commit历史，以及每次commit发生变更的文件
git log--stat
# 搜索提交历史，根据关键词
git log-S [keyword]
# 显示某个commit之后的所有变动，每个commit占据一行
git log[tag] HEAD --pretty=format:%s
# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
git log[tag] HEAD --grepfeature
# 显示某个文件的版本历史，包括文件改名
git log--follow [file]
git whatchanged [file]
# 显示指定文件相关的每一次diff
git log-p [file]
# 显示过去5次提交
git log-5 --pretty --oneline
# 显示所有提交过的用户，按提交次数排序
git shortlog -sn
# 显示指定文件是什么人在什么时间修改过
git blame [file]
# 显示暂存区和工作区的差异
git diff
# 显示暂存区和上一个commit的差异
git diff --cached [file]
# 显示工作区与当前分支最新commit之间的差异
git diff HEAD
# 显示两次提交之间的差异
git diff [first-branch]...[second-branch]
# 显示今天你写了多少行代码
git diff --shortstat "@{0 day ago}"
# 显示某次提交的元数据和内容变化
git show [commit]
# 显示某次提交发生变化的文件
git show --name-only [commit]
# 显示某次提交时，某个文件的内容
git show [commit]:[filename]
# 显示当前分支的最近几次提交
git reflog
```

### 撤销
```bash
# 恢复暂存区的指定文件到工作区
git checkout [file]
# 恢复某个commit的指定文件到暂存区和工作区
git checkout [commit] [file]
# 恢复暂存区的所有文件到工作区
git checkout .
# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
git reset[file]
# 重置暂存区与工作区，与上一次commit保持一致
git reset--hard
# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
git reset[commit]
# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
git reset--hard [commit]
# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
git reset--keep [commit]
# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
git revert [commit]
# 暂时将未提交的变化移除，稍后再移入
git stash
git stash pop
```