FROM node:17.1.0 as builder

WORKDIR /app/medusa

COPY . . 

RUN rm -rf node_modules

RUN apt-get update

RUN apt-get install -y python

RUN npm install -g npm@8.1.2

RUN npm install --loglevel=error

RUN npm run build


FROM node:17.1.0

WORKDIR /app/medusa

RUN mkdir dist

COPY package*.json ./ 

COPY yarn.lock ./

COPY develop.sh .

COPY medusa-config.js .

RUN apt-get update

RUN apt-get install -y python
# RUN apk add --no-cache python3

RUN npm install -g @medusajs/medusa-cli

RUN npm i --only=production

COPY --from=builder /app/medusa/dist ./dist

EXPOSE 9000

ENTRYPOINT ["./develop.sh", "start"]