import { Router } from 'express';
import { body, param } from 'express-validator';
import { requireAuth } from '../middleware/auth';
import { listTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';

export const taskRouter = Router();

taskRouter.use(requireAuth);

taskRouter.get('/', listTasks);

taskRouter.post(
  '/',
  [body('title').isString().notEmpty(), body('priority').optional().isIn(['Low', 'Medium', 'High'])],
  createTask
);

taskRouter.patch(
  '/:id',
  [param('id').isMongoId()],
  updateTask
);

taskRouter.delete('/:id', [param('id').isMongoId()], deleteTask);


