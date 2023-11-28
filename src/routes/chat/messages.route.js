'use strict';

const messagesController = require('../../controllers/messages.controller.js');
const messagesSchemas = require('../../schemas/messages.schema.js');


module.exports = async function (fastify, opts) {

  /* GET History. */
  fastify.route({
    method: 'GET',
    url: '/history',
    schema: messagesSchemas.messagesSchema,
    handler: messagesController.history
  });
};
