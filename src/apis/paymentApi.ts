import api from "./api";

export interface ValidateResponse {
  channel: string;
  escrow: boolean;
  name: string;
  amount: number;
  currency: string;
  status: string;
  payMethod: string;
  merchantUid: string;
  pgProvider: string;
  applyNum: string;
  bankCode?: string | null;
  bankName?: string | null;
  cardCode?: string | null;
  cardName?: string | null;
  cardNumber?: string | null;
  cardQuota: number;
  cardType: number;
  vbankCode?: string | null;
  vbankName?: string | null;
  vbankNum?: string | null;
  vbankHolder?: string | null;
  vbankDate: number;
  vbankIssuedAt: number;
  cancelAmount: number;
  buyerName: string;
  buyerEmail?: string | null;
  buyerTel: string;
  buyerAddr: string;
  buyerPostcode: string;
  customData?: string;
  startedAt: number;
  failedAt: number;
  cancelledAt: number;
  failReason?: string | null;
  cancelReason?: string | null;
  receiptUrl: string;
  cancelHistory: string[];
  cashReceiptIssued: boolean;
  customerUid?: string | null;
  customerUidUsage?: string;
  impUid: string;
  pgTid: string;
  paidAt: number;
}

export interface ValidateApiResponse {
  code: number;
  message?: string;
  response: ValidateResponse;
}

export const paymentApi = {
  completePayment: ({ ...body }) => api.post("/payment", body),
  validatePayment: (imp_uid: string) => api.post<ValidateApiResponse>(`/payment/${imp_uid}`),
  getUserInfo: () => api.get("/auth/member"),
};

export default paymentApi;
