FROM node:12-alpine

WORKDIR /app

COPY /packages/server/build .
COPY /packages/front/public public

RUN yarn install --prod --no-lockfile

EXPOSE 80
EXPOSE 443

CMD ["node", "index.js"]
