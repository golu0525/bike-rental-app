export interface Booking {
  id: number;
  user_id: number;
  bike_id: number;
  model: string;
  location: string;
  start_time: string;
  end_time: string;
  total_amount: number;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  created_at: string;
}
