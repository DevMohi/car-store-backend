import QueryBuilder from '../../builder/QueryBuilder';
import { searchableProductFields } from './products.constant';
import { TProduct } from './products.interface';
import { Products } from './products.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Products.create(product);
  return result;
  // const result = await
};

//getAll not created yet

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productsQuery = new QueryBuilder(Products.find(), query)
    .search(searchableProductFields)
    .filter();
  const result = await productsQuery.modelQuery;
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Products.findById(id);
  return result;
};

const updateProductFromDB = async (id: string, payload: Partial<TProduct>) => {
  //in-stock handled
  if (payload.stock !== undefined) {
    payload.inStock = payload.stock > 0;
  }
  const result = await Products.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Products.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
