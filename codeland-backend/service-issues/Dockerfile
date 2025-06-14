FROM node:20

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 4003

CMD ["node", "dist/main"]
