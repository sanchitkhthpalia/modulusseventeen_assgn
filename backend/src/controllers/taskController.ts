import { Response } from 'express';
import { Task } from '../models/Task';
import { AuthRequest } from '../middleware/auth';
import { validationResult } from 'express-validator';

export async function listTasks(req: AuthRequest, res: Response) {
  const userId = req.userId!;
  const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
  return res.json({ tasks });
}

export async function createTask(req: AuthRequest, res: Response) {
  const userId = req.userId!;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description, datetime, deadline, priority } = req.body;
  const task = await Task.create({
    title,
    description,
    datetime,
    deadline,
    priority,
    userId,
  });
  return res.status(201).json({ task });
}

export async function updateTask(req: AuthRequest, res: Response) {
  const userId = req.userId!;
  const { id } = req.params;
  const updates = req.body;
  const task = await Task.findOneAndUpdate({ _id: id, userId }, updates, { new: true });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  return res.json({ task });
}

export async function deleteTask(req: AuthRequest, res: Response) {
  const userId = req.userId!;
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, userId });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  return res.status(204).send();
}


