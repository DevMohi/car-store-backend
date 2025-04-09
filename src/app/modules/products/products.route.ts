import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidationSchema } from './products.validation';
import { ProductControllers } from './products.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// router.post('/')

router.post(
  '/',
  auth('admin'),
  validateRequest(ProductValidationSchema.createProductValidationSchema),
  ProductControllers.createProduct,
);


router.get('/', ProductControllers.getAllProducts);  
router.get('/:productId', ProductControllers.getSingleProduct);

router.patch(
  '/:productId',
  auth('admin'),
  validateRequest(ProductValidationSchema.updateProductValidationSchema),
  ProductControllers.updateProduct,
);

//Didnt test yet
router.delete('/productId', auth('admin'), ProductControllers.deleteProduct);

export const ProductRoutes = router;
