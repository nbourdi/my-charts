FROM node:16.9.0-alpine

WORKDIR /microservice01

COPY package*.json index.js /microservice01/

RUN npm install
RUN npm i -g nodemon

COPY . .

ENV PORT=9103

EXPOSE 9103

CMD ["nodemon", "./index.js"]