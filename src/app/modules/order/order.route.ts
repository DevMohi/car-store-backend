import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidationSchema } from './order.validation';
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-order',
  auth('customer'),
  validateRequest(OrderValidationSchema.createOrderValidationSchema),
  OrderControllers.createOrder,
);

//Will return individual orders
router.get('/my-orders', auth('customer'), OrderControllers.getCustomerOrders);

//All Orders -> Admin can see all the orders , however customer can see their orders only
router.get('/all-orders', auth('admin'), OrderControllers.getAllOrders);

//Delete Single Order
router.delete('/delete-order/:id', auth('admin'), OrderControllers.deleteOrder);

export const OrderRoutes = router;
