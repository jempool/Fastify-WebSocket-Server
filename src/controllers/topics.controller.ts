import topicService from "../services/topic.service";
import { Topic } from "../interfaces/topic.interface";

const topicsController = {
  getTodaysTopic(): Promise<Topic> {
    return topicService.getTodaysTopic();
  },
};

export default topicsController;
