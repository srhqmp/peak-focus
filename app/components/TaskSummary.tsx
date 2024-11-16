'use client';

import React from 'react';
import { TasksContext } from '@/app/context';
import {
  calculateRemainingHours,
  getCurrentTimePlusRemainingHours,
} from '@/app/utils';

export default function TaskSummary() {
  const tasksContext = React.useContext(TasksContext);

  if (!tasksContext) {
    throw new Error('Tasks Context is not provided');
  }

  const { tasks } = tasksContext;

  const totalPomodoros = tasks.reduce(
    (sum, curr) =>
      (sum += curr.isDone ? curr.pomodoro.finished : curr.pomodoro.estimated),
    0
  );

  const finishedPomodoros = tasks.reduce(
    (sum, curr) => sum + curr.pomodoro.finished,
    0
  );
  const remainingPomodoros = totalPomodoros - finishedPomodoros;
  const remainingHours = calculateRemainingHours(remainingPomodoros);
  const estimatedFinishTime = getCurrentTimePlusRemainingHours(remainingHours);

  return (
    <div className="bg-white bg-opacity-10 mt-8 rounded-b border-t-2 p-6 flex justify-center items-center gap-6 text-gray-300">
      <div>
        Pomodoros:{' '}
        <span className="pomodoro-summary">
          <span className="finished text-white text-2xl font-bold">
            {finishedPomodoros}
          </span>
          /
          <span className="total text-white text-2xl ml-1 font-bold">
            {totalPomodoros}
          </span>
        </span>
      </div>
      <div>
        Finish At:{' '}
        <span className="end-time text-white text-2xl font-bold mx-1">
          {estimatedFinishTime}
        </span>{' '}
        (<span className="estimated-duration ml">{`${remainingHours}h`}</span>)
      </div>
    </div>
  );
}
