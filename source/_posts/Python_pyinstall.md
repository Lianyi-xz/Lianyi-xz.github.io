---
title: 打包Python脚本
tags: 代码
categories: 技术
date: 2018-12-10 10:22:00
---
> 将Python脚本打包成可执行文件

### 下载PyInstaller
```python
pip install pyinstaller
```

### 打包python程序
```
#程序目录下运行
pyinstaller -F yourprogram.py
#生成可执行文件
./dist/yourprogram.exe
```

[PyInstaller 文档](https://pyinstaller.readthedocs.io/en/stable/usage.html)  