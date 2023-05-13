FROM node:16.9.0-alpine

WORKDIR /app

COPY package*.json index.js /app/

COPY chartsModel.js /app/

RUN npm install
RUN npm i -g nodemon

COPY . .

ENV PORT=9107

EXPOSE 9107

CMD ["nodemon", "./index.js"]