FROM node:14.8.0-alpine AS build

## set custom working directory
WORKDIR /app

## copy project to working directory
COPY . .

## prepare container for building project
RUN yarn install

## build project
RUN yarn build


## prepare nginx
FROM nginx:1.19.2-alpine

## copy custom nginx config to override default config
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

## serve react build in nginx
COPY --from=build /app/build /usr/share/nginx/html
