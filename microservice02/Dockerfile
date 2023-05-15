FROM node:16.9.0-alpine

WORKDIR /app

COPY package*.json index.js consumer.py /app/

RUN npm install
RUN npm i -g nodemon

RUN apk add python3
RUN apk add python3-dev
RUN apk add py3-pip
RUN apk add g++
RUN apk add gcc
RUN pip3 install numpy

COPY . .

ENV PORT=9104

EXPOSE 9104

CMD ["nodemon", "./index.js"]