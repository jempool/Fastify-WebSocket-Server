'use strict';

module.exports = {
  refreshTokenSchema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        refreshToken: { type: 'string' }
      },
      required: ['email', 'refreshToken']
    },
    response: {
      200: {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string', format: 'email' }
            },
            required: ['name', 'email']
          },
          accessToken: { type: 'string' }
        },
        required: ['user', 'accessToken']
      }
    }
  },

  signupSchema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
      },
      required: ['name', 'email', 'password']
    },
    response: {
      200: {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string', format: 'email' }
            },
            required: ['name', 'email']
          },
          accessToken: { type: 'string' },
          refreshToken: { type: 'string' }
        },
        required: ['user', 'accessToken', 'refreshToken']
      }
    }
  },

  loginSchema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
      },
      required: ['email', 'password']
    },
    response: {
      200: {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string', format: 'email' }
            },
            required: ['name', 'email']
          },
          accessToken: { type: 'string' },
          refreshToken: { type: 'string' }
        },
        required: ['user', 'accessToken', 'refreshToken']
      }
    }
  }
};
