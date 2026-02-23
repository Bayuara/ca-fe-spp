import { User } from "./user";

export type Spp = {
  id: number;
  invoiceSpp: string;
  month: number;
  year: number;
  sppAmount: number;
  paymentDeadline: string;
  settlementTime: string;
  paymentType: string;
  statusPayment: {
    id: number;
    name: string;
  };
  vaNumber?: string;
  billKey?: string;
  billCode?: string;
  paymentCode?: string;
  expiredTime?: string;
  merchantId?: string;
  payUrl?: string;
};

export type SppPrint = {
  id: number;
  invoiceSpp: string;
  month: number;
  year: number;
  sppAmount: number;
  paymentDeadline: string;
  settlementTime: string;
  paymentType: string;
  merchantId?: string;
  expiredTime?: string;
  statusPayment: {
    id: number;
    name: string;
  };
  vaNumber?: string;
  transactionId?: string;
  billKey?: string;
  billCode?: string;
  paymentCode?: string;
  payUrl?: string;
  user: Pick<User, "id" | "name" | "userDetail">;
  totalAmount?: number;
  sppData?: Spp;
};

// export type statusPayment = {
//   statusPaymentName: string;
//   statusPaymentId: number;
// };
