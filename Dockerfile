FROM node:10.18.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . .

CMD [ "npm", "run", "nodemon" ]