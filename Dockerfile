
FROM node:10.18.0-jessie AS node

WORKDIR /usr/src/app

COPY . .

RUN cp package.json package-original.json

RUN sed -i 's/\"mt-form-builder\": \"file:output-lib\/mt-form-builder\"\,//g' package.json

RUN npm install

RUN npm run build:lib

RUN mv package-original.json package.json

RUN npm install

RUN npm run build 

FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY --from=node /usr/src/app/dist .

COPY nginx.config /etc/nginx/conf.d/default.conf

EXPOSE 80