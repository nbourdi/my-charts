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

#RUN apk add python3
#RUN apk add python3-dev
#RUN apk add py3-pip
#RUN apk add g++
#RUN apk add gcc
#RUN apk update && apk add git openssh

#RUN pip3 install matplotlib
#RUN pip3 install numpy 
#RUN pip3 install pandas

COPY . .

ENV PORT=9104

EXPOSE 9104

COPY package*.json index.js consumer.py /app/

CMD ["node", "./index.js"]