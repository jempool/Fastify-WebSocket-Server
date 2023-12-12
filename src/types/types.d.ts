import type { User } from "../models/user.model";

declare module "fastify" {
  interface FastifyReply {
    locals: {
      user: typeof User | null;
    };
  }
}
