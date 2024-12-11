'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TaskType } from '@/app/lib/definitions';
import clsx from 'clsx';

enum AdjustmentType {
  increase = 'increase',
  decrease = 'decrease',
}

export default function TaskForm({
  changeFormVisibility,
  addTask,
  updateTask,
  deleteTask,
  isEditMode = false,
  task,
}: {
  changeFormVisibility: () => void;
  addTask: ((task: TaskType) => void) | null;
  isEditMode: boolean;
  task: TaskType | null;
  updateTask: ((updatedTask: TaskType) => void) | null;
  deleteTask: ((id: string) => void) | null;
}) {
  const [pomodoros, setPomodoros] = useState(task?.pomodoro.estimated || 1);
  const [title, setTitle] = useState(task?.name || '');

  const resetValues = () => {
    setPomodoros(1);
    setTitle('');
    changeFormVisibility();
  };

  const handleSubmit = () => {
    if (title) {
      if (!isEditMode && addTask) {
        const newTask = {
          id: uuidv4(),
          name: title,
          isDone: false,
          pomodoro: { estimated: pomodoros, finished: 0 },
        };
        addTask(newTask);
      }

      if (isEditMode && updateTask && task) {
        const newTask = {
          id: task.id,
          name: title,
          isDone: task?.isDone,
          pomodoro: {
            estimated: pomodoros,
            finished: task?.pomodoro.finished,
          },
        };
        updateTask(newTask);
      }
      resetValues();
    }
  };

  const removeTask = () => {
    if (task && deleteTask) deleteTask(task.id);
  };

  const adjustPomodoros = (type: AdjustmentType) => {
    setPomodoros((curr) => {
      if (type === AdjustmentType.increase) {
        const val = curr + 1;
        if (val > 100) return curr;
        return val;
      }
      const val = curr - 1;
      if (val < 1) return curr;
      return val;
    });
  };

  return (
    <div className="w-full bg-white pt-10 rounded-tl rounded mb-2">
      <div className="px-6">
        <input
          type="text"
          name="task-title"
          value={title}
          onChange={(e) => setTitle(() => e.target.value)}
          placeholder="What are you working on?"
          className="w-full border-none outline-none text-xl text-gray-600 font-bold placeholder:italic placeholder:opacity-40"
        />
        <div className="pb-8">
          <div className="text-gray-600 font-bold pt-4 pb-2">Est Pomodoros</div>
          <div className="flex gap-3">
            <input
              type="text"
              value={pomodoros}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPomodoros(val < 1 ? pomodoros : val > 100 ? pomodoros : val);
              }}
              name="task-pomodoros"
              className="w-24 bg-gray-600 bg-opacity-10 text-gray-600 text-lg font-bold px-3 py-2 rounded"
            />
            <div>
              <button
                onClick={() => adjustPomodoros(AdjustmentType.increase)}
                className="pomodoro-controls-button mr-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={() => adjustPomodoros(AdjustmentType.decrease)}
                className="pomodoro-controls-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'bg-gray-100 px-4 w-full py-3 left-0 flex rounded-b',
          isEditMode ? 'justify-between' : 'justify-end'
        )}
      >
        {isEditMode && (
          <div
            onClick={() => removeTask()}
            className="text-gray-600 font-medium py-2 px-2"
          >
            <button>Delete</button>
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={() => changeFormVisibility()}
            className="text-gray-600 font-medium py-2 px-6"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSubmit()}
            className="py-2 px-6 bg-gray-900 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
