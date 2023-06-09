# nginx 学习笔记

## 命令

- `nginx` 启动 默认路径下的配置文件：/usr/local/nginx/conf/nginx.conf。 `-c /tmp/nginx.conf`
- `nginx -t` 在不启动 Nginx 的情况下，使用 -t 参数仅测试配置文件是否有错误
- `nginx -t -q` 使用-q 参数可以不把 error 级别以下的信息输出到屏幕
- `nginx -v` 显示版本信息
- `nginx -V` 除了可以显示 Nginx 的版本信息外，还可以显示配置编译阶段的信息，如 GCC 编译器的版本、操作系统的版本、执行 configure 时的参数等
- `nginx -s stop` 使用-s stop 可以强制停止 Nginx 服务, 通过 kill 命令直接向 nginx master 进程发送 TERM 或者 INT 信号，效果是一样的 `ps -ef | grep nginx`,然后 `kill -s SIGTERM 10800` or `kill -s SIGINT 10800`
- `nginx -s quit` Nginx 服务可以正常地处理完当前所有请求再停止服务。首先会关闭监听端口，停止接收新的连接，然后把当前正在处理的连接全部处理完，最后再退出进程，也可以 `kill -s SIGQUIT <nginx master pid>` or `kill -s SIGWINCH <nginx worker pid>`
- `nginx -s reload` Nginx 会先检查新的配置项是否有误，如果全部正确就以“优雅”的方式关闭，再重新启动 Nginx 来实现这个目的 or `kill -s SIGHUP <nginx master pid>`

## 配置

### location

- 符号说明

  `=` 进行普通字符精确匹配。也就是完全匹配。
  `^~` 表示普通字符匹配。优先使用前缀匹配。如果匹配成功，则不再匹配其他 location。
  `~`表示执行一个正则匹配，区分大小写
  `~*` 表示执行一个正则匹配，不区分大小写
  `@` “@” 定义一个命名的 location，使用在内部定向时，例如 error_page, try_files

- 优先级说明

  在 nginx 的 location 和配置中 location 的顺序没有太大关系。跟 location 表达式的类型有关。相同类型的表达式，字符串长的会优先匹配。如下：

  第一优先级：等号类型（=）的优先级最高。一旦匹配成功，则不再查找其他匹配项。
  第二优先级：^~类型表达式。一旦匹配成功，则不再查找其他匹配项。
  第三优先级：正则表达式类型（~ ~\*）的优先级次之。如果有多个 location 的正则能匹配的话，使用最先匹配的那个，即最上面的；
  第四优先级：常规字符串匹配类型。按前缀匹配。

- `root` 和 `alias` 区别， `alias` 别名需要带上完整的路径。root 可以放置到 http、server、location 或 if 块中，而 alias 只能放置到 location 块中

  ```nginx
  location /img {
    alias /usr/local/nginx/img/;
  }

  location /img {
    root /usr/local/nginx/;
  }
  ```

- alias 后面还可以添加正则表达式

  ```nginx
  location ~ ^/test/(\w+)\.(\w+)$ {
    alias /usr/local/nginx/$2/$1.$2;
  }
  ```
