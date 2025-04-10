import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrderIntoDB(
    req.body,
    req.user,
    req.ip,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order Created Successfully',
    data: result,
    // data: result,
  });
});

//Customer Order
const getCustomerOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getCustomerOrderFromDB(req.user.email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order Retrieved Successfully',
    data: result,
  });
});

//Get all -> for admin
const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB(req.user.email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Orders retrieved',
    data: result,
  });
});

// Order Verify Controllers
const orderverify = catchAsync(async (req, res) => {
  const result = await OrderServices.verifyPayment(req.query.orderId as string);
  console.log(req.query.orderId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order Verified Successful',
    data: result,
  });
});

// Update deliverys status - > for admin
const updateDeliveryStatus = catchAsync(async (req, res) => {
  const result = await OrderServices.updateDeliveryStatusFromDB(
    req.body?.deliveryStatus,
    req.params.orderId,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Delivery Status Updated Successful',
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.updateOrderIntoDB(
    req.body,
    req.user,
    req.ip,
    req.params.orderId,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order Updated Successfully',
    data: result,
  });
});

// delete an order -> for admin
const deleteOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.deleteOrderFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order Deleted Successfully',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getCustomerOrders,
  getAllOrders,
  deleteOrder,
  updateDeliveryStatus,
  orderverify,
  updateOrder,
};
