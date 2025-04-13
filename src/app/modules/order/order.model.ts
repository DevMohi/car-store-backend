import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  deliveryStatus: {
    type: String,
    enum: ['Delivered', 'Pending', 'Cancel'],
    default: 'Pending',
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  transaction: {
    id: String,
    transaction_status: String,
    bank_status: String,
    sp_code: String,
    sp_message: String,
    method: String,
    date_time: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  {
    timestamps: true,
  },
});

export const Order = model('Order', orderSchema);
