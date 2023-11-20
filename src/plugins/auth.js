'use strict';

const fp = require('fastify-plugin');
const jwt = require('jsonwebtoken');

const authController = require('../controllers/auth.controller.js');
const authService = require('../services/auth.service.js');


module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/auth'));

  fastify.decorateReply('locals', { user: null });

  fastify.decorate('authorize', authorize);

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

async function authorize(request, reply) {
  const accessToken = request.headers.authorization.split(' ')[1];
  if (!accessToken) {
    throw new Error('unauthorized: missing access token');
  }
  try {
    const token = jwt.verify(accessToken, process.env.JWT_SECRET);
    return token;
  }
  catch (error) {
    const err = new Error('Invalid token, try login again.');
    err.statusCode = 401;
    throw err;
  }
}
