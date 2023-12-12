"use strict";

import messagesController from "../controllers/messages.controller";
import messagesSchemas from "../schemas/messages.schema";

export default async function (fastify, opts) {
  /* GET History. */
  fastify.route({
    method: "GET",
    url: "/history",
    schema: messagesSchemas.messagesSchema,
    handler: messagesController.history,
  });
}
