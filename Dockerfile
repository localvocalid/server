FROM node:17.1.0

WORKDIR /app/medusa

RUN mkdir dist

COPY package.json .
COPY develop.sh .
COPY yarn.* .

RUN apt-get update

RUN apt-get install -y python

RUN npm install -g npm@8.1.2

RUN npm install -g @medusajs/medusa-cli@latest

RUN npm i --only=production

RUN npm run build

COPY --from=builder /app/medusa/dist ./dist

EXPOSE 9000

ENTRYPOINT ["./develop.sh", "start"]
