'use strict';

const path = require('node:path');
const AutoLoad = require('@fastify/autoload');
const fastifySocketIo = require('fastify-socket.io');
const cors = require('@fastify/cors');
const mongoose = require('mongoose');

const { DATABASE_URL, DATABASE_NAME } = require('./src/utils/constants.js');
const socketIO = require('./src/webSockets/webSockets.js');

// Pass --options via CLI arguments in command to enable these options.
const options = {};

module.exports = async function (fastify, opts) {

  //connected fastify to mongoose
  try {
    await mongoose.connect(`${DATABASE_URL}/${DATABASE_NAME}`);
  }
  catch (e) {
    console.error(e);
  }

  // === CORS ===
  await fastify.register(cors, {
    origin: '*'
  });

  // === WebSockets ===
  await fastify.register(fastifySocketIo, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  await socketIO(fastify);

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'src/plugins'),
    options: Object.assign({}, opts)
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'src/routes'),
    options: Object.assign({}, opts)
  });
};

module.exports.options = options;
