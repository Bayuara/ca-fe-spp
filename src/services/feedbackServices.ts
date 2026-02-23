import { fetchData } from "@/utils/api";

export default class FeedbackService {
    static async sendFeedback(payload: unknown) {
      return fetchData("feedback", "POST", payload);
  
  }
}
