FROM node:16-alpine

ENV NEXT_PUBLIC_APP_ENV development

RUN apk add --no-cache git

RUN git clone https://github.com/laksanagusta/artz-apollo.git

WORKDIR /artz-apollo

RUN yarn install

RUN yarn build

RUN yarn start

EXPOSE 3000