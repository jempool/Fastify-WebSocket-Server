const { User } = require('../models/user.js');
const { Message } = require('../models/message');

module.exports = {

  // === Users ====

  getAllHistory: async function () {
    return await Message.find();
  },

  addMessage: async function (message) {
    const newMessage = new Message({ ...message });
    return await newMessage.save();
  },

  // === Chat ===

  getUserByEmail: async function (email) {
    return await User.findOne({ email });
  },

  createUser: async function (user) {
    const newUser = new User({ ...user });
    return await newUser.save();
  }
};
