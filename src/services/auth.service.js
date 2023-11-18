'use strict';

const dbService = require('../services/db.service.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  login: function (request, reply, done) {
    const email = request.body.email;
    const password = request.body.password;
    dbService.getUserByEmail(email)
      .then((user) => {
        if (!user || !bcrypt.compareSync(password, user.password)) {
          return done(new Error('Incorrect email or password.'));
        }
        reply.locals.user = user.toResponseObject();
        return done();
      })
      .catch((err) => {
        console.error(err);
        done(new Error('failure to communicate with the database.'));
      });
  },
  signup: function (request, reply, done) {
    const email = request.body.email;
    const name = request.body.name;
    const password = request.body.password;
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
        const err = new Error('failure to communicate with the database.');
        err.statusCode = 500;
        return done(err);
      });
  }
};

