export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  datetime?: string;
  deadline?: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskInput {
  title: string;
  description?: string;
  datetime?: string;
  deadline?: string;
  priority?: Priority;
  completed?: boolean;
}


