import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import dbService from "../services/db.service";
import { BadRequestError, UnauthorizedError } from "../utils/errors";
import { BCRYPT_SALT_ROUNDS } from "../utils/constants";

// Define the service object
const authService = {
  login: async function (request, reply) {
    const { email, password } = request.body;
    const user = await dbService.getUserByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new BadRequestError("Incorrect email or password.");
    }
    reply.locals.user = user.toObject();
  },

  signup: async function (request, reply) {
    const { email, name, password } = request.body;
    const user = await dbService.getUserByEmail(email);
    if (user) {
      throw new BadRequestError(
        `The email ${email} is already associated with an account`
      );
    }
    const hash = hashPassword(password);
    const createdUser = await dbService.createUser({
      name,
      email,
      password: hash,
    });
    if (createdUser) {
      reply.locals.user = createdUser.toObject();
    }
  },

  refreshToken: async function (request, reply) {
    const { email, refreshToken } = request.body;
    const token = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET
    ) as jwt.JwtPayload;
    const isValid = token.user.email === email;
    if (!isValid) {
      throw new UnauthorizedError("Invalid token, try login again.");
    }
  },
};

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
}

export default authService;
