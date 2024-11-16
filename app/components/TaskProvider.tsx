'use client';

import React, { useState } from 'react';
import { TasksContext } from '@/app/context';
import { v4 as uuidv4 } from 'uuid';
import { TaskType } from '../lib/definitions';

const taskItems = [
  {
    name: 'Do Laundry and exercise after because im late  and I am broke asf but i want to eat out.',
    id: uuidv4(),
    isDone: false,
    pomodoro: { estimated: 4, finished: 2 },
  },
  {
    name: 'Wash Dishes',
    id: uuidv4(),
    isDone: true,
    pomodoro: { estimated: 1, finished: 1 },
  },
  {
    name: 'Skincare routine',
    id: uuidv4(),
    isDone: true,
    pomodoro: { estimated: 2, finished: 2 },
  },
  {
    name: 'Learn how to code',
    id: uuidv4(),
    isDone: false,
    pomodoro: { estimated: 6, finished: 3 },
  },
];

export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState(taskItems);
  const [activeTask, setActiveTask] = useState(tasks[0]);

  const addTask = (newTask: TaskType) => {
    setTasks((curr) => curr.concat(newTask));
  };

  const changeActiveTask = (id: string) => {
    const task = tasks.find((item) => item.id === id);
    if (task) {
      setActiveTask(task);
    }
  };

  const updateTask = (updatedTask: TaskType) => {
    setTasks((curr) =>
      curr.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const markTaskAsDone = (id: string) => {
    setTasks((curr) =>
      curr.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
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
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
