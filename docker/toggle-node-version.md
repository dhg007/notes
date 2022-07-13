
### 使用不同 node 版本打包

- node:version ，具体参考 docker hub

1. 直接打包
`docker run --rm --mount type=bind,source="$PWD",target=/usr/src/app -w /usr/src/app node:16 bash -c "npm i && npm run build"`

2. 进入交互模式
`docker run -it --rm --mount type=bind,source="$PWD",target=/usr/src/app -w /usr/src/app node:16 bash`