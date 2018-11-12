title: Vagrant部署实践
tags: OS
categories: 自动化
date: 2018-11-12 10:49:00
---

### Vagrant主要概念
* Provider 为Vagrant提供虚拟化支持的具体软件，比如vmware或virtual box
* Box 虚拟机镜像
* Project 一个目录和目录中的Vagrantfile就组成了vagrant的一个项目
* Vagrantfile Vagrant的配置文件。定义了项目所使用的box，网络，共享目录，provision脚本等
* Provision 虚拟机实例启动后，所需要完成的基础配置工作。
* Plugin 插件

### 创建项目

```bash
vagrant box add {title} {url}
vagrant init {title}
vagrant up

#添加vagrant box到box list
vagrant box add centos7 file://D:/images/CentOS-7.box
#初始化一个虚拟机使用刚才添加的vagrant box
vagrant init centos7 
#启动vagrant box虚拟机
vagrant up
#登录到虚拟机中
vagrant ssh
```
<!-- more -->
### 基本命令
```bash
#查看帮助
vagrant --help
#列出 Vagrant 当前 box 列表
vagrant box list
#删除相应的 box
vagrant box remove 
#停止当前正在运行的虚拟机并销毁所有创建的资源
vagrant destroy 
#虚拟机 关机/重启/暂停/从暂停中恢复/查看当前状态/销毁
vagrant halt/reload/suspend/resume/status/destroy  [VM_NAME] 
#把当前的运行的虚拟机环境进行打包为 box 文件
vagrant package 
#安装卸载插件
vagrant plugin 
#查看当前 vagrant 管理的所有 vm 信息
vagrant global-status 
```
### 常用插件
```bash
#自定义共享目录
vagrant plugin install vagrant-vbguest
#支持多种共享模式
vagrant plugin install vagrant-bindfs
#nfs插件
vagrant plugin install vagrant-winnfsd
#用主机名访问
vagrant plugin install vagrant-hostmanager

```
### 配置provision脚本
```bash
#1.在Vagrantfile文件内配置
vim Vagrantfile
  config.vm.provision "shell", inline: <<-SHELL
    sudo yum install -y yum-utils device-mapper-persistent-data lvm2
    sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    sudo yum makecache fast
    sudo yum -y install docker-ce
    sudo systemctl start docker
    sudo systemctl enable docker
  SHELL

#2.编写shell脚本
vim Vagrantfile
 config.vm.provision "shell", privileged: true, path: "./setup.sh"
vim setup.sh
  #/bin/sh
  sudo yum install -y yum-utils device-mapper-persistent-data lvm2
  sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
  sudo yum makecache fast
  sudo yum -y install docker-ce
  sudo systemctl start docker
  sudo systemctl enable docker
```

### 参考资料
[Vagrant 下载地址](http://www.vagrantup.com/downloads.html )  
[Vagrant Box下载地址](http://www.vagrantbox.es/)  
[VirtualBox下载地址](https://www.virtualbox.org/wiki/Downloads)  
[Vagrant Documentation](Vagrant Documentation)  
