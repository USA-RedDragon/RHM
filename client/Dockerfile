FROM node:alpine as builder

WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN npm run build


FROM nginx:1.14-alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/*
COPY nginx-conf /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]