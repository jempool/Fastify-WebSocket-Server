import { IUser } from "interfaces/user.interface";

declare module "fastify" {
  interface FastifyReply {
    locals: {
      user: IUser | null;
    };
  }
}
