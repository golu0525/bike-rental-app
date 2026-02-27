import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const bookingApi = {
  getBookings: (token: string) =>
    axios.get(`${API_URL}/bookings`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  createBooking: (data: any, token: string) =>
    axios.post(`${API_URL}/bookings`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  cancelBooking: (id: number, token: string) =>
    axios.delete(`${API_URL}/bookings/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
};
