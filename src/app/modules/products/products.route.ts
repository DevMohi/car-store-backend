import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidationSchema } from './products.validation';
import { ProductControllers } from './products.controller';

const router = express.Router();

// router.post('/')

router.post(
  '/',
  validateRequest(ProductValidationSchema.createProductValidationSchema),
  ProductControllers.createProduct,
);

export const ProductRoutes = router;
