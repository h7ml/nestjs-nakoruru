FROM node:18.16.1 as builder

ENV NODE_ENV build

USER root
WORKDIR /home/node

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY .npmrc ./

RUN npm install -g npm@9.6.7 pnpm

USER node

RUN pnpm install

COPY --chown=node:node . /home/node

RUN pnpm run build 

# ---

FROM node:18.16.1

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json ./
COPY --from=builder /home/node/node_modules/ ./node_modules/
COPY --from=builder /home/node/dist/ ./dist/
CMD ["node", "dist/main.js"]
