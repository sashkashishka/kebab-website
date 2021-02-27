FROM node:12 as builder

WORKDIR /usr/src/teme

COPY . .

RUN yarn

RUN yarn workspace @teme/front build

RUN yarn workspace @teme/server build

RUN mkdir app && mv packages/front/public app/public && mv packages/server/build/* app


FROM node:12-alpine as prod

WORKDIR /usr/src/app

COPY --from=builder /usr/src/teme/app .

COPY packages/server/package.json .

RUN yarn --prod --no-lockfile

RUN yarn global add pm2

CMD ["pm2-runtime", "server.js"]
