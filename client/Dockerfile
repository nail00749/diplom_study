FROM node:16-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
COPY . /app
ARG REACT_APP_API
ENV REACT_APP_API $REACT_APP_API

RUN npm run build
FROM nginx:1.22.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


