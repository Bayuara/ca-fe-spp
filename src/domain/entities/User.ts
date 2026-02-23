/**
 * Domain Entity - User
 * Bersih dari dependensi framework atau infrastruktur
 */

export interface UserDetail {
  admissionYear: string;
  birthPlace: string;
  birthDate: string;
  class: { id: number; name: string };
  email: string;
  gender: { id: number; name: string };
  homeroomTeacher: { id: number; name: string };
  imgUrl: string;
  nickname: string;
  nisn: string;
  phoneNumber: string;
  userCategory: { id: number; name: string };
}

export interface User {
  id: number;
  isActive: boolean;
  isVerified: boolean;
  name: string;
  roleId: number;
  userCode?: string;
  customer: {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    customerCode: string;
    logo: string;
    isPaymentCashless: boolean;
  };
  userDetail: UserDetail;
  isPasswordChangeRequired: boolean;
  accessToken?: string;
  refreshToken?: string;
}
