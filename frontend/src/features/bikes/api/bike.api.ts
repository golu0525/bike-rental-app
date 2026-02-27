import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const bikeApi = {
  getBikes: (params?: { location?: string; type?: string }) =>
    axios.get(`${API_URL}/bikes`, { params }),
  
  addBike: (data: any, token: string) =>
    axios.post(`${API_URL}/bikes`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  updateBike: (id: number, data: any, token: string) =>
    axios.put(`${API_URL}/bikes/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  deleteBike: (id: number, token: string) =>
    axios.delete(`${API_URL}/bikes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
};
