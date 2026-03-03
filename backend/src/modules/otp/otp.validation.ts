import { body } from 'express-validator';

// simple E.164 phone validation
const phoneRegex = /^\+[1-9]\d{1,14}$/;

export const requestOtpValidation = [
  body('phone')
    .matches(phoneRegex)
    .withMessage('Phone number must be in E.164 format (e.g. +1234567890)')
];

export const verifyOtpValidation = [
  body('phone')
    .matches(phoneRegex)
    .withMessage('Phone number must be in E.164 format'),
  body('code')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP code must be 6 digits')
    .isNumeric()
    .withMessage('OTP code must contain only numbers')
];
