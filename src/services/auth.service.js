'use strict';

const dbService = require('../services/db.service.js');
const bcrypt = require('bcrypt');


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
  }
};

