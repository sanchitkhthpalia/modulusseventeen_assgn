import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Task, TaskInput, Priority } from '../types';
import * as TaskApi from '../api/tasks';

type SortKey = 'deadline' | 'priority' | 'createdAt';

type TaskState = {
  tasks: Task[];
  loading: boolean;
  sortBy: SortKey;
  filter: { status: 'all' | 'completed' | 'pending'; priority?: Priority };
  refresh: () => Promise<void>;
  addTask: (input: TaskInput) => Promise<void>;
  updateTask: (id: string, updates: Partial<TaskInput> & { completed?: boolean }) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setSortBy: (k: SortKey) => void;
  setFilter: (f: TaskState['filter']) => void;
};

const Ctx = createContext<TaskState | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>('createdAt');
  const [filter, setFilter] = useState<TaskState['filter']>({ status: 'all' });

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await TaskApi.getTasks();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const addTask = async (input: TaskInput) => {
    const task = await TaskApi.createTask(input);
    setTasks((t) => [task, ...t]);
  };

  const updateTask = async (id: string, updates: Partial<TaskInput> & { completed?: boolean }) => {
    const task = await TaskApi.updateTask(id, updates);
    setTasks((t) => t.map((x) => (x._id === id ? task : x)));
  };

  const deleteTask = async (id: string) => {
    await TaskApi.deleteTask(id);
    setTasks((t) => t.filter((x) => x._id !== id));
  };

  const sortedFiltered = useMemo(() => {
    let arr = [...tasks];
    if (filter.status !== 'all') {
      arr = arr.filter((t) => (filter.status === 'completed' ? t.completed : !t.completed));
    }
    if (filter.priority) arr = arr.filter((t) => t.priority === filter.priority);
    arr.sort((a, b) => {
      if (sortBy === 'priority') {
        const order: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 };
        return order[a.priority] - order[b.priority];
      }
      const av = (a as any)[sortBy];
      const bv = (b as any)[sortBy];
      return new Date(av || 0).getTime() - new Date(bv || 0).getTime();
    });
    return arr;
  }, [tasks, filter, sortBy]);

  const value: TaskState = {
    tasks: sortedFiltered,
    loading,
    sortBy,
    filter,
    refresh,
    addTask,
    updateTask,
    deleteTask,
    setSortBy,
    setFilter,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTasks() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
}


