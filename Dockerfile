FROM node:16.14-alpine

WORKDIR /app-backend-default

COPY package* ./

RUN npm install

COPY . .

EXPOSE 3001

RUN npx tsc
