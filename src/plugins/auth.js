'use strict';

const fp = require('fastify-plugin');
const jwt = require('jsonwebtoken');


module.exports = fp(async function (fastify, opts) {
  fastify.addHook('onRequest', async (request, reply) => {
    reply.locals = { user: null };
  });

  fastify.decorate('authorize', authorize);
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
