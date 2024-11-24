import React, { useState } from 'react';
import clsx from 'clsx';
import { TaskType } from '@/app/lib/definitions';
import TaskForm from './TaskForm';

export default function TaskItem({
  task,
  markTaskAsDone,
  bgColor,
  activeTask,
  changeActiveTask,
  updateTask,
  deleteTask,
}: {
  task: TaskType;
  markTaskAsDone: (id: string) => void;
  bgColor: string;
  activeTask: TaskType;
  changeActiveTask: (id: string) => void;
  updateTask: (updatedTask: TaskType) => void;
  deleteTask: (id: string) => void;
}) {
  const [isEditMode, setIsEditMode] = useState(false);

  const changeFormVisibility = () => {
    setIsEditMode((curr) => !curr);
  };

  if (isEditMode) {
    return (
      <TaskForm
        task={task}
        isEditMode={true}
        changeFormVisibility={changeFormVisibility}
        addTask={null}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    );
  }

  return (
    <li
      className={clsx(
        activeTask.id === task.id ? 'active-task' : 'inactive-task',
        'bg-white border-white border-l-8 flex gap-12 justify-between text-gray-600 mb-2 px-4 py-4 rounded cursor-pointer font-semibold'
      )}
      onClick={() => changeActiveTask(task.id)}
    >
      <div className="task-title flex gap-2 items-center leading-relaxed">
        <button
          onClick={(e) => {
            e.stopPropagation();
            markTaskAsDone(task.id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={clsx(
              'h-8',
              task.isDone ? `text-${bgColor}` : 'text-gray-300',
              'hover:opacity-60'
            )}
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <span className={clsx(task.isDone ? 'opacity-60 line-through' : '')}>
          {task.name}
        </span>
      </div>
      <div className="task-status opacity-60 gap-3 flex items-center">
        <div className="status tracking-widest">
          <span className="font-black text-xl">{task.pomodoro.finished}</span>/
          <span>{task.pomodoro.estimated}</span>
        </div>
        <div
          className="task-edit"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditMode(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 border-2 rounded border-gray-300 hover:bg-gray-300"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </li>
  );
}
