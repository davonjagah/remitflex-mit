FROM node:16.13-alpine

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install --legacy-peer-deps

COPY ./server/ ./

EXPOSE 8000/tcp

CMD npm run start