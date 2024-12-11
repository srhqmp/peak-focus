import React from 'react';
import { TasksContext } from '../context';

export default function TaskListSettings({
  changeSettingsVisibility,
}: {
  changeSettingsVisibility: () => void;
}) {
  const tasksContext = React.useContext(TasksContext);
  const listStyle =
    'hover:bg-gray-200 w-[200px] px-4 py-2 flex gap-2 cursor-pointer';

  if (!tasksContext) {
    throw new Error('Context is not provided');
  }

  enum SettingType {
    clearAll = 'clear-all',
    clearFinished = 'clear-finished',
  }

  const handleClick = (type: SettingType) => {
    if (type === SettingType.clearAll) {
      tasksContext.clearAllTasks();
    }
    if (type === SettingType.clearFinished) {
      tasksContext.clearAllFinishedTasks();
    }
    changeSettingsVisibility();
  };

  return (
    <div className="absolute right-0 top-12 z-50 shadow-md">
      <ul className="bg-white text-gray-800 rounded text-sm overflow-hidden py-1">
        <li
          className={listStyle}
          onClick={() => handleClick(SettingType.clearFinished)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          Clear finished tasks
        </li>
        <hr />
        <li
          className={listStyle}
          onClick={() => handleClick(SettingType.clearAll)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>{' '}
          Clear all tasks
        </li>
      </ul>
    </div>
  );
}
