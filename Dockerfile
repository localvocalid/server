# Install dependencies
FROM node AS deps
WORKDIR /app/medusa

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build the source code and run the server
FROM node AS builder
WORKDIR /app/medusa

COPY --from=deps /app/medusa/node_modules ./node_modules
COPY . .

RUN yarn build
RUN yarn global add @medusajs/medusa-cli
RUN yarn migrate

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
EXPOSE 8001
CMD ["yarn", "serve"]
