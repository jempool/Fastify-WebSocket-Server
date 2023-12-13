import topicsController from "../controllers/topics.controller";
import topicsSchemas from "../schemas/topics.schema";

export default async function (fastify, opts) {
  /* GET Topic. */
  fastify.route({
    method: "GET",
    url: "/topics/today",
    schema: topicsSchemas.topicsSchema,
    handler: topicsController.getTodaysTopic,
  });
}
