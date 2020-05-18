### STAGE 1: Build ###

## label stage as builder
FROM node:12.7-alpine AS builder


WORKDIR /ng-app

## copy package.json and packag-lock (essential for next command)
COPY package.json package-lock.json ./

## strict npm install, create workdir folder, move node modules
RUN npm install

COPY . .

RUN npm run build-prod

### STAGE 2: Run ###

FROM nginx:1.17.1-alpine

## Copy our nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /ng-app/dist/app /usr/share/nginx/html

## Run nginx
CMD ["nginx", "-g", "daemon off;"]

