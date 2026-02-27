export interface SignupData {
  name: string;
  email: string;
  password: string;
  location: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
  };
}
