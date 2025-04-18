import { Types } from 'mongoose';

export type TOrder = {
  user: Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  deliveryStatus: 'Delivered' | 'Pending' | 'Cancelled' | 'Shipped' | 'Proccesing';
  transaction: {
    id: string;
    transaction_status?: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
};
