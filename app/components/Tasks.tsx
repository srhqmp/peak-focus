'use client';

import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

import { BackgroundContext, TasksContext } from '@/app/context';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

export default function Tasks() {
  const bgContext = React.useContext(BackgroundContext);
  const tasksContext = React.useContext(TasksContext);
  const [openForm, setOpenForm] = useState(false);

  if (!bgContext || !tasksContext) {
    throw new Error('Context is not provided');
  }

  const {
    tasks,
    addTask,
    updateTask,
    activeTask,
    changeActiveTask,
    setTasks,
    markTaskAsDone,
  } = tasksContext;

  const changeFormVisibility = () => {
    setOpenForm((curr) => !curr);
  };

  return (
    <div>
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
            <TaskItem
              key={task.id}
              task={task}
              markTaskAsDone={markTaskAsDone}
              bgColor={bgContext.color}
              activeTask={activeTask}
              changeActiveTask={changeActiveTask}
              updateTask={updateTask}
            />
          ))}
        </ReactSortable>
      </div>
      {openForm ? (
        <TaskForm
          changeFormVisibility={changeFormVisibility}
          addTask={addTask}
          isEditMode={false}
          task={null}
          updateTask={null}
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
