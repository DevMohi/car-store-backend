import { Router } from 'express';
import { ProductRoutes } from '../modules/products/products.route';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRouters } from '../modules/auth/auth.route';
import { OrderRoutes } from '../modules/order/order.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/auth',
    route: AuthRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
