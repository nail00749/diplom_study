FROM node as build
WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .

ARG REACT_APP_API
ENV REACT_APP_API $REACT_APP_API

RUN npm run build
FROM nginx:stable
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


