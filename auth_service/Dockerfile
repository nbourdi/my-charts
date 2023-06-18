FROM node:16.13.1

WORKDIR /app

COPY *.js *.json /app/

RUN npm install 

EXPOSE 3000

CMD ["node", "server.js"]