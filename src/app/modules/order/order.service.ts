import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import { Products } from '../products/products.model';
import { Order } from './order.model';
import { OrderUtils } from './order.utils';

const createOrderIntoDB = async (
  orderInfo: { products: { product: string; quantity: number }[] },
  userInfo: JwtPayload,
  client_ip: string | undefined,
) => {
  console.log(client_ip);
  const user = await User.isUserExistByEmail(userInfo.email);
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  if (!orderInfo.products?.length) {
    throw new AppError(400, 'The order is empty. Please specify products.');
  }

  //Calculate the price
  const products = orderInfo.products;
  let totalPrice = 0;
  const orderDetails = [];

  for (const item of products) {
    const product = await Products.findById(item.product);
    console.log(product);
    if (!product) {
      throw new AppError(400, `Product ${item.product} not found`);
    }
    if (product.stock < item.quantity) {
      throw new AppError(400, `Not enough stock for product ${item.product}.`);
    }
    //cc
    const subTotal = product.price * item.quantity;
    totalPrice += subTotal;

    product.stock = product.stock - item.quantity;
    await product.save();

    orderDetails.push({ product: item.product, quantity: item.quantity });
  }

  let order = await Order.create({
    user: user._id,
    products: orderDetails,
    totalPrice,
  });

  const orderPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user?.name,
    customer_address: user?.address,
    customer_email: user?.email,
    customer_phone: user?.phone,
    customer_city: user?.city,
    client_ip,
  };

  const payment = await OrderUtils.makePaymentAsync(orderPayload);
  console.log(payment);

  if ((payment as any)?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: (payment as any)?.sp_order_id,
        transaction_status: (payment as any)?.transactionStatus,
      },
    });
  }

  return (payment as any)?.checkout_url;
};

const verifyPayment = async (orderId: string) => {
  const verifiedPayment = await OrderUtils.verifyPaymentAsync(orderId);
  console.log(verifiedPayment[0].sp_code);
  if (verifiedPayment[0].sp_code === "1011") {
    throw new AppError(404, "Order not found!")
  }
  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': orderId,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

const getCustomerOrderFromDB = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }
  const result = await Order.find({ user: user._id }).sort({ createdAt: -1 });
  return result;
};

const getAllOrdersFromDB = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }
  const result = await Order.find().sort({ createdAt: -1 }).populate('user');
  return result;
};

const getOrderByIdFromDB = async (email: string, orderId: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }
  const result = await Order.findById(orderId).populate('user');
  return result;
};

const updateDeliveryStatusFromDB = async (
  deliveryStatus: string,
  orderId: string,
) => {
  const isOrderExists = await Order.findById(orderId);
  if (!isOrderExists) {
    throw new AppError(404, 'Order not Found');
  }
  // Update Status
  const result = await Order.findByIdAndUpdate(
    orderId,
    { deliveryStatus },
    { new: true },
  );

  return result;
};

const updateOrderIntoDB = async (
  orderInfo: { products: { product: string; quantity: number }[] },
  userInfo: JwtPayload,
  client_ip: string | undefined,
  orderId: string,
) => {
  // Find the user
  const user = await User.findOne({ email: userInfo?.email });
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  // Validate products
  const products = orderInfo.products;
  if (!products?.length) {
    throw new AppError(400, 'Order must include at least one product');
  }

  // Validate existing order
  const existingOrder = await Order.findById(orderId);
  if (!existingOrder) {
    throw new AppError(404, 'Order not found');
  }

  if (existingOrder.status === 'Paid') {
    throw new AppError(400, 'Cannot update a paid order');
  }

  // Recalculate total price and build updated order details
  let totalPrice = 0;
  const updatedOrderDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Products.findById(item.product);
      if (!product) {
        throw new AppError(400, `Product with ID ${item.product} not found`);
      }

      const subTotal = product.price * item.quantity;
      totalPrice += subTotal;

      return {
        product: item.product,
        quantity: item.quantity,
      };
    }),
  );

  // Update the order in DB
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    {
      user: user._id,
      products: updatedOrderDetails,
      totalPrice,
    },
    { new: true },
  );

  // Prepare payment payload
  const orderPayload = {
    amount: totalPrice,
    order_id: updatedOrder?._id,
    currency: 'BDT',
    customer_name: user?.name,
    customer_address: user?.address,
    customer_email: user?.email,
    customer_phone: user?.phone,
    customer_city: user?.city,
    client_ip,
  };

  const payment = await OrderUtils.makePaymentAsync(orderPayload);

  // Update transaction info if payment is successful
  if ((payment as any)?.transactionStatus) {
    await Order.findByIdAndUpdate(updatedOrder?._id, {
      transaction: {
        id: (payment as any)?.sp_order_id,
        transaction_status: (payment as any)?.transactionStatus,
      },
    });
  }

  return (payment as any)?.checkout_url;
};

const deleteOrderFromDB = async (id: string) => {
  const deletedOrder = await Order.findByIdAndDelete(id);
  // console.log(deletedOrder);
  if (!deletedOrder) {
    throw new AppError(404, 'Order not found or already deleted');
  }
  return deletedOrder;
};

export const OrderServices = {
  createOrderIntoDB,
  getCustomerOrderFromDB,
  getAllOrdersFromDB,
  getOrderByIdFromDB,
  updateDeliveryStatusFromDB,
  verifyPayment,
  updateOrderIntoDB,
  deleteOrderFromDB,
};
