'use client';

import { useState } from 'react';
import { TimerOption } from '@/app/lib/definitions';

export default function Timer() {
  const [active, setActive] = useState<TimerOption>(TimerOption.pomodoro); // pomodoro | short-break | long-break

  const changeOption = (option: TimerOption) => () => {
    setActive(option);
  };

  return (
    <div className="container max-w-2xl mx-auto bg-white bg-opacity-10 rounded-md py-6 flex flex-col items-center">
      <div id="timer-options" className="flex gap-6">
        <button
          onClick={changeOption(TimerOption.pomodoro)}
          className={
            active === TimerOption.pomodoro
              ? 'bg-background px-4 py-1 rounded-md font-bold'
              : ''
          }
        >
          Pomodoro
        </button>
        <button
          onClick={changeOption(TimerOption.shortBreak)}
          className={
            active === TimerOption.shortBreak
              ? 'bg-background px-4 py-1 rounded-md font-bold'
              : ''
          }
        >
          Short Break
        </button>
        <button
          onClick={changeOption(TimerOption.longBreak)}
          className={
            active === TimerOption.longBreak
              ? 'bg-background px-4 py-1 rounded-md font-bold'
              : ''
          }
        >
          Long Break
        </button>
      </div>
      <div id="timer" className="text-8xl font-bold my-8">
        <span className="minute">50</span>:<span className="second">00</span>
      </div>
      <button
        id="start-stop-button"
        className="button uppercase text-2xl text-background bg-white px-14 rounded-md py-3 border-b-8 font-bold"
      >
        Start
      </button>
    </div>
  );
}
