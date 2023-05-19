FROM node:16.9.0-alpine

WORKDIR /app

COPY package*.json index.js /app/

RUN npm install
RUN npm i -g nodemon

COPY . .

ENV PORT=9117

EXPOSE 9117

CMD ["nodemon", "./index.js"]