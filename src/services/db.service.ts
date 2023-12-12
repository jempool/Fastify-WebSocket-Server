import { User } from "../models/user.model";
import { Message } from "../models/message.model";

export default {
  // === Chat ===

  getAllHistory: async function () {
    return await Message.find();
  },

  addMessage: async function (message) {
    const newMessage = new Message({ ...message });
    return await newMessage.save();
  },

  // === Users ====

  getUserByEmail: async function (email) {
    return await User.findOne({ email });
  },

  createUser: async function (user) {
    const newUser = new User({ ...user });
    return await newUser.save();
  },
};
