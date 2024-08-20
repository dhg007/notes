# wsl2

- 局域网访问 wsl2 的服务, admin 模式启动 powershell

1. 关闭所有网络配置文件的防火墙

```powershell
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False
```

2. 端口转发

```powershell
# 这里设置为 localhost, 因为可以通过 localhost 来访问WSL2
netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=8080 connectaddress=localhost connectport=8080

# 查看当前所有的转发设置
netsh interface portproxy show all

# 删除转发设置
netsh interface portproxy delete v4tov4 listenaddress=0.0.0.0 listenport=8080 
```

3. 防火墙 添加 WSL 防火墙入站规则

```powershell
New-NetFirewallRule -DisplayName "WSL" -Direction Inbound -InterfaceAlias "vEthernet (WSL)" -Action Allow
# 删除
Remove-NetFirewallRule -DisplayName "WSL"

# 查询
Get-NetFirewallRule -DisplayName "WSL"
```
