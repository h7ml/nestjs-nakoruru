# 第一阶段：构建阶段
FROM node:16-alpine AS build

# 设置工作目录
WORKDIR /nestjs-nakoruru

# 将 package.json、pnpm-lock.yaml 和 .npmrc 复制到工作目录
COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY .npmrc ./

# 安装依赖包
RUN npm install -g pnpm increase-memory-limit --no-cache

# RUN increase-memory-limit

RUN pnpm install --no-cache

# 将所有文件复制到工作目录
COPY . .

# 打包项目
# RUN node --max-old-space-size=6000

RUN pnpm run build

# 第二阶段：部署阶段
FROM nginx

# 复制打包后的 dist 文件夹到默认的 Nginx 静态文件目录
COPY --from=build /nestjs-nakoruru/dist /usr/share/nginx/html

# 复制 Nginx 配置文件到默认的 Nginx 配置文件目录
COPY --from=build /nestjs-nakoruru/src/nginx.conf /etc/nginx/conf.d/default.conf

# 开启 gzip 压缩
RUN sed -i 's/#gzip/gzip/' /etc/nginx/nginx.conf

# 将容器的端口映射到宿主机的 80 端口
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]