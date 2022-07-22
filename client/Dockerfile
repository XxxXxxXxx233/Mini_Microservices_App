FROM node:16-alpine

ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app

# Only track package.json, ignore index.js
COPY ./package.json ./
RUN npm install
RUN npm install nodemon
COPY ./ ./

CMD ["npm", "start"]