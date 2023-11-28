'use strict';

const authController = require('../../controllers/auth.controller.js');
const authService = require('../../services/auth.service.js');
const authSchemas = require('../../schemas/auth.schema.js');


module.exports = async function (fastify, opts) {

  /* POST Login. */
  fastify.route({
    method: 'POST',
    url: '/login',
    schema: authSchemas.loginSchema,
    preHandler: authService.login,
    handler: authController.login
  });

  /* POST Signup. */
  fastify.route({
    method: 'POST',
    url: '/signup',
    schema: authSchemas.signupSchema,
    preHandler: authService.signup,
    handler: authController.login
  });

  /* POST Refresh token. */
  fastify.route({
    method: 'POST',
    url: '/refresh',
    schema: authSchemas.refreshTokenSchema,
    preHandler: authService.refreshToken,
    handler: authController.refreshToken
  });
};

