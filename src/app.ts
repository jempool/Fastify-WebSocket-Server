"use strict";

import path from "node:path";
import AutoLoad from "@fastify/autoload";
import fastifySocketIo from "fastify-socket.io";
import cors from "@fastify/cors";
import mongoose from "mongoose";

import { DATABASE_URL, DATABASE_NAME } from "./utils/constants";
import socketIO from "./webSockets/webSockets";

// Pass --options via CLI arguments in command to enable these options.
// const options = {};

export default async function (fastify, opts) {
  //connected fastify to mongoose
  try {
    await mongoose.connect(`${DATABASE_URL}/${DATABASE_NAME}`);
  } catch (e) {
    console.error(e);
  }

  // === CORS ===
  await fastify.register(cors, {
    origin: "*",
  });

  // === WebSockets ===
  await fastify.register(fastifySocketIo, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  await socketIO(fastify);

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
}

// module.exports.options = options;
