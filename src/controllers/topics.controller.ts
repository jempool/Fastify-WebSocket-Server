import topicService from "../services/topic.service";
import { Topic } from "../interfaces/topic.interface";

const topicsController = {
  getTodaysTopic: async (): Promise<Topic> => {
    return await topicService.getTodaysTopic();
  },
};

export default topicsController;
