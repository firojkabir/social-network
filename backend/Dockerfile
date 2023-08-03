FROM node:18.10.0-alpine3.15 AS base
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
# RUN npm run build

# FROM node:18.10.0-alpine3.15
# WORKDIR /app
# COPY --from=base /app/dist ./dist
# COPY --from=base /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "./index.js"]
