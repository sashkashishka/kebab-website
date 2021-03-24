FROM node:12-alpine as builder

WORKDIR /kebab

COPY . .

RUN yarn

RUN yarn workspace @kebab/front build

RUN yarn workspace @kebab/server build

RUN yarn clean-server-deps

FROM node:12-alpine as prod

WORKDIR /app

COPY --from=builder /kebab/packages/server/build .
COPY --from=builder /kebab/packages/front/public public

RUN yarn install --prod --no-lockfile

EXPOSE 80
EXPOSE 443

CMD ["node", "index.js"]
