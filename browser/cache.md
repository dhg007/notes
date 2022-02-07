
## 浏览器缓存
- 浏览器每次发起请求，都会先在浏览器缓存中查找该请求的结果以及缓存标识
- 浏览器每次拿到返回的请求结果都会将该结果和缓存标识存入浏览器缓存中

### 缓存类型

- 强制缓存

  - 强制缓存的情况主要有三种
    1. 不存在该缓存结果和缓存标识，强制缓存失效，则直接向服务器发起请求（跟第一次发起请求一致）。
    2. 存在该缓存结果和缓存标识，但该结果已失效，强制缓存失效，则使用协商缓存。
    3. 存在该缓存结果和缓存标识，且该结果尚未失效，强制缓存生效，直接返回该结果。

  - 控制强制缓存的字段分别是 Expires 和 Cache-Control，其中Cache-Control优先级比Expires高

    - Expires

      Expires是HTTP/1.0控制网页缓存的字段，其值为服务器返回该请求结果缓存的到期时间，即再次发起该请求时，如果客户端的时间小于Expires的值时，直接使用缓存结果。

      因为 Expires控制缓存的原理是使用客户端的时间与服务端返回的时间做对比，所以建议直接废弃。

    - Cache-Control

      到了HTTP/1.1，Expire已经被Cache-Control替代，主要取值为：

      - public：所有内容都将被缓存（客户端和代理服务器都可缓存）
      - private：所有内容只有客户端可以缓存，Cache-Control的默认取值
      - no-cache：客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定
      - no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存
      - max-age=xxx (xxx is numeric)：缓存内容将在xxx秒后失效


- 协商缓存

  协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程

  - 主要有以下两种情况：

    1. 协商缓存生效，返回304
    2. 协商缓存失效，返回200和请求结果结果

  - 控制协商缓存的字段分别有：

    Last-Modified/If-Modified-Since 和 Etag/If-None-Match

    其中 Etag/If-None-Match 的优先级比 Last-Modified/If-Modified-Since 高

    - Last-Modified/If-Modified-Since
      1. Last-Modified 是服务器响应请求时，返回该资源文件在服务器最后被修改的时间
      2. If-Modified-Since 则是客户端再次发起该请求时，携带上次请求返回的 Last-Modified 值，服务器通过对比，大于则返回 200；否则 304
      3. 缺点：如果这个资源在服务器上被修改了，但是最后的内容却没有变。相当于多返回了一个相同的资源文件，浪费了流量。
    - Etag/If-None-Match
      1. Etag 是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)
      2. If-None-Match 是客户端再次发起该请求时，携带上次请求返回的唯一标识 Etag 值，服务器通过对比，一致则返回 200；否则 304

### 总结

浏览器缓存分为强制缓存和协商缓存，强制缓存优先于协商缓存进行。

 1. 先判断 Cache-Control，在 Cache-Control 的 max-age 之内，直接返回200 from cache
 2. 没有 Cache-Control 再判断 Expires，再 Expires 之内，直接返回200 from cache
 3. Cache-Control=no-cache 或者不符合 Expires，浏览器向服务器发送请求
 4. 服务器同时判断 ETag 和 Last-Modified，都一致，返回304，有任何一个不一致，返回200, 否则 304
