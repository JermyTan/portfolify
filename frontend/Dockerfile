FROM node:14.8.0-alpine AS build
ARG REACT_APP_API_URL

## set custom working directory
WORKDIR /app

## copy project to working directory
COPY . .

## prepare container for building project
RUN yarn install

## build project
RUN REACT_APP_API_URL=${REACT_APP_API_URL} yarn build


## prepare nginx
FROM nginx:1.19.2-alpine

## copy custom nginx config to override default config
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

## serve react build in nginx
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000
