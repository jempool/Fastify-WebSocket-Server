import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "../utils/constants";

// Define a function to generate a token
function generateToken(user, expiresIn) {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn,
  });
}

// Define the controller object
const authController = {
  login: async function (request, reply) {
    const user = reply.locals.user;
    const accessToken = generateToken(user, ACCESS_TOKEN_EXPIRES_IN);
    const refreshToken = generateToken(user, REFRESH_TOKEN_EXPIRES_IN);
    return reply.send({ user, accessToken, refreshToken });
  },

  refreshToken: async function (request, reply) {
    const user = reply.locals.user;
    const accessToken = generateToken(user, ACCESS_TOKEN_EXPIRES_IN);
    return reply.send({ user, accessToken });
  },
};

export default authController;
