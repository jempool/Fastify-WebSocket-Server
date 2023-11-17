'use strict';

const fp = require('fastify-plugin');


const authController = require('../controllers/auth.controller.js');
const authService = require('../services/auth.service.js');


module.exports = fp(async function (fastify, opts) {
  fastify.decorateReply('locals', { user: null });

  fastify
    .decorate('login', authService.login)
    .register(require('@fastify/auth'))
    .after(() => {
      fastify.route({
        method: 'POST',
        url: '/auth/login',
        preHandler: fastify.auth([
          fastify.login
        ]),
        handler: authController.login
      });
    });
});
