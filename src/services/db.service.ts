import { User } from "../models/user.model";
import { Message } from "../models/message.model";
import { IMessage } from "../interfaces/message.interface";
import { IUser } from "../interfaces/user.interface";

export default {
  // === Chat ===

  getAllHistory: async function () {
    return await Message.find();
  },

  addMessage: async function (message: IMessage) {
    const newMessage = new Message({ ...message });
    return await newMessage.save();
  },

  // === Users ====

  getUserByEmail: async function (email: string) {
    return await User.findOne({ email });
  },

  createUser: async function (user: IUser) {
    const newUser = new User({ ...user });
    return await newUser.save();
  },
};
