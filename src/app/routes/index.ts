import express from 'express';

import { AuthRoutes } from '../modules/auth/auth.route';
import { TaskRoutes } from '../modules/task/task.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/tasks',
    route: TaskRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
