FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3092

CMD ["yarn", "dev"]