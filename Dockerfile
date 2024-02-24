# 빌드 단계
FROM node:20 AS builder
WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# 실행 단계
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf.d

COPY --from=builder /frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
 