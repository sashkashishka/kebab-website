FROM node:12-alpine

EXPOSE 80
EXPOSE 443

WORKDIR /kebab

COPY . .

RUN yarn

RUN yarn workspace @kebab/front build

RUN yarn workspace @kebab/server build

RUN mkdir app && cp -r packages/front/public packages/server

CMD ["yarn", "workspace", "@kebab/server", "start"]
