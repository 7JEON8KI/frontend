import api from "./api";
import { RecommandRequset } from "models/mealkeat/RecommandModels";

export const recommandApi = {
  getRecommendations: ({ ...body }: RecommandRequset) => api.post("/recommendation", body),
  getWineRecommendations: ({ ...body }: RecommandRequset) => api.post("/recommendation/wine", body),
};

export default recommandApi;
