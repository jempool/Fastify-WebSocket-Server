
const dbService = require('./db.service.js');

module.exports = {
  getAllHistory: async function () {
    return dbService.getAllHistory()
      .then((message) => {
        return message;
      });
  }
};
