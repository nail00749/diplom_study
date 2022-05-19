FROM node as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
COPY ../VideoLearn/front /app

RUN npm run build
FROM nginx:stable
COPY --from=build /app/build /usr/share/nginx/html
RUN mkdir -p /etc/letsencrypt/live/wifelly.ru/
COPY conf/privkey.pem /etc/letsencrypt/live/wifelly.ru/
COPY conf/fullchain.pem /etc/letsencrypt/live/wifelly.ru/
COPY conf/options-ssl-nginx.conf /etc/letsencrypt/options-ssl-nginx.conf
COPY conf/ssl-dhparams.pem /etc/letsencrypt/ssl-dhparams.pem
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
