"use strict";

import jwt from "jsonwebtoken";

import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "../utils/constants";

export default {
  login: async function (request, reply) {
    const user = reply.locals.user;
    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
    const refreshToken = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });
    return reply.send({ user, accessToken, refreshToken });
  },

  refreshToken: async function (request, reply) {
    const user = reply.locals.user;
    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
    return reply.send({ user, accessToken });
  },
};
