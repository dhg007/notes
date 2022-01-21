## mysql

### login

```
mysql -h 127.0.0.1 -u 用户名 -p
```

### mac 允许mysql被其他用户远程访问

```sql
use mysql;

update user set host = '%' where user = 'root';

flush privileges;
```

### 查看状态和变量
```sql
status;  -- 显示当前mysql的version的各种信息

show global variables like 'port'; -- 查看MySQL端口号
```

### 创建数据库

```sql
show databases; 
create database test01;
create database test02 character set utf8;

drop database test02;

use test01;
show tables;
describe test01;
delete from test01; -- 清空表中记录
```

### 创建表
```sql
CREATE TABLE `user_accounts` (
  `id`             int(100) unsigned NOT NULL AUTO_INCREMENT primary key,
  `password`       varchar(32)       NOT NULL DEFAULT '' COMMENT '用户密码',
  `reset_password` tinyint(32)       NOT NULL DEFAULT 0 COMMENT '用户类型：0－不需要重置密码；1-需要重置密码',
  `mobile`         varchar(20)       NOT NULL DEFAULT '' COMMENT '手机',
  `create_at`      timestamp(6)      NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at`      timestamp(6)      NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  -- 创建唯一索引，不允许重复
  UNIQUE INDEX idx_user_mobile(`mobile`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8
COMMENT='用户表信息';
```

### 表 插入数据 增
```sql
insert into user_accounts (`password`, `reset_password`, `mobile` ) values ('1',0,'123456'), ('2',1,'223456'), ('3',1,'323456');
```

### 表  删
```sql
delete from user_accounts where id = 1;
```

### 表 更新数据 改
```sql
update user_accounts u set name = (select name from user1 where user1.id = 1 ) where id = (select id from user2 where user2 .name='小苏');
update user_accounts set `password` = 'hehe' where id = 1;
```

### 表 查数据 查
```sql
select u.id from user_accounts u where id in (1, 10) and u.id not in (4);
```
