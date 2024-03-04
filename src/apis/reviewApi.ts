import api from "./api";

export const reviewApi = {
  saveReview: ({ ...body }) => api.post("/reviews", body),
  updateReview: ({ ...body }) => api.put("/reviews", body),
  deleteReview: ({ ...body }) => api.delete("/reviews", { data: { ...body } }),

  getAbleReviewProduct: () => api.get("/reviews/able"),
  getReviewsByMemberId: () => api.get("/reviews/member"),
  getProductReviewByMemberId: (productId: number) => api.get(`/reviews/member/${productId}`),
  getProductReviews: (productId: number) => api.get(`/reviews/product/${productId}/page/{pageNum}`),

  uploadImage: (formData: FormData) => {
    return api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 필요한 경우 명시적으로 설정
      },
    });
  },
};

export default reviewApi;
