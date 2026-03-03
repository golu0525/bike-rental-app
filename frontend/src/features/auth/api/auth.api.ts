import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const authApi = {
  signup: (data: { name: string; email: string; password: string; location: string }) =>
    axios.post(`${API_URL}/auth/signup`, data),
  
  login: (data: { email: string; password: string }) =>
    axios.post(`${API_URL}/auth/login`, data),

  requestOtp: (phone: string) =>
    axios.post(`${API_URL}/auth/otp/request-otp`, { phone }),

  verifyOtp: (phone: string, code: string) =>
    axios.post(`${API_URL}/auth/otp/verify-otp`, { phone, code }),
};
