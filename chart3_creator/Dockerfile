FROM ubuntu:lunar

WORKDIR /app

RUN apt update

RUN apt install nodejs -y

RUN apt install npm -y

RUN apt install python3 -y
RUN apt install python3-pip -y
RUN apt install python3-matplotlib -y
RUN apt install python3-numpy -y
RUN apt install python3-pandas -y

ENV PORT=9114

EXPOSE 9114

COPY package*.json index.js consumer.py /app/
RUN npm install colors
RUN npm install kafkajs
RUN npm install

CMD ["node", "./index.js"]