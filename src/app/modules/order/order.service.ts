import { JwtPayload } from 'jsonwebtoken';
import { TOrder } from './order.interface';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import { Products } from '../products/products.model';
import { Order } from './order.model';

const createOrderIntoDB = async (
  orderInfo: Partial<TOrder>,
  userInfo: JwtPayload,
) => {
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
    const subTotal = product.price * item.quantity;
    totalPrice += subTotal;

    product.stock = product.stock - item.quantity;
    await product.save();

    orderDetails.push({ product: item.product, quantity: item.quantity });
  }

  const order = await Order.create({
    user: user._id,
    products: orderDetails,
    totalPrice,
  });

  return order;

  //   console.log(products);
};

const getCustomerOrderFromDB = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }
  const result = await Order.find({ user: user._id });
  return result;
};

const getAllOrdersFromDB = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }
  const result = await Order.find().populate('user');
  return result;
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
  deleteOrderFromDB,
};
