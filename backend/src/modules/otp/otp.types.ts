export interface OtpRequest {
  phone: string;
}

export interface OtpVerify {
  phone: string;
  code: string;
}
