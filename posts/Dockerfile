FROM node:16-alpine

WORKDIR /app

# Only track package.json, ignore index.js
COPY ./package.json ./
RUN npm install
RUN npm install nodemon
COPY ./ ./

CMD ["npm", "start"]