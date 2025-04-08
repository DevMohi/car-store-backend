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

router.get('/:productId', ProductControllers.getSingleProduct);

router.patch(
  '/:productId',
  validateRequest(ProductValidationSchema.updateProductValidationSchema),
  ProductControllers.updateProduct,
);

//Didnt test yet
router.delete('/productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
