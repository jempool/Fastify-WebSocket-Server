"use strict";

export default {
  messagesSchema: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            message: { type: "string" },
            handle: { type: "string" },
          },
          required: ["message", "handle"],
        },
      },
    },
  },
};
