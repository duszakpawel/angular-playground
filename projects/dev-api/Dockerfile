FROM node:18-alpine as build

WORKDIR /app

COPY package*.json angular.json tsconfig*.json /app/
COPY projects/playground-api ./projects/playground-api
COPY projects/playground-lib ./projects/playground-lib
COPY projects/dev-api ./projects/dev-api

RUN npm install

RUN npm install ts-node typescript

EXPOSE 80

RUN ["npx", "tsc", "-p", "projects/dev-api"]

CMD ["node", "dist/dev-api/server.js", "--host=0.0.0.0", "--port=4510"];
