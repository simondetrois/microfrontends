FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY dist /usr/share/nginx/html

WORKDIR /etc/nginx/conf.d
COPY custom-nginx.conf default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
