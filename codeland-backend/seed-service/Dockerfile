FROM node:20

RUN apt update && apt install -y postgresql-client

WORKDIR /app
COPY . .
RUN npm install
