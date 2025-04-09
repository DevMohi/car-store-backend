import { Types } from 'mongoose';

export type TOrder = {
  user: Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  deliveryStatus: 'Delivered' | 'Pending' | 'Cancelled';
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
};
