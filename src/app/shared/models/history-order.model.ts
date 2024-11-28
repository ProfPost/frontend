export interface HistoryOrderModel {
  id: number;
  total: number;
  paymentStatus: string;
  createdAt: string;
  userId: number;
  subscriptionId: number | null;
  donationId: number | null;
}
