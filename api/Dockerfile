FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3080

CMD ["npm", "run", "dev"]