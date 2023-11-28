'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const dbService = require('../services/db.service.js');


module.exports = {
  login: async function (request, reply) {
    const { email, password } = request.body;
    const user = await dbService.getUserByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      const err = new Error('Incorrect email or password.');
      err.statusCode = 400;
      throw err;
    }
    reply.locals.user = user.toResponseObject();
  },

  signup: async function (request, reply) {
    const { email, name, password } = request.body;
    const user = await dbService.getUserByEmail(email);
    if (user) {
      const err = new Error(`The email ${email} is already associated with an account`);
      err.statusCode = 400;
      throw err;
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const createdUser = await dbService.createUser({ name, email, password: hash });
    if (createdUser) {
      reply.locals.user = createdUser.toResponseObject();
    }
  },

  refreshToken: async function (request, reply) {
    const { email, refreshToken } = request.body;
    const token = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const isValid = token.user.email === email;
    if (!isValid) {
      const err = new Error('Invalid token, try login again.');
      err.statusCode = 401;
      throw err;
    }
    reply.locals.user = { name: token.user.name, email: token.user.email };
  }
};

