import Shurjopay, { VerificationResponse } from 'shurjopay';
import config from '../../config';

export const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp_endpoint!,
  config.sp_username!,
  config.sp_password!,
  config.sp_prefix!,
  config.sp_return_url!,
);

// shurjopay.config(
//   'https://sandbox.shurjopayment.com',
//   'sp_sandbox',
//   'pyyk97hu&6u6',
//   'INV',
//   'https://f599-103-148-177-6.ngrok-free.app',
// );

const makePaymentAsync = async (
  orderPayload: any,
): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      orderPayload,
      (res: any) => resolve(res),
      (err: any) => reject(err),
    );
  });
};

// Payment Verify
const verifyPaymentAsync = (
  order_id: string,
): Promise<VerificationResponse[]> => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (res) => resolve(res),
      (err) => reject(err),
    );
  });
};

export const OrderUtils = {
  makePaymentAsync,
  verifyPaymentAsync,
};
