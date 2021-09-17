FROM nginx:1.10

ADD dockers/vhost.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www