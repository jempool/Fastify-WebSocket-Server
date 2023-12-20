import messagesService from "../services/messages.service";

// Define the controller object
const messagesController = {
  history: async function (request, reply) {
    try {
      await this.authorize(request, reply);
      const messages = await messagesService.getAllHistory();
      reply.code(200).send(messages);
    } catch (e) {
      reply.code(500).send({ error: e.message });
    }
  },
};

export default messagesController;
