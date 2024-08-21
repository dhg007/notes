# wsl2

## 局域网访问 wsl2 的服务

1. 关闭防火墙


2. 端口转发

注意：启动 wsl 内的服务前要确保自己想用的端口没有被 netsh 转发。不然 wsl 内的服务起来后，localhost 访问不到。另外需要 admin 模式启动 powershell
正确顺序：检测 netsh 列表 =》 启动 wsl =》 设置 netsh 端口转发

```powershell
# 这里设置为 localhost, 因为可以通过 localhost 来访问 WSL2
netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=8080 connectaddress=localhost connectport=8080

# 查看当前所有的转发设置
netsh interface portproxy show all

# 删除转发设置
netsh interface portproxy delete v4tov4 listenaddress=0.0.0.0 listenport=8080 
```


