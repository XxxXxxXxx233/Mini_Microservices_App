FROM node:18-alpine

WORKDIR /usr/app

# Only track package.json, ignore index.js
COPY ./package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]