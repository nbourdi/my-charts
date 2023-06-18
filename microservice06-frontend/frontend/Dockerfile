FROM node:16.13.1

WORKDIR /app

COPY public /app/public
COPY src /app/src
COPY package.json /app/

EXPOSE 3030
ENV PORT=3030
RUN npm install
CMD [ "npm", "start"]