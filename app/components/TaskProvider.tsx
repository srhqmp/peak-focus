'use client';

import React, { useEffect, useState } from 'react';
import { TasksContext } from '@/app/context';
import { TaskType } from '../lib/definitions';

export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  useEffect(() => {
    const storageTasks = localStorage.getItem('tasks');
    const parsedTasks = storageTasks ? JSON.parse(storageTasks) : [];
    setTasks(parsedTasks);

    const id = localStorage.getItem('active-task-id');
    const task = parsedTasks.length
      ? parsedTasks.find((t: TaskType) => t.id === id)
      : null;
    setActiveTask(task);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('active-task-id', activeTask?.id || '');
  }, [tasks, activeTask]);

  const addTask = (newTask: TaskType) => {
    setTasks((curr: TaskType[]) => [...curr, newTask]);
    if (tasks.length === 0) setActiveTask(newTask);
  };

  const changeActiveTask = (id: string) => {
    const task = tasks.find((item: TaskType) => item.id === id);
    if (task) {
      setActiveTask(task);
    }
  };

  const updateTask = (updatedTask: TaskType) => {
    setTasks((curr: TaskType[]) =>
      curr.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    if (activeTask && activeTask.id === updatedTask.id) {
      setActiveTask(updatedTask);
    }
  };

  const markTaskAsDone = (id: string) => {
    setTasks((curr: TaskType[]) =>
      curr.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((curr: TaskType[]) => curr.filter((item) => item.id !== id));

    if (activeTask && activeTask.id === id) {
      setActiveTask(null);
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        activeTask,
        changeActiveTask,
        updateTask,
        setTasks,
        markTaskAsDone,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
