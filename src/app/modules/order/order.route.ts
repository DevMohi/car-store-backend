import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidationSchema } from './order.validation';
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

//create-order
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

//All Orders -> Admin can see all the orders , however customer can see their orders only
router.get('/order/:id', auth('admin','customer'), OrderControllers.getOrderById);

//Verify Payment
router.get('/verify', auth('customer'), OrderControllers.orderverify);

//admin can update order-delivery status 
router.patch(
  '/update-delivery-status/:orderId',
  auth('admin'),
  validateRequest(OrderValidationSchema.updateDeliveryStatusValidationSchema),
  OrderControllers.updateDeliveryStatus,
);

//update single order
router.patch(
  '/update-order/:orderId',
  auth('customer'),
  validateRequest(OrderValidationSchema.updateOrderValidationSchema),
  OrderControllers.updateOrder,
);

//Delete Single Order
router.delete('/delete-order/:id', auth('admin'), OrderControllers.deleteOrder);

export const OrderRoutes = router;
