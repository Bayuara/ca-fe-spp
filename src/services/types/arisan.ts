export type Arisan = {
  id: number;
  name: string;
  customerId: number;
  isActive: boolean;
  arisanAmount: number;
  arisanDate: string;
  paymentDate: string;
  statusPayment: arisanStatusPayment;
};

export type arisanStatusPayment = {
  id: number;
  name: string;
};
