import dbService from "./db.service.js";

export default {
  getAllHistory: async function () {
    return dbService.getAllHistory().then((message) => {
      return message;
    });
  },
};
