import { Request } from 'express';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  location?: string;
}

export interface AuthRequest extends Request {
  user?: User;
}
