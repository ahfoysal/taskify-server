import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { TaskController } from './task.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  TaskController.createTask
);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), TaskController.getAllTasks);
router.get(
  '/user/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  TaskController.getAllTaskFromUser
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),

  TaskController.getSingleTaskById
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  TaskController.updateTask
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  TaskController.deleteTask
);

export const TaskRoutes = router;
