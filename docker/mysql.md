
# mysql 笔记

## 安装

- 通过 docker 安装 mysql 学习，体验很棒，命令如下

  `docker run --name some-mysql -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=secret -d mysql`

- 然后进入、连接登录开始
  1. `docker exec -it some-mysql bash` 进入容器
  2. `mysql -u root -p`，回车输入 `secret`

## mysql 命令

### 库 操作

- 查看
  `show databases;`
- 新增
  `create database test1;`
- 删除
  `drop database test1;`
- 使用
  `use database test2;`

### 表 操作

- 查看
  `show tables;`

- 创建，[具体的数据类型](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)
