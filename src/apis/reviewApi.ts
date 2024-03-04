import api from "./api";

export const reviewApi = {
  saveReview: ({ ...body }) => api.post("/reviews", body),
  updateReview: ({ ...body }) => api.put("/reviews", body),
  deleteReview: ({ ...body }) => api.delete("/reviews", { data: { ...body } }),

  getAbleReviewProduct: () => api.get("/reviews/able"),
  getReviewsByMemberId: () => api.get("/reviews/member"),
  getProductReviewByMemberId: (productId: number) => api.get(`/reviews/member/${productId}`),
  getProductReviews: (productId: number) => api.get(`/reviews/product/${productId}/page/{pageNum}`),
};

export default reviewApi;
