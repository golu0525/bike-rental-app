import { Router } from 'express';
import { requestOtp, verifyOtp } from './otp.controller.js';
import { requestOtpValidation, verifyOtpValidation } from './otp.validation.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { validationResult } from 'express-validator';

const router = Router();

// helper to run validations
const runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

router.post('/request-otp', requestOtpValidation, runValidation, asyncHandler(requestOtp));
router.post('/verify-otp', verifyOtpValidation, runValidation, asyncHandler(verifyOtp));

export default router;
