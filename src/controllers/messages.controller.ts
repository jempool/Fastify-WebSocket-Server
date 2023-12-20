import messagesService from "../services/messages.service";

export default {
  history: async function (request, reply) {
    try {
      await this.authorize(request, reply);
      const messages = await messagesService.getAllHistory();
      reply.code(200).send(messages);
    } catch (e) {
      reply.send(e);
    }
  },
};
