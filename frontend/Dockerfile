### Build 
FROM node:18.10.0-alpine3.15 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### Run
FROM nginx:1.21.0-alpine
COPY /.nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/social-media-app /usr/share/nginx/html
