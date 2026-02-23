export type User = {
  id: number;
  isActive: boolean;
  isVerified: boolean;
  name: string;
  roleId: number;
  userCode?: string;
  customer: customer;
  userDetail: userDetail;
  isPasswordChangeRequired: boolean;
  accessToken: string;
  refreshToken: string;
};

export type userDetail = {
  admissionYear: string;
  birthPlace: string;
  birthDate: string;
  class: classroom;
  email: string;
  gender: gender;
  homeroomTeacher: homeroomTeacher;
  imgUrl: string;
  nickname: string;
  nisn: string;
  phoneNumber: string;
  userCategory: userCategory;
};

export type customer = {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  customerCode: string;
  logo: string;
  isPaymentCashless: boolean;
};

export type classroom = {
  id: number;
  name: string;
};

export type gender = {
  id: number;
  name: string;
};

export type homeroomTeacher = {
  id: number;
  name: string;
};
export type userCategory = {
  id: number;
  name: string;
};
