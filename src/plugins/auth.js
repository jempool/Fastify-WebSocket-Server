'use strict';

const fp = require('fastify-plugin');

const authController = require('../controllers/auth.controller.js');
const authService = require('../services/auth.service.js');


module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/auth'));
  fastify.decorateReply('locals', { user: null });

  fastify
    .decorate('login', authService.login)
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

  fastify
    .decorate('signup', authService.signup)
    .after(() => {
      fastify.route({
        method: 'POST',
        url: '/auth/signup',
        preHandler: fastify.auth([
          fastify.signup
        ]),
        handler: authController.login
      });
    });

  fastify
    .decorate('refresh', authService.refreshToken)
    .after(() => {
      fastify.route({
        method: 'POST',
        url: '/auth/refresh',
        preHandler: fastify.auth([
          fastify.refresh
        ]),
        handler: authController.refreshToken
      });
    });
});
