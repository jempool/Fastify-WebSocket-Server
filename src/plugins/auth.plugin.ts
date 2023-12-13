import fp from "fastify-plugin";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../utils/errors";

export default fp(async function (fastify, opts) {
  fastify.addHook("onRequest", async (request, reply) => {
    reply.locals = { user: null };
  });

  fastify.decorate("authorize", authorize);
});

async function authorize(request, reply) {
  try {
    const accessToken = request.headers.authorization.split(" ")[1];
    const token = jwt.verify(accessToken, process.env.JWT_SECRET);
    return token;
  } catch (error) {
    throw new UnauthorizedError("Invalid token, try login again.");
  }
}
