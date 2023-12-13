export default {
  topicsSchema: {
    response: {
      200: {
        type: "object",
        properties: {
          topic: { type: "string" },
        },
        required: ["topic"],
      },
    },
  },
};
