export interface Bike {
  id: number;
  model: string;
  type: string;
  hourly_rate: number;
  location: string;
  image_url?: string;
  is_available: boolean;
}
