import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidationSchema } from './user.validation';
import { UserControllers } from './user.controller';
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
router.get('/', UserControllers.getAllUser);

//Can be done by admin only
router.patch('/update-status/:id', UserControllers.updateUserStatus);

export const UserRoutes = router;
