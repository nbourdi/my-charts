FROM node:12

WORKDIR ./

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=9103

EXPOSE 9103

CMD ["node", "./index.js"]