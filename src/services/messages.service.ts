import { IMessage } from "interfaces/message.interface";
import dbService from "./db.service";

const messagesService = {
  getAllHistory: async (): Promise<IMessage[]> => {
    return dbService.getAllHistory();
  },
};

export default messagesService;
