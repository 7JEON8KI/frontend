# 빌드 단계
FROM node:20 AS builder
WORKDIR /frontend
COPY package.json .
COPY . .

ARG REACT_APP_KAKAO_CLIENT_ID
ARG REACT_APP_KAKAO_REDIRECT_URI
ARG REACT_APP_BASE_URL
ENV REACT_APP_KAKAO_CLIENT_ID=$REACT_APP_KAKAO_CLIENT_ID
ENV REACT_APP_KAKAO_REDIRECT_URI=$REACT_APP_KAKAO_REDIRECT_URI
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL

RUN npm install

EXPOSE 80

CMD ["npm", "start"]

# RUN npm run build

# # 실행 단계
# FROM nginx:alpine
# RUN rm /etc/nginx/conf.d/default.conf
# RUN rm -rf /etc/nginx/conf.d/*
# COPY ./nginx.conf /etc/nginx/conf.d

# COPY --from=builder /frontend/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
 
