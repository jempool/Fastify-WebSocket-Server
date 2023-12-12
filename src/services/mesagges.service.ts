import { IMessage } from "interfaces/message.interface.js";
import dbService from "./db.service.js";

export default {
  getAllHistory: async function (): Promise<IMessage[]> {
    return dbService.getAllHistory().then((message) => {
      return message;
    });
  },
};
