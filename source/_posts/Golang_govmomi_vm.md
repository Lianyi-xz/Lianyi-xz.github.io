---
title: 使用Govmomi操作虚拟机
tags: 代码
categories: 技术
date: 2022-01-20 15:36:00
---
> Govmomi 是 VMware vSphere API 的 GO 库

#### 基本思路
根据ip查询数据库获取虚拟机Uuid 和Vcenter信息。  
根据Vcenter和Uuid 对虚拟机进行变更操作。

#### 安装Govmomi
```bash
go get -u github.com/vmware/govmomi
```
#### 连接vcenter
```golang
var client *vim25.Clien
var ctx = context.Background()
const (
	VSPHERE_IP       = "xxx"
	VSPHERE_USERNAME = "xxx"
	VSPHERE_PASSWORD = "xxx"
	Insecure         = true
)
// NewClient 链接vmware
func NewClient() *vim25.Client {

	u := &url.URL{
		Scheme: "https",
		Host:   VSPHERE_IP,
		Path:   "/sdk",
	}

	u.User = url.UserPassword(VSPHERE_USERNAME, VSPHERE_PASSWORD)
	client, err := govmomi.NewClient(ctx, u, Insecure)
	if err != nil {
		panic(err)
	}
	return client.Client
}
```
<!-- more -->

#### 根据Uuid获取虚拟机信息
```golang
// GetVm 获取单个vm信息
func GetVm(client *vim25.Client,Uuid string)(client *vim25.Client,machine *mo.VirtualMachine,err error) {
	m := view.NewManager(client)
	// 获取虚拟机相关的vsphere对象
	var ctx = context.Background()
	v, err := m.CreateContainerView(ctx, client.ServiceContent.RootFolder, []string{"VirtualMachine"}, true)
	if err != nil {
		log.Log.Info(err.Error())
		return nil,nil, code.ErrVcClient
	}
	defer v.Destroy(ctx)

	// 获取虚拟机信息
	var vms []mo.VirtualMachine
    // 获取所有虚拟机信息，时间为10s左右
	//err = v.Retrieve(ctx, []string{"VirtualMachine"}, []string{"summary"}, &vms) 
    // 仅获取符合条件的虚拟机
	err = v.RetrieveWithFilter(ctx, []string{"VirtualMachine"}, []string{"summary"}, &vms, property.Filter{"summary.config.uuid":vm.Uuid})
	if err != nil {
		return nil,nil, "虚拟机获取失败"
	}

	//查询获得指定虚拟机
	for _, vcVm := range vms {
		// 根据uuid 获取虚拟机信息
		if vm.Uuid == vcVm.Summary.Config.Uuid  && vm.Uuid != ""{
			return  client,&vcVm,nil
		}
	}
	return nil,nil, "虚拟机不存在"
}
```
#### 查看虚拟机状态
```golang
// StatusVm 查看虚拟机状态
func  StatusVm()  (string,error){
	// 查看当前虚拟机状态
	_,Vm,err := GetVm(client,uuid)
	if err != nil {
		return "",err
	}
	PowerState := string(vcVm.Summary.Runtime.PowerState)
	return PowerState,err
}
```
#### 关闭虚拟机
```golang
// StopVm 关闭虚拟机
func  StopVm()  (string,error) {
	// 查看当前虚拟机状态 ，关闭则返回未运行
	// 启动则关闭虚拟机
	client,Vm,err := GetVm(client,uuid)
	if err != nil {
		return err
	}
	if string(Vm.Summary.Runtime.PowerState) == "poweredOff" {
		return "虚拟机已关闭",err
	}
	//关机
	vmw := object.NewVirtualMachine(client, Vm.Reference())
	var ctx = context.Background()
	task,err := vmw.PowerOff(ctx)
	if err != nil {
		return "虚拟机关闭失败",err
	}
	if e := task.Wait(ctx); e != nil {
		return  "虚拟机关闭失败",err
	}
	return  "虚拟机关闭",nil
}
```
#### 启动虚拟机
```golang
// StartVm 启动虚拟机
func StartVm()   (string,error) {
	// 查看当前虚拟机状态 ，启动则返回已运行
	// 关闭则启动虚拟机
	client,Vm,err := GetVm(client,uuid)
	if err != nil {
		return err
	}
	if string(vcVm.Summary.Runtime.PowerState) == "poweredOn" {
		return "虚拟机已启动",nil
	}
	//开机
	vmw := object.NewVirtualMachine(client, Vm.Reference())
	var ctx = context.Background()
	task,err := vmw.PowerOn(ctx)
	if err != nil {
		return "虚拟机启动失败",err
	}
	if e := task.Wait(ctx); e != nil {
		return "虚拟机启动失败",err
	}
	return "虚拟机已启动",nil
}
```
#### 参考文档
[godoc.org](https://pkg.go.dev/github.com/vmware/govmomi)  
[VMware vSphere API Reference Documentation](https://code.vmware.com/apis/358/vsphere)  