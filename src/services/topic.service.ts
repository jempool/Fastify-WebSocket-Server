import dbService from "./db.service.js";

export default {
  getTodaysTopic: async function () {
    const now = new Date();
    const today = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );

    return await dbService.getTopicByDate(today);
  },
};
