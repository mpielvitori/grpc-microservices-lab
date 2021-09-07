FROM node:12.22.6-stretch

COPY package.json /app/

WORKDIR /app

RUN npm i

EXPOSE 3000

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

COPY ./ /app/

ENTRYPOINT ["node","./src/app.js"]
