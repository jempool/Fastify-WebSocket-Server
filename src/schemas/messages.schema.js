'use strict';

module.exports = {
  messagesSchema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            handle: { type: 'string' }
          },
          required: ['message', 'handle']
        }
      }
    }
  }
};
