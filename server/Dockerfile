FROM node:8.10-alpine

WORKDIR /app

EXPOSE 3001

RUN apk update
RUN apk add mysql-client make gcc g++ python

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app
COPY wait-for-mysql.sh /app
RUN chmod a+x wait-for-mysql.sh

CMD ["sh", "/app/wait-for-mysql.sh", "npm", "run", "dev"]