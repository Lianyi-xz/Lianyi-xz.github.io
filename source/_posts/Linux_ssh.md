title: Linux 免密登陆
tags: OS
categories: Linux
date: 2018-01-29
---

### 配置Linux主机ssh无密码访问
```bash
#使用ssh-keygen与ssh-copy-id实现快速证书的生成及公钥下发
#生成一对密钥
  ssh-keygen   
#下发生成的公钥
  ssh-copy-id username@ip 
  or
  ssh-copy-id -i /root/.ssh/id_rsa.pub root@ip 
```
