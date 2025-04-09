import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidationSchema } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { UserValidationSchema } from '../user/user.validation';
import { UserControllers } from '../user/user.controller';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidationSchema.userLoginValidationSchema),
  AuthControllers.loginUser,
);

router.post('/logout', AuthControllers.logoutUser);

//getting Profile info with token
router.get('/me', auth('admin', 'customer'), AuthControllers.getMe);

//change-password
router.post(
  '/change-password',
  auth('admin', 'customer'),
  validateRequest(AuthValidationSchema.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRouters = router;
