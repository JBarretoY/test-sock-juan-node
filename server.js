require("dotenv").config();

const app = require("express")();
const http = require("http").Server(app);
const listen = require("./src/listeners");
const sockets = require("socket.io")(http);
const sredis = require("socket.io-redis");
const config = require("./src/config");
const ioredis = require("ioredis");
const redis = require("redis");

sockets.adapter(
  sredis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  })
);

const worker = new ioredis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

config(app);
listen(sockets, worker, client);

http.listen(process.env.APP_PORT, () => {
  console.log(`Running Express on port ${process.env.APP_PORT}!`);
});
