FROM node:alpine

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN apk add --no-cache tini

EXPOSE 3030

WORKDIR /src/app

ARG PORT

ARG ENV

ENV PORT=${PORT}

ENV NODE_ENV=${ENV}

COPY package*.json ./

RUN npm install --silent && npm install -g typescript

RUN mkdir -p dist

COPY . ./

RUN tsc

ENTRYPOINT ["/sbin/tini","--"]

CMD ["node","./dist/main.js"]
