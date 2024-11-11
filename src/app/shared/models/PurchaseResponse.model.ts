export interface PurchaseResponse {
  id: number;
  total: number;
  paymentStatus: string;
  createdAt: string;
  userId: number;
  subscriptionId: number;
  donationId?: number | null;
}
