import { z } from 'zod';
import { ProductCategory } from './products.constant';

export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Please provide a product name' }),
    brand: z.string({ required_error: 'Please provide a brand name' }),
    price: z.number({ required_error: 'Please provide a price' }).min(0),
    model: z.string({ required_error: 'Please provide a model name' }),
    year: z
      .number({ required_error: 'Please provide a year' })
      .min(1900)
      .max(new Date().getFullYear()),
    category: z.enum([...ProductCategory] as [string, ...string[]]),
    quantity: z.number({ required_error: 'Please provide quantity' }).min(0),
    inStock: z.boolean({ required_error: 'Please specify stock status' }),
    image: z.string().optional(),
    productDetails: z.string({
      required_error: 'Please provide product details',
    }),
  }),
});

export const ProductValidationSchema = {
  createProductValidationSchema,
};
