import { Request, Response } from 'express';
import { AuthService } from './auth.service.js';

const authService = new AuthService();

export const signup = async (req: Request, res: Response) => {
  const { name, email, password, location } = req.body;

  try {
    const result = await authService.signup(name, email, password, location);
    res.status(201).json({ message: 'User created successfully', ...result });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Error creating user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Error during login' });
  }
};
