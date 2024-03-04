import api from "./api";
import { RecommendRequset } from "models/mealkeat/RecommendModels";

export const recommendApi = {
  getRecommendations: ({ ...body }: RecommendRequset) => api.post("/recommendation", body),
  getWineRecommendations: ({ ...body }: RecommendRequset) => api.post("/recommendation/wine", body),
  getMainRecommendations: () => api.post("/recommendation/main"),
};

export default recommendApi;
