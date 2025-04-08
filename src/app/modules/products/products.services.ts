import { TProduct } from './products.interface';
import { Products } from './products.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Products.create(product);
  return result;
  // const result = await
};

export const ProductServices = {
  createProductIntoDB,
};
