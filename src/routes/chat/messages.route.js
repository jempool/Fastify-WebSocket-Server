'use strict';

const messagesController = require('../../controllers/messages.controller.js');


module.exports = async function (fastify, opts) {

  /* GET History. */
  fastify.get('/history', messagesController.history);
};
