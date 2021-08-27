FROM node:11-alpine

COPY ./ /app/
WORKDIR /app

RUN npm install

ENTRYPOINT ["node", "index.js"]

