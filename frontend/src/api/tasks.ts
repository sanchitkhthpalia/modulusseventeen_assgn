import { api } from './client';
import { Task, TaskInput } from '../types';

export async function getTasks() {
  const res = await api.get<{ tasks: Task[] }>('/tasks');
  return res.data.tasks;
}

export async function createTask(input: TaskInput) {
  const res = await api.post<{ task: Task }>('/tasks', input);
  return res.data.task;
}

export async function updateTask(id: string, updates: Partial<TaskInput> & { completed?: boolean }) {
  const res = await api.patch<{ task: Task }>(`/tasks/${id}`, updates);
  return res.data.task;
}

export async function deleteTask(id: string) {
  await api.delete(`/tasks/${id}`);
}


