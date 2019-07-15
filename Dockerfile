FROM nginx:latest
MAINTAINER 鬼王

WORKDIR /usr/share/nginx/ui
WORKDIR /etc/nginx/logs

COPY ./dist/ /usr/share/nginx/ui/

RUN chmod -R 777 /usr/share/nginx/ui/

RUN rm -rf /etc/nginx/conf.d/*

COPY nginx.template /etc/nginx/nginx.template

ENV ESP_GATEWAY_HOST df.gateway.com

CMD envsubst '$ESP_GATEWAY_HOST' < /etc/nginx/nginx.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'

EXPOSE 80
