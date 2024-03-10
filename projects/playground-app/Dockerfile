FROM node:18-alpine as build

WORKDIR /app

COPY package*.json angular.json tsconfig*.json ./

COPY projects/playground-app ./projects/playground-app
COPY projects/playground-lib ./projects/playground-lib
COPY projects/playground-api ./projects/playground-api
COPY projects/dev-api ./projects/dev-api
COPY projects/playground-styles ./projects/playground-styles

RUN npm install

RUN npm run ng build playground-lib
RUN npm run ng build playground-app -- --output-path=./dist/playground-app

FROM nginx:alpine

COPY --from=build /app/dist/playground-app/ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
