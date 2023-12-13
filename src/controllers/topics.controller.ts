import topicService from "../services/topic.service";
import { Topic } from "../interfaces/topic.interface";

export default {
  getTodaysTopic: async () => {
    const topic: Topic = await topicService.getTodaysTopic();
    return topic;
  },
};
