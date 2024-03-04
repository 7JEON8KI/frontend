import api from "./api";
import { RecommendRequset } from "models/mealkeat/RecommendModels";

export const recommendApi = {
  getRecommendations: ({ ...body }: RecommendRequset) => api.post("/recommendation", body),
  getWineRecommendations: ({ ...body }: RecommendRequset) => api.post("/recommendation/wine", body),
};

export default recommendApi;
