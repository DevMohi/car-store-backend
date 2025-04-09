import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidationSchema } from './auth.validation';
import { AuthControllers } from './auth.controller';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidationSchema.userLoginValidationSchema),
  AuthControllers.loginUser,
);
// router.get()

// router.patch('/update-user');

// router.get('/me');

export const AuthRouters = router;
