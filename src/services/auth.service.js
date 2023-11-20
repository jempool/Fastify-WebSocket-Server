'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const dbService = require('../services/db.service.js');


module.exports = {
  login: function (request, reply, done) {
    const { email, password } = request.body;
    dbService.getUserByEmail(email)
      .then((user) => {
        if (!user || !bcrypt.compareSync(password, user.password)) {
          const err = new Error('Incorrect email or password.');
          err.statusCode = 400;
          return done(err);
        }
        reply.locals.user = user.toResponseObject();
        return done();
      })
      .catch((error) => {
        console.log(error);
        const err = new Error('failure trying to fetch the user.');
        err.statusCode = 500;
        return done(err);
      });
  },

  signup: function (request, reply, done) {
    const { email, name, password } = request.body;
    dbService.getUserByEmail(email)
      .then((user) => {
        if (user) {
          const err = new Error(`The email ${email} is already associated with an account`);
          err.statusCode = 400;
          return done(err);
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        dbService.createUser({ name, email, password: hash })
          .then((user) => {
            reply.locals.user = user.toResponseObject();
            return done();
          });
      })
      .catch((error) => {
        console.log(error);
        const err = new Error('failure trying to fetch the user.');
        err.statusCode = 500;
        return done(err);
      });
  },

  refreshToken: function (request, reply, done) {
    const { email, refreshToken } = request.body;
    const token = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const isValid = token.user.email === email;
    if (!isValid) {
      const err = new Error('Invalid token, try login again.');
      err.statusCode = 401;
      return done(err);
    }
    reply.locals.user = { name: token.user.name, email: token.user.email };
    return done();
  }
};

