import { Request, Response } from 'express';
import { OtpService } from './otp.service.js';

const otpService = new OtpService();

export const requestOtp = async (req: Request, res: Response) => {
  const { phone } = req.body;
  try {
    const result = await otpService.requestOtp(phone);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message || 'Unable to send OTP' });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { phone, code } = req.body;
  try {
    const result = await otpService.verifyOtp(phone, code);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ message: err.message || 'OTP verification failed' });
  }
};
