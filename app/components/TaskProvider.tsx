'use client';

import React, { useEffect, useState } from 'react';
import { TasksContext } from '@/app/context';
import { TaskType } from '../lib/definitions';

function getInitialState() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

function getActiveTask() {
  const id = localStorage.getItem('active-task-id');
  const tasks = getInitialState();

  const activeTask = tasks.length
    ? tasks.find((t: TaskType) => t.id === id)
    : null;
  return activeTask ? activeTask : tasks[0];
}

export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<TaskType[]>(getInitialState);
  const [activeTask, setActiveTask] = useState<TaskType>(getActiveTask);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('active-task-id', activeTask?.id);
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
    if (activeTask.id === updatedTask.id) {
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

    console.log(activeTask.id, id);
    if (activeTask.id === id) {
      // TODO: Not currently working, fix this
      setActiveTask(tasks[0]);
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
