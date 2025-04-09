import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidationSchema } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

//create-customer
router.post(
  '/create-user',
  validateRequest(UserValidationSchema.createUserValidationSchema),
  UserControllers.createUser,
);

//If needed can use it, because manually update korte bolse
router.post(
  '/create-admin',
  validateRequest(UserValidationSchema.createUserValidationSchema),
  UserControllers.createAdmin,
);

//Get All Users  -> this route is admin only
router.get('/', auth('admin'), UserControllers.getAllUser);

//Profile-update => email k readonly korba and password ai route e change korbona
router.patch(
  '/update-profile',
  auth('admin', 'customer'),
  validateRequest(UserValidationSchema.updateUserValidationSchema),
  UserControllers.updateUserInfo,
);

//Can be done by admin only
router.patch('/update-status/:id', UserControllers.updateUserStatus);

export const UserRoutes = router;
