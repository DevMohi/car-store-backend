import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrderIntoDB(req.body, req.user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order Created Successfully',
    data: result,
    // data: result,
  });
});

const getCustomerOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getCustomerOrderFromDB(req.user.email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order Retrieved Successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB(req.user.email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Orders retrieved',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.deleteOrderFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order Deleted Successful',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getCustomerOrders,
  getAllOrders,
  deleteOrder,
};
