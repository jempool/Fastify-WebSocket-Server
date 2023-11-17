'use strict';

const messagesService = require('../services/mesagges.service.js');

module.exports = {
  history: async function (request, reply) {
    try {
      const messages = await messagesService.getAllHistory();
      reply.code(200).send(messages);
    }
    catch (e) {
      reply.code(401).send(e);
    }
  }
};

