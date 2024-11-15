'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import { ReactSortable } from 'react-sortablejs';

import { BackgroundContext } from '@/app/context';
import { TaskType } from '@/app/lib/definitions';
import TaskForm from './TaskForm';

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

export default function Tasks() {
  const [tasks, setTasks] = useState(taskItems);
  const [activeTask, setActiveTask] = useState<TaskType>(tasks[0]);
  const context = React.useContext(BackgroundContext);
  const [openForm, setOpenForm] = useState(false);

  if (!context) {
    throw new Error('BackgroundContext is not provided');
  }

  const toggleMarkAsDoneButton = (id: string) => {
    setTasks((curr) =>
      curr.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  const updateActiveTask = (id: string) => {
    const task = tasks.find((item) => item.id === id);
    if (task) {
      setActiveTask(task);
    }
  };

  const changeFormVisibility = () => {
    setOpenForm((curr) => !curr);
  };

  const addNewTask = (task: TaskType) => {
    setTasks((curr) => curr.concat(task));
  };

  return (
    <div className="container max-w-2xl mx-auto mb-12">
      <div id="current-task" className="text-center mt-6">
        <h3 className="text-white opacity-50">#1</h3>
        <h2 className="text-lg">{activeTask.name}</h2>
      </div>
      <div
        id="tasks-header"
        className="border-b py-3 my-6 flex justify-between"
      >
        <h3 className="text-lg font-semibold">Tasks</h3>
        <div
          className="tasks-edit cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Handle task list edit
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 bg-white bg-opacity-20 rounded hover:bg-opacity-25"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div id="task-list">
        <ReactSortable
          list={tasks}
          setList={setTasks}
          delay={500}
          delayOnTouchOnly={true}
          animation={300}
        >
          {tasks.map((task) => (
            <li
              key={task.id}
              className={clsx(
                activeTask.id === task.id ? 'active-task' : 'inactive-task',
                'bg-white border-white border-l-8 flex gap-12 justify-between text-gray-600 mb-2 px-4 py-4 rounded cursor-pointer font-semibold'
              )}
              onClick={() => updateActiveTask(task.id)}
            >
              <div className="task-title flex gap-2 items-center leading-relaxed">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMarkAsDoneButton(task.id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={clsx(
                      'h-8',
                      task.isDone ? `text-${context.color}` : 'text-gray-300',
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
                <span
                  className={clsx(task.isDone ? 'opacity-60 line-through' : '')}
                >
                  {task.name}
                </span>
              </div>
              <div className="task-status opacity-60 gap-3 flex items-center">
                <div className="status tracking-widest">
                  <span className="font-black text-xl">
                    {task.pomodoro.finished}
                  </span>
                  /<span>{task.pomodoro.estimated}</span>
                </div>
                <div
                  className="task-edit"
                  onClick={(e) => {
                    e.stopPropagation();
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
          ))}
        </ReactSortable>
      </div>
      {openForm ? (
        <TaskForm
          changeFormVisibility={changeFormVisibility}
          addNewTask={addNewTask}
        />
      ) : (
        <button
          onClick={() => changeFormVisibility()}
          className="w-full border-2 bg-black bg-opacity-10 hover:opacity-80 rounded opacity-60 py-4 font-bold border-dashed flex gap-2 items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Add Task</span>
        </button>
      )}
    </div>
  );
}
